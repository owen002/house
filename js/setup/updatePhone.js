(function () {
    mui.init();
    var page = {
        init: function () {
            base.setPageRem();
            page.bind();
        },
        bind: function () {
            var muiBack = mui('.mui-back')[0];
            mui(document).on('tap', '#hqyzm', function () {
                    getYzm();
            }).on('tap','#save', function () {
				    savephone(); 
            })
        }
    };

    page.init();
    
    function savephone() {
    	var sjh = document.querySelector("#sjh").value;
    	if(!base.isPhoneNum(sjh)){
			return;
		}
    	var checkCode = document.querySelector("#yzma").value;
    	if(checkCode == null || checkCode == "") {
			mui.toast("请输入验证码");
			return;
		}
    	var dataObj={
	    	memberAccount:sjh,
	        checkCode:checkCode
	    };
	    
    	var dataSettings = {
    	    type:'post',
    	    contentType: "application/json",
    	    data:JSON.stringify(dataObj),
			url: baseUrl + "update_member_phone"
		};
		muiAjax(dataSettings, function(data) {
			if(data.status==='200') {
				mui.alert(data.message);
				var pageObj={
					//pageUrl:plus.webview.getLaunchWebview().id
					pageUrl:'../../page/login/login.html'
				}
				pageChange(pageObj);
			} else {
				mui.toast(data.message);
			}
		}, function(status) {
			//当前ajax错误预留
		});	
    }
    
    function getYzm() {
			var sjh = document.querySelector("#sjh").value;
			if(!base.isPhoneNum(sjh)){
				return;
			}
	
			document.getElementById("hqyzm").disabled = true;
			document.getElementById("hqyzm").innerHTML = "发送中...";
	
			var codeSettings = {
				"url": Constants.getCode + "/" + sjh
			};
			muiAjax(codeSettings, function(data) {
				if(data.status==='200') {
					yzmtime(30);
					// 取得验证码成功
					mui.alert(data.message);
				} else {
					//错误处理
					mui.alert(data.message);
					document.getElementById("hqyzm").innerHTML = "获取验证码";
					document.getElementById("hqyzm").disabled = false;
				}
			}, function(status) {
				//当前ajax错误预留
			});
	}

})();