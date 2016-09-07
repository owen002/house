(function () {
    mui.init();
    base.$('#phonenum').innerHTML = locgetuserinfo('phone');
    var page = {
        init: function () {
            base.setPageRem();
            page.bind();
        },
        bind: function () {
            var muiBack = mui('.mui-back')[0];
            mui(document).on('tap', '#exitlogin', function () {
            	var setting={
                	url:Constants.logout
                }
                muiAjax(setting,function(){
                	mui.toast('成功退出');
                },function(status){
                	
                });
				locdeluserinfo('memberAccount');
				locdeluserinfo('memberPwd');
				locdeluserinfo('phone');
				locdeluserinfo('username');
				locdeluserinfo('memberID');
				locdeluserinfo('headerPic');
				locdeluserinfo('nickName');
				locdeluserinfo('gender');
//				plus.navigator.removeAllCookie();
                var pageObj = {
                    pageUrl: plus.webview.getLaunchWebview().id
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