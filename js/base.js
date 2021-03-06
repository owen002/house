var base = (function () {
    var baseUrl = '/';
    var baseRemSize = 0;

    function delay(callback, time) {
        time = time || 500;
        return setTimeout(callback, time);
    }

    function setPageRem() {
        var cwidth = document.body.clientWidth;
        document.getElementsByTagName("html")[0].style.fontSize = cwidth / 10 + 'px';
        baseRemSize = cwidth / 10;
        return baseRemSize;
    }

    function hasClass(dom, className) {
        if (dom) {
            var classNames = dom.getAttribute('class') || '';
            if (classNames.indexOf(className) >= 0) {
                return true;
            } else {
                return false;
            }
        }
    }

    function addClass(domA, className) {
        if (domA) {
            if (domA.length) {
                var len = domA.length;
                for (var i = 0; i < len; i++) {
                    var dom = domA[i];
                    var classNames = dom.getAttribute('class') || '';
                    classNames += ' ' + className;
                    dom.setAttribute('class', classNames);
                }
            } else {
                var dom = domA;
                var classNames = dom.getAttribute('class') || '';
                classNames += ' ' + className;
                dom.setAttribute('class', classNames);
            }
        }
    }

    function removeClass(domA, className) {
        if (domA) {
            if (domA.length) {
                var len = domA.length;
                for (var i = 0; i < len; i++) {
                    var dom = domA[i];
                    var classNames = dom.getAttribute('class') || '';
                    var reg = new RegExp(className, 'g');
                    classNames = classNames.replace(reg, '');
                    dom.setAttribute('class', classNames);
                }
            } else {
                var dom = domA;
                var classNames = dom.getAttribute('class') || '';
                var reg = new RegExp(className, 'g');
                classNames = classNames.replace(reg, '');
                dom.setAttribute('class', classNames);
            }
        }
    }

    function setMuiBackHeight() {
        mui('.mui-back')[0].style.height = window.screen.height - 2.4 * baseRemSize + 'px';
        mui('.mui-back')[0].style.top = 1.2 * baseRemSize + 'px';
    }

    var Slider = (function () {
        var Slider = {};

        function TimerManager() {
            this.timers = [];
            this.args = [];
            this.isFiring = false;
        }

        TimerManager.makeInstance = function (element) {
            if (!element.__TimerManager__ || element.__TimerManager__.constructor != TimerManager) {
                element.__TimerManager__ = new TimerManager();
            }
        };

        TimerManager.prototype.add = function (timer, args) {
            this.timers.push(timer);
            this.args.push(args);
            this.fire();
        };

        TimerManager.prototype.fire = function () {
            if (!this.isFiring) {
                var timer = this.timers.shift(),        // 取出定时器
                    args = this.args.shift();          // 取出定时器参数
                if (timer && args) {
                    this.isFiring = true;
                    timer(args[0], args[1]);
                }
            }
        };

        TimerManager.prototype.next = function () {
            this.isFiring = false;
            this.fire();
        };

        function fnSlideDown(element, time) {
            if (element.offsetHeight == 0) {
                // 获取元素总高度
                element.style.display = "block";
                var totalHeight = element.offsetHeight;
                element.style.height = "0px";
                var currentHeight = 0;
                var increment = totalHeight / (time / 10);
                var timer = setInterval(function () {
                    currentHeight = currentHeight + increment;
                    element.style.height = currentHeight + "px";
                    if (currentHeight >= totalHeight) {
                        clearInterval(timer);
                        element.style.height = totalHeight + "px";
                        if (element.__TimerManager__ && element.__TimerManager__.constructor == TimerManager) {
                            element.__TimerManager__.next();
                        }
                    }
                }, 10);
            } else {
                if (element.__TimerManager__ && element.__TimerManager__.constructor == TimerManager) {
                    element.__TimerManager__.next();
                }
            }
        }

        function fnSlideUp(element, time) {
            if (element.offsetHeight > 0) {
                var totalHeight = element.offsetHeight;
                var currentHeight = totalHeight;
                var decrement = totalHeight / (time / 10);
                var timer = setInterval(function () {
                    currentHeight = currentHeight - decrement;
                    element.style.height = currentHeight + "px";
                    if (currentHeight <= 0) {
                        clearInterval(timer);
                        element.style.display = "none";
                        element.style.height = totalHeight + "px";
                        if (element.__TimerManager__ && element.__TimerManager__.constructor == TimerManager) {
                            element.__TimerManager__.next();
                        }
                    }
                }, 10);
            } else {
                if (element.__TimerManager__ && element.__TimerManager__.constructor == TimerManager) {
                    element.__TimerManager__.next();
                }
            }
        }

        Slider.slideDown = function (element, time) {
            TimerManager.makeInstance(element);
            element.__TimerManager__.add(fnSlideDown, arguments);
            return this;
        };

        Slider.slideUp = function (element, time) {
            TimerManager.makeInstance(element);
            element.__TimerManager__.add(fnSlideUp, arguments);
            return this;
        };

        return Slider;
    })();

    function querySelect(select) {
        return document.querySelector(select);
    }

    function querySelectAll(select) {
        return document.querySelectorAll(select);
    }

    function GetQueryString(name) {
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) {
            return decodeURIComponent(r[2]);
        } else {
            return '';
        }
    }

    function trimVal(val) {
        return (!val || val == 'null' || val == 'undefined') ? '' : val
    }

    function startSlider($) {
        $('.mui-slider').slider();
        $('.mui-scroll-wrapper.mui-slider-indicator.mui-segmented-control').scroll({
            scrollY: false,
            scrollX: true,
            indicators: false,
            snap: '.mui-control-item'
        });
    }

    function goSearch(type) {
        var pageObj = {
            pageUrl: "search.html"
        };
        if (type && type == 'index') {
            pageObj.pageUrl = 'page/search.html'
        }
        pageChange(pageObj);
    }

    function isPhoneNum(sjh) {
        if (sjh == null || sjh == "") {
            mui.toast("请输入手机号");
            return false;
        }

        var reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
        if (!reg.test(sjh)) {
            mui.toast("手机号格式不正确");
            return false;
        }
        return true;
    }

    function toggle(ele) {
        var dis = ele.style.display || '';
        if (dis == 'none') {
            ele.style.display = 'block';
        } else {
            ele.style.display = 'none';
        }
    }

    function trimBlank(str) {
        str += '';
        return str.replace(/\s*/g, '');
    }

    function getMsgCnt() {
        var setting = {
            url: Constants.unreadMessage,
            type: 'get',
            contentType: "application/json"
        };
        muiAjax1(setting, function (data) {
            //添加第一个和最后一个
//          console.log("消息"+JSON.stringify(data));
            if(data!=null&&data.status&&data.status==='401'){
            	mui('#msgCnt')[0].innerHTML = '';
            } else {
            	mui('#msgCnt')[0].innerHTML = data.count;
            }
        }, function (status) {
            //异常处理
        });
    }


    return {
        setPageRem: setPageRem,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        delay: delay,
        setMuiBackHeight: setMuiBackHeight,
        Slider: Slider,
        $: querySelect,
        $s: querySelectAll,
        param: GetQueryString,
        trimVal: trimVal,
        startSlider: startSlider,
        isPhoneNum: isPhoneNum,
        goSearch: goSearch,
        toggle: toggle,
        trimBlank: trimBlank,
        getMsgCnt: getMsgCnt
    }
})();

(function () {
    var top = ''
    mui(document).on('tap', '.fk-change', function () {
        this.focus();
        top = base.$('.bzm-dialog-content').style.top;
        base.$('.bzm-dialog-content').style.top = '12%';
    });
})()