(function () {
    mui.init();
    var sjh='';
    var checkCode='';
    var page = {
        init: function () {
            base.setPageRem();
            page.bind();
            sjh = base.param('sjh');
            checkCode = base.param('checkCode');
        },
        bind: function () {
            var muiBack = mui('.mui-back')[0];
            mui(document).on('tap','#update', function () {
				    updatePwd();
            })
        }
    };

    page.init();
    
    function updatePwd() {
		var mima = document.querySelector("#mima").value;
	  	if(mima == null || mima == "") {
			 mui.toast("请输入新密码");
			 return;
	    }
	    var dataObj={
	    	memberAccount:sjh,
	        memberPwd:mima,
	        checkCode:checkCode
	    };
	    
		var pwdSettings = {
    	    type:'post',
    	    contentType: "application/json",
    	    data:JSON.stringify(dataObj),
			url: baseUrl + "front/reset_forget_password"
		};
		muiAjax(pwdSettings, function(data) {
			if(data.status==='200') {
				mui.toast("密码修改成功");
				var pageObj={
					//pageUrl:plus.webview.getLaunchWebview().id
					pageUrl:'../../page/login/login.html'
				}
				pageChange(pageObj);
			} else {
				mui.alert(data.message);
			}
		}, function(status) {
			//当前ajax错误预留
		});
	}
    

})();