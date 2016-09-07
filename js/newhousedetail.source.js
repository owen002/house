(function ($) {
    var trimVal = base.trimVal;
    var newHousingID='';
    var page = {
        init: function () {
            mui.init();
            base.setPageRem();
            mui('#offCanvasContentScroll').scroll();
//          mui.plusReady(function(){
            	newHousingID = base.param('newHousingID');
//          	newHousingID=getQueryString('newHousingID');//webview传值
            	page.queryDetail(newHousingID);
                page.bind();
//          });
            //详情
            
        },
        queryDetail: function (newHousingID) {
            var querySettings = {
                url: Constants.newhousedetail + '/' + newHousingID,
                type: 'get'
            };

            if (newHousingID) {
                muiAjax(querySettings, function (data) {
                	mui('#pageTitle')[0].innerHTML = data.newHousing.villageName;
                    var tmpl = mui('#newhouse-detail-template')[0].innerHTML;
					mui('#newhouse-detail-id')[0].innerHTML += Mustache.render(tmpl, data);
					
	                var rowsArr = data.attachmentList;
	                var arr = new Array();
	                arr[0] = rowsArr[rowsArr.length - 1];
	                arr[rowsArr.length + 1] = rowsArr[0];
	                for (var i = 0, j = rowsArr.length; i < j; i++) {
	                    arr[i + 1] = rowsArr[i];
	                }
	
	                var obj = {
	                    rowsArr: rowsArr,
	                    rows: arr
	                };
                
                	var imagetmpl = mui('#newhouse-image-template')[0].innerHTML;
					mui('#houseDetailImg')[0].innerHTML = Mustache.render(imagetmpl, obj);
				    mui('.mui-slider-item')[0].className = mui('.mui-slider-item')[0].className + ' mui-slider-item-duplicate';
                	mui('.mui-slider-item')[rowsArr.length + 1].className = mui('.mui-slider-item')[rowsArr.length + 1].className + ' mui-slider-item-duplicate';
                	mui('.mui-indicator')[0].className = mui('.mui-indicator')[0].className + ' mui-active';
					base.startSlider($);
                }, function (status) {

                });
            }
        },
        bind: function () {
            var muiBack = mui('.mui-back')[0];
            mui(document).on('tap', '.slider-menu-choose li', function () {
                var cLocation = mui('.choose-location')[0];
                if (cLocation.style.display == 'none') {
                    base.Slider.slideDown(cLocation, 100);
                    muiBack.style.display = 'block';
                } else {
                    base.Slider.slideUp(cLocation, 100);
                    muiBack.style.display = 'none';
                }
            }).on('tap', '#guessUlike li', function () {
                var id = this.getAttribute('data-id');
                var pageObj = {
                    pageUrl: "rent.html?rentid=" + id
                };
                pageChange(pageObj);
            }).on('tap', '#dzan', function () {
                var dzsetting={
                	url:Constants.dzan+'/'+newHousingID+'/4',
                	type:'post'
                };
                muiAjax(dzsetting, function (data) {
                    mui.toast(data.message);
                }, function (status) {

                });
            }).on('tap', '#callphone', function () {//拨打电话
                var btnArray = ['拨打', '取消']; 
                var Phone =parseInt(this.getAttribute('contact'));
                mui.confirm('是否拨打 ' + Phone + ' ？', '', btnArray, function(e) { 
                    if (e.index == 0) { 
                        plus.device.dial(Phone, true); 
                    }  
                }); 
            }).on('tap', '#fav', function () {//加入收藏
                var dzsetting={
                	url:Constants.memberFav+'/'+newHousingID+'/4',
                	type:'post'
                };
                muiAjax(dzsetting, function (data) {
                    mui.toast(data.message);
                }, function (status) {

                });
            })
        }
    };

    function getStandardTime(date) {
        return date.getFullYear() + '-' + modifyStandTime(date.getMonth() + 1) + '-' + modifyStandTime(date.getDate());
    }

    function modifyStandTime(time) {
        if (time < 10) {
            time = '0' + time;
        }
        return time;
    }
mui.plusReady(page.init);
//  page.init();
})(mui);