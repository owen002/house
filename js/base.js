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
            return unescape(r[2]);
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

    // mui(document).on('tap','.back',function(){
    //     history.back();
    // });
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
        startSlider: startSlider
    }
})();