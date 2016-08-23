(function () {
    mui.init();
    var pageSize = 10, pageNo = 1, canPull = true;
    var currentid = 1;
    var page = {
        init: function () {
            base.setPageRem();
            page.queryList(2);
            page.bind();
        },
        queryList: function (type) {
            var querySettings = {
                url: Constants.favRecord,
                data: {
                    'parameters[kind]':currentid
                },
                type: 'post'
            };

            muiAjax(querySettings, function (data) {
                var rows = data.rows;
                var rentlength = rows.length, totalLength = data.totalRows;
                if (rows.length >= 0) {
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
				    
				    var tmpl = mui('#rows-li-template'+currentid)[0].innerHTML;
				    //下拉
				    if(type ==1)
						mui('#guessUlike'+currentid)[0].innerHTML += Mustache.render(tmpl, obj);
					//tab切换
					else if(type ==2)
					    mui('#guessUlike'+currentid)[0].innerHTML = Mustache.render(tmpl, obj);
                    
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
                                page.queryList(1);
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
            }).on('tap', '#scimg', function () {
                var id = this.getAttribute('data-id');
                var dzsetting={
                	url:Constants.memberFav+'/'+id+'/'+currentid,
                	type:'post'
                };
                muiAjax(dzsetting, function (data) {
                    mui.toast(data.message);
                    page.queryList(2);
                }, function (status) {

                });
            })
        }
    };

    function switchTab($this) {
        currentid = $this.getAttribute('data-type');
        base.removeClass(base.$s('.ms-m'), 'ms-menu-active');
        base.addClass($this, 'ms-menu-active');
        base.removeClass(base.$('.section-active'), 'section-active');
        base.addClass(base.$('.ms-con' + currentid), 'section-active');
        page.queryList(2);
    }

    page.init();
})();