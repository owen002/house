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
            var querl;
            if (currentid == 1) {
                querl = Constants.messagelistd;
            } else if (currentid == 2) {
                querl = Constants.messagelists;
            }
            var querySettings = {
                url: querl,
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
                        rows: rows,
                        'unread': function () {
                            return this.isRead == '0'
                        }
                    };

                    var tmpl = mui('#rows-li-template' + currentid)[0].innerHTML;
                    //下拉
                    if (type == 1) {
                        mui('#guessUlike' + currentid)[0].innerHTML += Mustache.render(tmpl, obj);
                        //tab切换
                    } else if (type == 2) {
                        mui('#guessUlike' + currentid)[0].innerHTML = Mustache.render(tmpl, obj);
                        pageNo = 1;
                    }
                } else {
                    mui('#guessUlike' + currentid)[0].innerHTML = '<li style="text-align:center;height:40px;line-height: 40px;color:#ccc;">没有更多了...</li>';
                    canPull = false;
                }
            }, function (status) {

            });
        },
        readMsg: function (msid, mrid, callback) {
            var querySettings = {
                url: baseUrl + 'view_message_receive/' + msid + '/' + mrid,
                type: 'get'
            };
            muiAjax(querySettings, function (data) {
                if (data && data != {}) {
                    callback();
                }
            });
        },
        bind: function () {
            mui('.ms-header-menu').on('tap', '.ms-m', function () {
                switchTab(this);
            });
            mui(document).on('tap', '.mysign-items-ul li', function () {
                var $this = this;
                var sid = $this.getAttribute('data-sid');
                var rid = $this.getAttribute('data-rid');
                if (base.hasClass($this, 'unread')) {
                    page.readMsg(sid, rid, function () {
                        base.removeClass($this, 'unread');
                    });
                }
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