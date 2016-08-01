var base = (function () {
    var baseUrl = '/';
    var baseRemSize = 0;
    var api = {};

    function delay(callback, time) {
        time = time || 500;
        return setTimeout(callback, time);
    }

    function setPageRem() {
        var cwidth = document.body.clientWidth;
        document.getElementsByTagName("html")[0].style.fontSize = cwidth / 10 + 'px';
        baseRemSize = cwidth / 10;
    }

    function hasClass(dom, className) {
        var classNames = dom.getAttribute('class');
        if (classNames.indexOf(className) >= 0) {
            return true;
        } else {
            return false;
        }
    }

    function addClass(dom, className) {
        var classNames = dom.getAttribute('class');
        classNames += ' ' + className;
        dom.setAttribute('class', classNames);
    }

    function removeClass(dom, className) {
        var classNames = dom.getAttribute('class');
        var reg = new RegExp(className, 'g');
        classNames = classNames.replace(reg, '');
        dom.setAttribute('class', classNames);
    }

    function setMuiBackHeight() {
        mui('.mui-back')[0].style.height = window.screen.height - 1.2 * baseRemSize + 'px';
        mui('.mui-back')[0].style.top = 1.2 * baseRemSize + 'px';
    }

    var height_0, maxHeight0;

    function slideDown(obj) {
        obj.style.display = 'block';
        maxHeight0 = obj.offsetHeight;
        obj.style.height = 0;
        height_0 = 0;

        var stime = setInterval(function () {
            height_0 += 10;
            if (height_0 < maxHeight0) {
                obj.style.height = height_0 + 'px';
            } else {
                clearInterval(stime);
            }
        }, 10)
    }

    var height_1, maxHeight1;

    function slideUp(obj) {
        maxHeight1 = obj.clientHeight;
        height_1 = maxHeight1;

        var stime = setInterval(function () {
            height_1 -= 10;
            if (height_1 > 0) {
                obj.style.height = height_1 + 'px';
            } else {
                obj.style.height = maxHeight1 + 'px';
                obj.style.display = 'none';
                clearInterval(stime);
            }
        }, 10)
    }

    return {
        api: api,
        setPageRem: setPageRem,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        delay: delay,
        setMuiBackHeight: setMuiBackHeight,
        slideDown: slideDown,
        slideUp:slideUp
    }
})()