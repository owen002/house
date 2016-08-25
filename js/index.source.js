(function () {
    var pageSize = 10,
        pageNo = 1;
    var tjxqflag = '';
    var userinfo = localStorage.getItem('userinfo');
    var perRem = 0,
        endPageX = 0;
    var isLogin = false;
    if (userinfo && userinfo != {}) {
        isLogin = true;
        userinfo = JSON.parse(decodeURIComponent(userinfo));
    }
    var page = {
        init: function () {
            //          mui.init();
            //          perRem = base.setPageRem();
            page.getSliderImage();
            page.initSliderMenu();
            page.checkUser();
            page.bind();
            page.getBztt();
            page.getyzfy();
            page.ljtjsj();
            page.getXzcs();
        },
        sxsjbycityid: function () {
            page.getSliderImage();
            page.checkUser();
            page.getBztt();
            page.getyzfy();
            page.ljtjsj();
            page.getXzcs();
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
                        case '6': //二维码
                            pageObj = {
                                pageUrl: "page/qrcodefx.html"
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
            }).on('tap', '.messages-icon', function () {
                var pageObj = {
                    pageUrl: "page/messages.html"
                };
                pageChange(pageObj);
            }).on('tap', '#myNearBy', function () { //定位
                get_loc({
                    success: function (result) {
                        if (result.coords.latitude == null || result.coords.latitude == undefined ||
                            result.coords.latitude == '') { //数据无效
                            var pageObj = {
                                pageUrl: 'page/nearby.html'
                            };
                            pageChange(pageObj);
                        } else {
                            var pageObj = {
                                pageUrl: 'page/mynearby.html',
                                postData: {
//										location: result.coords
                                    location: null//测试用
                                }
                            };
                            pageChange(pageObj);
                        }
                    },
                    error: function (e) {
                        console.log('地址获取异常:' + JSON.stringify(e));
                        var pageObj = {
                            pageUrl: 'page/nearby.html'
                        };
                        pageChange(pageObj);
                    }
                });
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
                if (!isLogin) {
                    var pageObj = {
                        pageUrl: "page/login/login.html"
                    };
                    pageChange(pageObj);
                } else {
                    var pageObj = {
                        pageUrl: "page/setup/setmain.html"
                    };
                    pageChange(pageObj);
                }
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
                mui.init({
                    gestureConfig: {
                        drag: false
                    }
                });
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
                mui.init({
                    gestureConfig: {
                        drag: true
                    }
                });

                setSS();
                //底部滑块startend
            }).on('tap', '.ri11', function () {
                tjxqflag = '4';
                step(2);
                setSS();
            }).on('tap', '.ri12', function () {
                tjxqflag = '2';
                step(2);
                setSS();
            }).on('tap', '.ri21', function () {
                tjxqflag = '1';
                step(4);
                setSS();
            }).on('tap', '.ri22', function () {
                tjxqflag = '3';
                step(4);
                setSS();
            }).on('tap', '#sub1', function () {
                //提交需求
                page.tjxq(1);
            }).on('tap', '#sub2', function () {
                //提交需求
                page.tjxq(2);
            }).on('tap', '#offCanvasWrapper', function (e) {
                var target = e.target || e.srcElement;
                if (jQuery(target).closest('.bzm-dialog-content').length == 0) {
                    hideAll();
                }
            }).on('tap', '#bzttul li', function () {
                var informationID = this.getAttribute('data-id');
                var pageObj = {
                    pageUrl: "page/news.html?type=1&id=" + informationID
                };
                pageChange(pageObj);
            }).on('tap', '#ljtjtz1', function () {
                var id = 1;//this.getAttribute('data-id');
                var pageObj = {
                    pageUrl: "page/news.html?type=2&id=" + id
                };
                pageChange(pageObj);
            }).on('tap', '#ljtjtz2', function () {
                var id = 2;//this.getAttribute('data-id');
                var pageObj = {
                    pageUrl: "page/news.html?type=2&id=" + id
                };
                pageChange(pageObj);
            }).on('tap', '#ljtjtz3', function () {
                var id = 3;//this.getAttribute('data-id');
                var pageObj = {
                    pageUrl: "page/news.html?type=2&id=" + id
                };
                pageChange(pageObj);
            }).on('tap', '#ljtjtz4', function () {
                var id = 4;//this.getAttribute('data-id');
                var pageObj = {
                    pageUrl: "page/news.html?type=2&id=" + id
                };
                pageChange(pageObj);
            });
        },
        tjxq: function (flag) {
            var sjh = '';
            var content = '';
            if (flag == 1) { //出租
                sjh = document.querySelector("#czphone").value;
                if (sjh == null || sjh == "") {
                    mui.toast("请输入手机号");
                    return;
                }

                var reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                if (!reg.test(sjh)) {
                    mui.toast("手机号格式不正确");
                    return;
                }
                content = document.querySelector("#czcontent").value;
                if (content == null || content == "") {
                    mui.toast("请输入相关内容");
                    return;
                }
            } else { //买卖
                sjh = document.querySelector("#mmphone").value;
                if (sjh == null || sjh == "") {
                    mui.toast("请输入手机号");
                    return;
                }

                var reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
                if (!reg.test(sjh)) {
                    mui.toast("手机号格式不正确");
                    return;
                }
                content = document.querySelector("#mmcontent").value;
                if (content == null || content == "") {
                    mui.toast("请输入相关内容");
                    return;
                }
            }
            data = {
                contactNumber: sjh,
                content: content,
                kind: tjxqflag
            };
            var codeSettings = {
                url: Constants.myneed,
                type: 'post',
                data: JSON.stringify(data),
                contentType: "application/json"

            };
            hideAll();
            muiAjax(codeSettings, function (data) {
                mui.toast(data.message);
            }, function (status) {
                //当前ajax错误预留
            });
        },
        getBztt: function () { //获取包租头条数据
            var setting = {
                url: Constants.bztt,
                data: {
                    'parameters.cityID': locgetuserinfo('cityid'),
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
        },
        getGpsPos: function () { //定位
            var cityId = locgetuserinfo('citycode');
            if (cityId == null || cityId == undefined ||
                cityId == '') { //首次使用
                get_loc({
                    success: function (result) {
                        if (result.address.cityCode == null || result.address.cityCode == undefined ||
                            result.address.cityCode == '') {
                            var pageObj = {
                                pageUrl: 'page/location.html'
                            };
                            pageChange(pageObj);
                        } else {
                            plus.navigator.closeSplashscreen(); //关闭启动页面
                            page.init();
                            locsaveuserinfo('citycode', result.address.cityCode);
                        }
                    },
                    error: function (e) {
                        console.log('地址获取异常:' + JSON.stringify(e));
                        var pageObj = {
                            pageUrl: 'page/location.html'
                        };
                        pageChange(pageObj);
                    }
                });
            } else { //曾经访问过
                plus.navigator.closeSplashscreen(); //关闭启动页面
                page.init();
            }

        },
        getyzfy: function () { //获取优质房源
            mui('#gussULikeUl')[0].innerHTML = '';
            if (1 == 1) {//租房
                var setting = {
                    url: Constants.rentlist,
                    type: 'post',
                    data: {
                        'parameters.isTop': 1,
                        'parameters.cityID': locgetuserinfo('cityid'),
                        'pager.pageSize': 1,
                        'pager.pageNo': 1
                    }
                };
                muiAjax(setting, function (data) {
                    var tmpl = mui('#yzfytpl1')[0].innerHTML;

                    var fragment = document.createDocumentFragment();
                    var div = document.createElement('div');
                    div.innerHTML = Mustache.render(tmpl, data);
                    while (div.hasChildNodes()) {
                        fragment.appendChild(div.firstChild);
                    }
                    mui('#gussULikeUl')[0].appendChild(fragment);
                }, function (status) {
                    //异常处理
                });
            }
            if (1 == 1) {//二手房
                var setting = {
                    url: Constants.salelist,
                    type: 'post',
                    data: {
                        'parameters.isTop': 1,
                        'parameters.cityID': locgetuserinfo('cityid'),
                        'pager.pageSize': 1,
                        'pager.pageNo': 1
                    }
                };
                muiAjax(setting, function (data) {
                    var tmpl = mui('#yzfytpl2')[0].innerHTML;
                    var fragment = document.createDocumentFragment();
                    var div = document.createElement('div');
                    div.innerHTML = Mustache.render(tmpl, data);
                    while (div.hasChildNodes()) {
                        fragment.appendChild(div.firstChild);
                    }
                    mui('#gussULikeUl')[0].appendChild(fragment);
                }, function (status) {
                    //异常处理
                });
            }
            if (1 == 1) {//众筹房
                var setting = {
                    url: Constants.crowdfundlist,
                    type: 'post',
                    data: {
                        'parameters.isTop': 1,
                        'parameters.cityID': locgetuserinfo('cityid'),
                        'pager.pageSize': 1,
                        'pager.pageNo': 1
                    }
                };
                muiAjax(setting, function (data) {
                    var tmpl = mui('#yzfytpl3')[0].innerHTML;
                    var fragment = document.createDocumentFragment();
                    var div = document.createElement('div');
                    var obj = {
                        rows: data.rows,
                        syz: function () {
                            return (this.totalPrice - this.atualInvestment);
                        }
                    };
                    div.innerHTML = Mustache.render(tmpl, obj);
                    while (div.hasChildNodes()) {
                        fragment.appendChild(div.firstChild);
                    }
                    mui('#gussULikeUl')[0].appendChild(fragment);
                }, function (status) {
                    //异常处理
                });
            }
            if (1 == 1) {//新房
                var setting = {
                    url: Constants.newhouselist,
                    type: 'post',
                    data: {
                        'parameters.isTop': 1,
                        'parameters.cityID': locgetuserinfo('cityid'),
                        'pager.pageSize': 1,
                        'pager.pageNo': 1
                    }
                };
                muiAjax(setting, function (data) {
                    var tmpl = mui('#yzfytpl4')[0].innerHTML;
                    var fragment = document.createDocumentFragment();
                    var div = document.createElement('div');
                    div.innerHTML = Mustache.render(tmpl, data);
                    while (div.hasChildNodes()) {
                        fragment.appendChild(div.firstChild);
                    }
                    mui('#gussULikeUl')[0].appendChild(fragment);
                }, function (status) {
                    //异常处理
                });
            }
        },
        ljtjsj: function () {//累计房源统计信息
            var setting = {
                url: Constants.ljtjxx,
                type: 'post',
                data: {
                    'parameters.cityID': locgetuserinfo('cityid'),
                    'pager.pageSize': 4,
                    'pager.pageNo': 1
                }
            };
            muiAjax(setting, function (data) {
                if (1 == 1) {
                    var tplsetting = {
                        container: '#ljtjxx1',
                        template: '#ljtj',
                        obj: {
                            rows: data.rows,
                            istrue: function () {
                                if (this.kind == '0') {
                                    return true;
                                } else {
                                    return false;
                                }
                            },
                            fzlx: '租房'
                        }
                    };
                    getTemplate(tplsetting);
                }
                if (1 == 1) {
                    var tplsetting = {
                        container: '#ljtjxx2',
                        template: '#ljtj',
                        obj: {
                            rows: data.rows,
                            istrue: function () {
                                if (this.kind == '1') {
                                    return true;
                                } else {
                                    return false;
                                }
                            },
                            fzlx: '二手房'
                        }
                    };
                    getTemplate(tplsetting);
                }
                if (1 == 1) {
                    var tplsetting = {
                        container: '#ljtjxx3',
                        template: '#ljtj',
                        obj: {
                            rows: data.rows,
                            istrue: function () {
                                if (this.kind == '2') {
                                    return true;
                                } else {
                                    return false;
                                }
                            },
                            fzlx: '众筹房'
                        }
                    };
                    getTemplate(tplsetting);
                }
                if (1 == 1) {
                    var tplsetting = {
                        container: '#ljtjxx4',
                        template: '#ljtj',
                        obj: {
                            rows: data.rows,
                            istrue: function () {
                                if (this.kind == '3') {
                                    return true;
                                } else {
                                    return false;
                                }
                            },
                            fzlx: '新房'
                        }
                    };
                    getTemplate(tplsetting);
                }
            }, function (status) {
                //异常处理
            });
        },
        getXzcs: function () {
            var cityname = locgetuserinfo('cityname');
            var ctemp = {
                container: '#dqxzcs',
                template: '#dqcsname',
                obj: {
                    cityname: locgetuserinfo('cityname'),
                }
            };
            getTemplate(ctemp);
        }
    }
    mui.init();
    perRem = base.setPageRem();
    if (mui.os.ios || mui.os.android) {
        mui.plusReady( //先执行定位
            function () {
                page.getGpsPos();
            }
        );
    } else {
        page.init();
    }

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

    mui(document).on('tap', '.search-box', function () {
        base.goSearch('index');
    });
    window.addEventListener('refreshMe', function () {
        page.sxsjbycityid();
    });

    function setSS() {
        var he = document.body.clientHeight;
        var chei = base.$('.bzm-dialog-content').clientHeight;
        base.$('.bzm-dialog-content').style.top = (he - chei) / 2 + 'px';
    }
})();