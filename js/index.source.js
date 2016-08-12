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
            page.getSliderImage();
            page.initSliderMenu();
            page.checkUser();
            page.bind();
            
        },
        //获取轮播图片
    	getSliderImage:function () {
			var setting = {
				url:baseUrl + 'front/json_advertisement',
				type: 'get',
				contentType: "application/json"
			};
			muiAjax(setting, function(data) {
				//添加第一个和最后一个
				var rowsArr = data.rows;
				var arr = new Array();
				arr[0] = rowsArr[rowsArr.length-1];
				arr[rowsArr.length+1] = rowsArr[0];
				for (var i = 0, j = rowsArr.length; i < j; i++) {
					arr[i+1] = rowsArr[i];
				}
				
				var obj = {
					rowsArr:rowsArr,
					rows: arr
				};
				var tmpl = mui('#index-guangao-template')[0].innerHTML;
				mui('#slider')[0].innerHTML = Mustache.render(tmpl, obj);

                mui('.mui-slider-item')[0].className = mui('.mui-slider-item')[0].className + ' mui-slider-item-duplicate';
                mui('.mui-slider-item')[rowsArr.length+1].className = mui('.mui-slider-item')[rowsArr.length+1].className + ' mui-slider-item-duplicate';
		        mui('.mui-indicator')[0].className = mui('.mui-indicator')[0].className + ' mui-active';
		        
		        //图片轮播
		        mui("#slider").slider({
                	interval: 3000
            	});
			}, function(status) {
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
                                pageUrl: ""
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
            });
        }
    }
    page.init();
})()