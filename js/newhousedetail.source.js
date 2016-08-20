(function ($) {
    var trimVal = base.trimVal;
    var page = {
        init: function () {
            mui.init();
            base.setPageRem();
            mui('#offCanvasContentScroll').scroll();

            var newHousingID = base.param('newHousingID');
            //详情
            page.queryDetail(newHousingID);
            page.bind();
        },
        queryDetail: function (newHousingID) {
            var querySettings = {
                url: Constants.newhousedetail + '/' + newHousingID,
                type: 'get'
            };

            if (newHousingID) {
                muiAjax(querySettings, function (data) {
                    var tmpl = mui('#newhouse-detail-template')[0].innerHTML;
					mui('#newhouse-detail-id')[0].innerHTML += Mustache.render(tmpl, data);
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