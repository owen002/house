(function () {
    mui.init();
    var pageSize = 10, pageNo = 1, canPull = true;
    var currentid = '';
    var page = {
        init: function () {
            base.setPageRem();
            //查询租房列表
            // page.queryList();
            page.queryZqList();//众筹
            page.bind();
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
                        liDom += '';
                        li.innerHTML = liDom;
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
        queryZqList: function () {
            var querySettings = {
                url: Constants.myenrollList,
                data: {
                    'pager.pageSize': pageSize,
                    'pager.pageNo': pageNo
                }
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
                        liDom += '';
                        li.innerHTML = liDom;
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
            mui('.ms-header-menu').on('tap', '.ms-m', function () {
                switchTab(this);
            });

            mui('.gueulike-wrapper').pullToRefresh({
                //上拉加载更多
                up: {
                    callback: function () {
                        var self = this;
                        setTimeout(function () {
                            if (canPull) {
                                pageNo += 1;
                                page.queryList();
                            }
                            self.endPullUpToRefresh(!canPull);
                        }, 500);
                    }
                }
            });

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
                    pageUrl: "newhousedetail.html?houseid=" + id
                };
                pageChange(pageObj);
            })
        }
    };

    function switchTab($this) {
        currentid = $this.getAttribute('data-type');
        base.removeClass(base.$s('.ms-m'), 'ms-menu-active');
        base.addClass($this, 'ms-menu-active');
        base.removeClass(base.$('.section-active'), 'section-active');
        base.addClass(base.$('.ms-con' + currentid), 'section-active');
    }

    page.init();
})();