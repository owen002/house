(function () {
    var userinfo = localStorage.getItem('userinfo');
    var isLogin = false;
    if (userinfo && userinfo != {}) {
        isLogin = true;
        userinfo = JSON.parse(decodeURIComponent(userinfo));
    }
    var page = {
        init: function () {
            mui.init();
            base.setPageRem();
            page.initSliderMenu();
            //图片轮播
            mui("#slider").slider({
                interval: 3000
            });
            page.checkUser();
            page.bind();
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
                                pageUrl: ""
                            };
                            break;
                        case '2':
                            pageObj = {
                                pageUrl: ""
                            };
                            break;
                        case '3':
                            pageObj = {
                                pageUrl: ""
                            };
                            break;
                        case '4':
                            pageObj = {
                                pageUrl: ""
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
            }).on('tap', '#mySetUp', function () {
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
            }).on('tap', '#loginBtn', function () {
                localStorage.setItem('userinfo', '');
                isLogin = false;
                var pageObj = {
                    pageUrl: "index.html"
                };
                pageChange(pageObj);
            });
        }
    }
    page.init();
})()