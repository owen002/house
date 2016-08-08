(function () {
    mui.init();
    var page = {
        init: function () {
            base.setPageRem();
            base.setMuiBackHeight();
            //查询租房列表
            page.queryList();
            page.bind();

            var deceleration = mui.os.ios ? 0.003 : 0.0009;
            mui('.mui-scroll-wrapper').scroll({
                bounce: false,
                indicators: true, //是否显示滚动条
                deceleration: deceleration
            });
        },
        queryList: function () {
            var querySettings = {
                url: Constants.rentlist,
                data: {
                    'pager.pageSize': pageSize,
                    'pager.pageNo': pageNo
                },
                type: 'post'
            };

            muiAjax(querySettings, function (data) {
                var rentArr = data.rows;
                var rentlength = rentArr.length, totalLength = data.totalRows;
                if (rentArr.length > 0) {
                    if (rentlength < pageSize) {
                        canPull = false;
                    } else if (totalLength == (pageSize * (pageNo - 1) + rentlength)) {
                        canPull = false
                    } else {
                        canPull = true;
                    }
                    var fragment = document.createDocumentFragment();
                    for (var i = 0, j = rentArr.length; i < j; i++) {
                        var li = document.createElement('li'), liDom = '';
                        var rent = rentArr[i];
                        // rent.mainImage
                        liDom += '<div class="f-left house-img"><img src="' + '../res/img/house.jpg' + '"></div><div class="house-content f-left">' +
                            '<div class="hc-title">' + rent.title + '</div><div class="nearby-house-items"><div><span>' + rent.platName + ' ' + rent.villageName + '</span></div>' +
                            '<div><span>' + rent.rooms + '室' + rent.halls + '厅' + ' ' + rent.rentalMode + '</span></div></div>' +
                            '<div class="zan-and-focus"><div class="rent-price">' + rent.rental + '元/月</div>' +
                            '<div class="zan-focus-area"><div class="zan-active-icon zf-icon"></div><div>' + rent.supportNum + '</div>' +
                            '<div class="focus-active-icon zf-icon"></div><div>' + rent.viewNum + '</div></div></div></div>';
                        li.innerHTML = liDom;
                        li.className = 'mui-table-view-cell';
                        li.setAttribute('data-id', rent.rentalHousingID);
                        fragment.appendChild(li);
                    }
                    $guessUlike.appendChild(fragment);
                } else {
                    canPull = false;
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
                var id = this.getAttribute('data-id');
                var pageObj = {
                    pageUrl: "rent.html?rentid=" + id
                };
                pageChange(pageObj);
            })
        }
    };
    page.init();
})();