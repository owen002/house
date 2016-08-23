(function ($) {
    var trimVal = base.trimVal;
    var crowdfundingHousingID ="";
    var page = {
        init: function () {
            mui.init();
            base.setPageRem();
            mui('#offCanvasContentScroll').scroll();

            crowdfundingHousingID = base.param('crowdfundingHousingID');
            page.queryDetail(crowdfundingHousingID);
            page.bind();
        },
        queryDetail: function (crowdfundingHousingID) {
            var querySettings = {
                url: Constants.crowdfunddetail + '/' + crowdfundingHousingID,
                type: 'get'
            };

            if (crowdfundingHousingID) {
                muiAjax(querySettings, function (data) {
                    var tmpl = mui('#detail-template')[0].innerHTML;
					document.body.innerHTML = Mustache.render(tmpl, data);
					mui('#offCanvasContentScroll').scroll();
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
            }).on('tap', '#fyxx', function () {
                mui('#fyxx')[0].className = 'menu-bar-pub fyxx menu-bar-active';
                mui('#tzjl')[0].className = 'menu-bar-pub tzjl';
            }).on('tap', '#tzjl', function () {
                mui('#fyxx')[0].className = 'menu-bar-pub fyxx';
                mui('#tzjl')[0].className = 'menu-bar-pub tzjl menu-bar-active';
            }).on('tap', '#dzan', function () {
                var dzsetting={
                	url:Constants.dzan+'/'+crowdfundingHousingID+'/3',
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
                	url:Constants.memberFav+'/'+crowdfundingHousingID+'/3',
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