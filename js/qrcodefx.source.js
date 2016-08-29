(function () {
    mui.init();
    var userinfo = localStorage.getItem('userinfo') || '';
    userinfo = JSON.parse(decodeURIComponent(userinfo));
    base.$('#us_name').innerHTML = userinfo.nickName || userinfo.username || '';
    var param;
    if (mui.os.ios) {
        param = {
            'parameters[kind]': 2
        }
    } else {
        param = {
            'parameters[kind]': 1
        }
    }
    var querySettings = {
        url: Constants.arcode,
        data: param,
        type: 'post'
    };
    var page = {
        init: function () {
            base.setPageRem();
            page.query();
            page.bind();
        },
        query: function () {
            muiAjax(querySettings, function (data) {
                var rows = data.rows;
                if (rows) {
                    var url = rows[0].imagePath;
                    base.$('#downqrCode').setAttribute('src', url);
                    base.$('#downLoadAr').setAttribute('href', rows[0].downloadAddress || '');
                }
            });
        },
        bind: function () {
        }
    };
    page.init();
})();