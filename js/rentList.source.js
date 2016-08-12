(function () {
    mui.init();
    mui('#location1,#choose2Scroll,#locationcontent1,#choose3Scroll,#choose4Scroll').scroll();
    var pageSize = 10, pageNo = 1, canPull = true, showChooseMenuFlag = false;
    var trimVal = base.trimVal;
    var $guessUlike = base.$('#guessUlike');
    var page = {
        init: function () {
            base.setPageRem();
            base.setMuiBackHeight();
            //查询租房列表
            page.queryList();
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
                        liDom += '<div class="f-left house-img"><img src="' + '../res/img/house.jpg' + '"></div><div class="house-content f-left">' +
                            '<div class="hc-title">' + trimVal(rent.title) + '</div><div class="nearby-house-items"><div><span>' + trimVal(rent.platName) + ' ' + trimVal(rent.villageName) + '</span></div>' +
                            '<div><span>' + trimVal(rent.rooms) + '室' + trimVal(rent.halls) + '厅' + ' ' + trimVal(rent.rentalMode) + '</span></div></div>' +
                            '<div class="zan-and-focus"><div class="rent-price">' + trimVal(rent.rental) + '元/月</div>' +
                            '<div class="zan-focus-area"><div class="zan-active-icon zf-icon"></div><div>' + trimVal(rent.supportNum) + '</div>' +
                            '<div class="focus-active-icon zf-icon"></div><div>' + trimVal(rent.viewNum) + '</div></div></div></div>';
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
            mui(document).on('tap', '.slider-menu-choose .header-menu-select li', function () {
                var $this = this;
                var type = $this.getAttribute('data-type');
                var cLocation = base.$('.choose-content' + type);
                if (cLocation.style.display == 'none') {
                    if (showChooseMenuFlag) {
                        var ac = base.$('.revert-img');
                        var cutype = ac.getAttribute('data-type');
                        var currentcLocation = base.$('.choose-content' + cutype);
                        base.Slider.slideUp(currentcLocation, 100);
                        base.removeClass(ac, 'revert-img');
                        muiBack.style.display = 'none';
                        showChooseMenuFlag = false;
                        // base.delay(function(){
                        //     base.addClass($this, 'revert-img');
                        //     base.Slider.slideDown(cLocation, 100);
                        //     muiBack.style.display = 'block';
                        // },100)
                    }else{
                        showChooseMenuFlag = true;
                        base.addClass($this, 'revert-img');
                        base.Slider.slideDown(cLocation, 100);
                        muiBack.style.display = 'block';
                    }
                } else {
                    showChooseMenuFlag = false;
                    base.removeClass($this, 'revert-img');
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