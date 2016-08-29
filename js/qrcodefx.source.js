(function () {
    mui.init();
    base.$('#us_name').innerHTML = locgetuserinfo('nickName') || locgetuserinfo('username') || '';
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
                    base.$('#counum').innerHTML = rows[0].couponCount || '';
                    base.$('#frendsnum').innerHTML = rows[0].invitationCount || '';
                }
            });
        },
        bind: function () {
        }
    };
    page.init();
})();