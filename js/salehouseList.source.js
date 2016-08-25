(function () {
    var pageSize = 10, pageNo = 1, canPull = true, showChooseMenuFlag = false, cityid = 1, $areaList = base.$('#areaList');
    mui('#location1,#choose2Scroll,#locationcontent1,#choose3Scroll,#choose4Scroll').scroll();
    var pa = base.param('pa') || '';

    var $guessUlike = base.$('#guessUlike');
    var param = {
        'pager.pageSize': pageSize,
        'pager.pageNo': pageNo,
        'parameters[cityID]': '',
        'parameters[minHousingArea]': '',
        'parameters[maxHousingArea]': '',
        'parameters[minTotalPrice]': '',
        'parameters[maxTotalPrice]': '',
        'parameters[districtID]': '',
        'parameters[minRooms]': '',
        'parameters[maxRooms]': '',
        'parameters[decoration]': '',
        'parameters[title]': pa
    };

    var page = {
        init: function () {
            base.setPageRem();
            base.setMuiBackHeight();
            page.queryArea();
            //查询租房列表
            page.queryList();
            page.bind();
        },
        queryArea: function () {
            var querySettings = {
                url: Constants.cityArea,
                data: {
                    'cityID': cityid
                },
                type: 'post'
            };
            muiAjax(querySettings, function (data) {
                var areaArr = data.rows;
                var ldom = '<li class="choose-left-active"><div class="bzm-navigate-right">不限</div></li>';
                for (var i = 0; i < areaArr.length; i++) {
                    var area = areaArr[i];
                    ldom += '<li data-name="' + area.districtName + '" data-id="' + area.districtID + '"><div class="bzm-navigate-right">' + area.districtName + '</div></li>'
                }
                $areaList.innerHTML = ldom;
            }, function (status) {

            });
        },
        queryList: function () {
            var querySettings = {
                url: Constants.salelist,
                data: param,
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
                                param['pager.pageNo'] = pageNo;
                                page.queryList();
                            }
                            self.endPullUpToRefresh(!canPull);
                        }, 500);
                    }
                }
            });

            var muiBack = mui('.mui-back')[0];
            //下拉筛选
            mui(document).on('tap', '.slider-menu-choose .header-menu-select li', function () {
                var $this = this;
                var type = $this.getAttribute('data-type');
                var cLocation = base.$('.choose-content' + type);
                if (cLocation.style.display == 'none') {
                    if (showChooseMenuFlag) {
                        closeSelect();
                        // base.delay(function(){
                        //     base.addClass($this, 'revert-img');
                        //     base.Slider.slideDown(cLocation, 100);
                        //     muiBack.style.display = 'block';
                        // },100)
                    } else {
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
                    pageUrl: "salehouse.html?saleHousingID=" + id
                };
                pageChange(pageObj);
            }).on('tap', '#areaList li', function () {
                var id = this.getAttribute('data-id') || '';
                var name = this.getAttribute('data-name') || '区域';
                base.removeClass(mui('#areaList li'), 'choose-left-active');
                base.addClass(this, 'choose-left-active');
                param['parameters[districtID]'] = id;
                base.$('#quyu').innerHTML = name;
                $guessUlike.innerHTML = '';
                page.queryList();
                closeSelect();
            }).on('tap', '#amountArea li', function () {
                base.removeClass(mui('#amountArea li'), 'choose-left-active');
                base.addClass(this, 'choose-left-active');
                var min = this.getAttribute('data-min') || '';
                var max = this.getAttribute('data-max') || '';
                param['parameters[minTotalPrice]'] = min;
                param['parameters[maxTotalPrice]'] = max;
                if (min || max) {
                    base.$('#zujin').innerHTML = this.innerHTML;
                } else {
                    base.$('#zujin').innerHTML = '售价';
                }
                $guessUlike.innerHTML = '';
                page.queryList();
                closeSelect();
            }).on('tap', '#sortLiveUl li', function () {
                base.removeClass(mui('#sortLiveUl li'), 'choose-left-active');
                base.addClass(this, 'choose-left-active');
                var min = this.getAttribute('data-min') || '';
                var max = this.getAttribute('data-max') || '';
                param['parameters[minRooms]'] = min;
                param['parameters[maxRooms]'] = max;

                $guessUlike.innerHTML = '';
                if (min || max) {
                    base.$('#fangxing').innerHTML = this.innerHTML;
                } else {
                    base.$('#fangxing').innerHTML = '户型';
                }
                page.queryList();
                closeSelect();
            }).on('tap', '#moreItems .huxing .rent-content', function () {
                base.removeClass(mui('#moreItems .huxing .rent-content'), 'choose-left-active');
                base.addClass(this, 'choose-left-active');
            }).on('tap', '#moreItems .zulinfangshi .rent-content', function () {
                base.removeClass(mui('#moreItems .zulinfangshi .rent-content'), 'choose-left-active');
                base.addClass(this, 'choose-left-active');
            }).on('tap', '#moreItems .zhuangxiu .rent-content', function () {
                base.removeClass(mui('#moreItems .zhuangxiu .rent-content'), 'choose-left-active');
                base.addClass(this, 'choose-left-active');
            }).on('tap', '#confirmChooseBtn', function () {
                // var $choose1 = base.$('#moreItems .huxing .choose-left-active');
                // var $choose2 = base.$('#moreItems .zulinfangshi .choose-left-active');
                var $choose3 = base.$('#moreItems .zhuangxiu .choose-left-active');
                // param['parameters[minRooms]'] = ($choose1.getAttribute('data-type') || '');
                // param['parameters[maxRooms]'] = ($choose1.getAttribute('data-type') || '');
                // param['parameters[rentalMode]'] = ($choose2.getAttribute('data-type') || '');
                param['parameters[decoration]'] = ($choose3.getAttribute('data-type') || '');
                $guessUlike.innerHTML = '';
                page.queryList();
                closeSelect();
            }).on('tap', '#message', function () {
            		var pageObj = {
			            pageUrl: "messages.html"
			        };
			        pageChange(pageObj);
            	
            })

            mui(document).on('tap', '.search-box', function () {
                base.goSearch();
            });

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
        }
    };

    page.init();
})();