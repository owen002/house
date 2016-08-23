(function ($) {
    var trimVal = base.trimVal;
    var saleHousingID='';
    var page = {
        init: function () {
            mui.init();
            base.setPageRem();
            mui('#offCanvasContentScroll').scroll();

            saleHousingID = base.param('saleHousingID');
            //查询租房详情
            page.queryDetail(saleHousingID);
            page.bind();
        },
        queryDetail: function (saleHousingID) {
            var querySettings = {
                url: Constants.saledetail + '/' + saleHousingID,
                type: 'get'
            };

            if (saleHousingID) {
                muiAjax(querySettings, function (data) {
                    var tmpl = mui('#sale-detail-template')[0].innerHTML;
					mui('#sale-detail-innerHtml')[0].innerHTML += Mustache.render(tmpl, data);
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
                	url:Constants.dzan+'/'+saleHousingID+'/2',
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
                	url:Constants.memberFav+'/'+saleHousingID+'/2',
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

    page.init();
})(mui);