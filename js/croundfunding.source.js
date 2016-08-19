(function () {
    mui.init();
    var pageSize = 10, pageNo = 1, canPull = true;
    var trimVal = base.trimVal;
    var $guessUlike = base.$('#guessUlike');

    var param = {
        'pager.pageSize': pageSize,
        'pager.pageNo': pageNo,
        'parameters[cityID]': '',
        'parameters[minRental]': '',
        'parameters[maxRental]': '',
        'parameters[residentialProperty]': '',
        'parameters[districtID]': '',
        'parameters[minLocationFloor]': '',
        'parameters[minRooms]': '',
        'parameters[maxRooms]': '',
        'parameters[rentalMode]': '',
        'parameters[decoration]': ''
    };
    var page = {
        init: function () {
            base.setPageRem();
            base.setMuiBackHeight();
            //列表
            page.queryList();
            page.bind();
        },
        queryList: function () {
            var querySettings = {
                url: Constants.crowdfundlist,
                data: {
                    'pager.pageSize': pageSize,
                    'pager.pageNo': pageNo
                },
                type: 'post'
            };

            muiAjax(querySettings, function (data) {
                var rows = data.rows;
                var rentlength = rows.length, totalLength = data.totalRows;
                if (rows.length > 0) {
                    if (rentlength < pageSize) {
                        canPull = false;
                    } else if (totalLength == (pageSize * (pageNo - 1) + rentlength)) {
                        canPull = false
                    } else {
                        canPull = true;
                    }
                    
                    var obj = {
						rows: rows
				    };
				    
				    var tmpl = mui('#rows-li-template')[0].innerHTML;
					mui('#guessUlike')[0].innerHTML += Mustache.render(tmpl, obj);                    
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
                var crowdfundingHousingID = this.getAttribute('data-id');
                var pageObj = {
                    pageUrl: "croudfundingdetail.html?crowdfundingHousingID=" + crowdfundingHousingID
                };
                pageChange(pageObj);
            })
        }
    };

    function closeSelect() {
        if (showChooseMenuFlag) {
            var ac = base.$('.revert-img');
            var cutype = ac.getAttribute('data-type');
            var currentcLocation = base.$('.choose-content' + cutype);
            base.Slider.slideUp(currentcLocation, 100);
            base.removeClass(ac, 'revert-img');
            muiBack.style.display = 'none';
            showChooseMenuFlag = false;
        }
    }
    page.init();
})();