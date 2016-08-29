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
            mui(document).on('tap', '#exitlogin', function () {
		        localStorage.setItem('userinfo', '');
		      //  isLogin = false;
		        var pageObj = {
		            pageUrl: "../../index.html"
		        };
		        pageChange(pageObj);
	    	}).on('tap', '#personalInfo', function () {
		        var pageObj = {
		            pageUrl: "../../page/setup/personalData.html"
		        };
		        pageChange(pageObj);
	    	}).on('tap', '#updatePhone', function () {
		        var pageObj = {
		            pageUrl: "../../page/setup/updatePhone.html"
		        };
		        pageChange(pageObj);
	    	}).on('tap', '#aboutBZM', function () {
		        var pageObj = {
		            pageUrl: "../../page/setup/about.html"
		        };
		       pageChange(pageObj);
	    	});
        }
    };
    page.init();
})();