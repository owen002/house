(function () {
    var pageSize = 10,
        pageNo = 1;
    var userinfo = localStorage.getItem('userinfo');
    var perRem = 0, endPageX = 0;
    var isLogin = false;
    if (userinfo && userinfo != {}) {
        isLogin = true;
        userinfo = JSON.parse(decodeURIComponent(userinfo));
    }
    var page = {
        init: function () {
            mui.init();
            perRem = base.setPageRem();
            page.getSliderImage();
            page.initSliderMenu();
            page.checkUser();
            page.bind();
            page.getBztt();
        },
        //获取轮播图片
        getSliderImage: function () {
            var setting = {
                url: baseUrl + 'front/json_advertisement',
                type: 'get',
                contentType: "application/json"
            };
            muiAjax(setting, function (data) {
                //添加第一个和最后一个
                var rowsArr = data.rows;
                var arr = new Array();
                arr[0] = rowsArr[rowsArr.length - 1];
                arr[rowsArr.length + 1] = rowsArr[0];
                for (var i = 0, j = rowsArr.length; i < j; i++) {
                    arr[i + 1] = rowsArr[i];
                }

                var obj = {
                    rowsArr: rowsArr,
                    rows: arr
                };
                var tmpl = mui('#index-guangao-template')[0].innerHTML;
                mui('#slider')[0].innerHTML = Mustache.render(tmpl, obj);

                mui('.mui-slider-item')[0].className = mui('.mui-slider-item')[0].className + ' mui-slider-item-duplicate';
                mui('.mui-slider-item')[rowsArr.length + 1].className = mui('.mui-slider-item')[rowsArr.length + 1].className + ' mui-slider-item-duplicate';
                mui('.mui-indicator')[0].className = mui('.mui-indicator')[0].className + ' mui-active';

                //图片轮播
                mui("#slider").slider({
                    interval: 3000
                });
            }, function (status) {
                //异常处理
            });
        },
        checkUser: function () {
            if (!!userinfo) {
                userinfo = decodeURIComponent(userinfo);
                var uid = userinfo.memberID;
                if (!!uid) {
                    //已登录
                    mui('#goToLogin')[0].style.display = 'none';
                }
            }
        },
        initSliderMenu: function () {
            if (isLogin) {
                base.$('#goToLogin').style.display = 'none';
                base.$('#bzm_username').style.display = 'block';
                base.$('#bzm_username').innerHTML = userinfo.username || '已登录';
                base.$('#loginBtn').style.display = 'block';
            }

            //侧滑容器父节点
            var offCanvasWrapper = mui('#offCanvasWrapper');
            //主界面容器
            var offCanvasInner = offCanvasWrapper[0].querySelector('.mui-inner-wrap');
            //菜单容器
            var offCanvasSide = document.getElementById("offCanvasSide");

            //侧滑容器的class列表，增加.mui-slide-in即可实现菜单移动、主界面不动的效果；
            var classList = offCanvasWrapper[0].classList;

            offCanvasSide.classList.remove('mui-transitioning');
            offCanvasSide.setAttribute('style', '');
            classList.add('mui-scalable');
            //			classList.add('mui-slide-in');
            //主界面‘显示侧滑菜单’按钮的点击事件
            document.getElementById('offCanvasShow').addEventListener('tap', function () {
                // var pageObj={
                // 	pageUrl:"page/login/login.html"
                // };
                // pageChange(pageObj);
                offCanvasWrapper.offCanvas('show');
            });
            //主界面和侧滑菜单界面均支持区域滚动；
            mui('#offCanvasSideScroll').scroll();
            mui('#offCanvasContentScroll').scroll();

            //实现ios平台原生侧滑关闭页面；
            if (mui.os.plus && mui.os.ios) {
                mui.plusReady(function () { //5+ iOS暂时无法屏蔽popGesture时传递touch事件，故该demo直接屏蔽popGesture功能
                    plus.webview.currentWebview().setStyle({
                        'popGesture': 'none'
                    });
                });
            }
        },
        bind: function () {
            mui("#gussULikeUl").on('tap', 'li', function () {
                location.href = 'page/rent.html';
            });
            mui(document).on('tap', '#goToLogin', function () {
                var pageObj = {
                    pageUrl: "page/login/login.html"
                };
                pageChange(pageObj);
            }).on('tap', '#navigateMenus li', function () {
                var id = this.getAttribute('data-type');
                var pageObj = {};
                if (!isLogin) {
                    switch (id) {
                        case '1':
                        case '2':
                        case '3':
                        case '4':
                        case '5':
                            pageObj = {
                                pageUrl: "page/login/login.html"
                            };
                            pageChange(pageObj);
                            break;
                    }
                } else {
                    switch (id) {
                        case '1':
                            pageObj = {
                                pageUrl: "page/myfabu.html"
                            };
                            break;
                        case '2':
                            pageObj = {
                                pageUrl: "page/mysign.html"
                            };
                            break;
                        case '3':
                            pageObj = {
                                pageUrl: "page/myfavo.html"
                            };
                            break;
                        case '4':
                            pageObj = {
                                pageUrl: "page/myhistroy.html"
                            };
                            break;
                        case '5':
                            pageObj = {
                                pageUrl: ""
                            };
                            break;
                    }
                    pageChange(pageObj);
                }
            }).on('tap', '#myFirstPage', function () {
                var pageObj = {
                    pageUrl: "index.html"
                };
                pageChange(pageObj);
            }).on('tap', '#myNearBy', function () {
                var pageObj = {
                    pageUrl: ""
                };
                pageChange(pageObj);
            }).on('tap', '#bzmZf', function () {
                var pageObj = {
                    pageUrl: "page/rentList.html"
                };
                pageChange(pageObj);
            }).on('tap', '#bzmSF', function () {
                var pageObj = {
                    pageUrl: "page/salehouseList.html"
                };
                pageChange(pageObj);
            }).on('tap', '#bzmZC', function () {
                var pageObj = {
                    pageUrl: "page/croudfunding.html"
                };
                pageChange(pageObj);
            }).on('tap', '#bzmXF', function () {
                var pageObj = {
                    pageUrl: "page/newhouse.html"
                };
                pageChange(pageObj);
            }).on('tap', '#loginBtn', function () {
                localStorage.setItem('userinfo', '');
                isLogin = false;
                var pageObj = {
                    pageUrl: "index.html"
                };
                pageChange(pageObj);
            }).on('tap', '#mySetUp', function () {
                var pageObj = {
                    pageUrl: "page/setup/setmain.html"
                };
                pageChange(pageObj);
            }).on('tap', '#locationCity', function () {
                var pageObj = {
                    pageUrl: "page/location.html"
                };
                pageChange(pageObj);
            }).on('touchmove', '#sliderBlockImg', function (e) {
                //底部滑块start
                var touch = e.touches[0];
                var left = touch.pageX - 0.75 * perRem;
                if (left > 0.5 * perRem && left < 8 * perRem) {
                    this.style.left = left + 'px';
                    endPageX = left;
                }
            }).on('touchstart', '#sliderBlockImg', function (e) {
                mui.init({gestureConfig: {drag: false}});
            }).on('touchend', '#sliderBlockImg', function (e) {
                var left = endPageX;
                if (left < 2.375 * perRem) {
                    this.style.left = 0.5 * perRem + 'px';
                } else if (left >= 2.375 && left < 6.125 * perRem) {
                    this.style.left = 4.25 * perRem + 'px';
                    step(1);
                } else if (left >= 6.125 * perRem) {
                    this.style.left = 8 * perRem + 'px';
                    step(3);
                }
                mui.init({gestureConfig: {drag: true}});
                //底部滑块startend
            }).on('tap', '.ri1', function () {
                step(2);
            }).on('tap', '.ri2', function () {
                step(4);
            }).on('tap', '#sub1', function () {
                //提交需求
                hideAll()
            }).on('tap', '#sub2', function () {
                //提交需求
                hideAll()
            });
        },
        getBztt: function () { //获取包租头条数据
            var setting = {
                url: Constants.bztt,
                data: {
                    'pager.pageSize': pageSize,
                    'pager.pageNo': pageNo
                }
            };
            muiAjax(setting, function (data) {
                var tplsetting = {
                    container: '#bzttul',
                    template: '#bztttpl',
                    obj: data
                };
                getTemplate(tplsetting);
                var scroll2 = new ScrollText("bzttul", "pre2", "next2", true, 70, true);
                scroll2.LineHeight = 60;
            }, function (status) {
                //异常处理
            });
        }
    }
    page.init();

    function step(type) {
        base.$('#rent1').style.display = 'none';
        base.$('#rent2').style.display = 'none';
        base.$('#rent3').style.display = 'none';
        base.$('#rent4').style.display = 'none';
        base.$('#rent' + type).style.display = 'block';
        base.$('.bzm-dialog').style.display = 'block';
    }

    function hideAll() {
        base.$('#rent1').style.display = 'none';
        base.$('#rent2').style.display = 'none';
        base.$('#rent3').style.display = 'none';
        base.$('#rent4').style.display = 'none';
        base.$('.bzm-dialog').style.display = 'none';

    }
})();