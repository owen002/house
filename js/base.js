var base = (function () {
    var baseUrl = '/';
    var api = {};

    function delay(callback, time) {
        time = time || 500;
        return setTimeout(callback, time);
    }

    function setPageRem() {
        var cwidth = document.body.clientWidth;
        document.getElementsByTagName("html")[0].style.fontSize = cwidth / 10 + 'px';
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

    return {
        api: api,
        setPageRem: setPageRem,
        hasClass: hasClass,
        addClass: addClass,
        removeClass: removeClass,
        delay: delay
    }
})()