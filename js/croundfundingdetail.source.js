(function () {
    var pageSize = 15, pageNo = 1;
    var $guessUlike = base.$('#guessUlike'),$bzmDialog = base.$('.bzm-dialog');
    var page = {
        init: function () {
            base.setPageRem();
            mui('#offCanvasContentScroll').scroll();
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
            mui(document).on('tap', '#liZc', function () {
                $bzmDialog.style.display = 'block';
            }).on('tap', '#agreeZc', function () {
                $bzmDialog.style.display = 'none';
            })
        }
    }
    page.init();

})();