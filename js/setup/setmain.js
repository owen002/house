(function () {
    mui.init();
    var userinfo = localStorage.getItem('userinfo');
    userinfo = JSON.parse(decodeURIComponent(userinfo));
    base.$('#phonenum').innerHTML = userinfo.phone;
    var page = {
        init: function () {
            base.setPageRem();
            page.bind();
        },
        bind: function () {
            var muiBack = mui('.mui-back')[0];
        }
    };

    page.init();
    
})();