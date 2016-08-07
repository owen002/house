(function () {
    var pageSize = 15, pageNo = 1;
    var $guessUlike = base.$('#guessUlike');
    var page = {
        init: function () {
            base.setPageRem();
            base.setMuiBackHeight();
            //查询租房列表
            var querySettings = {
                url: Constants.rentlist,
                data: {
                    pageSize: pageSize,
                    pageNo: pageNo
                },
                type:'post'
            }
            page.queryList(querySettings);
            page.bind();
        },
        queryList: function (querySettings) {
            muiAjax(querySettings, function (data) {
                if (data.status == '200') {
                    var rentArr = data.rows;
                    if (rentArr.length > 0) {
                        var listDom = '';
                        for (var i = 0, j = rentArr.length; i < j; i++) {
                            var rent = rentArr[i];
                            listDom += '<li><div class="f-left house-img"><img src="' + rent.mainImage + '"></div><div class="house-content f-left">' +
                                '<div class="hc-title">' + rent.title + ' ' + rent.advantage + '</div><div class="nearby-house-items"><div><span>' + rent.platName + ' ' + rent.villageName + '</span></div>' +
                                '<div><span>' + rent.rooms + '室' + rent.halls + '厅' + rent.toilet + '卫 ' + rent.rentalMode + '</span></div></div>' +
                                '<div class="zan-and-focus"><div class="rent-price">' + rent.rental + '元/月</div>' +
                                '<div class="zan-focus-area"><div class="zan-icon zf-icon"></div><div>' + rent.supportNum + '</div>' +
                                '<div class="focus-icon zf-icon"></div><div>' + rent.viewNum + '</div></div></div></div></li>'
                        }

                    }
                } else {
                }
            }, function (status) {
            });
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
                var pageObj = {
                    pageUrl: "croudfundingdetail.html"
                };
                pageChange(pageObj);
            })
        }
    }
    page.init();

})();