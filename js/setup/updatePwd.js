(function () {
    mui.init();
    var page = {
        init: function () {
            base.setPageRem();
            page.bind();
            page.loaduserInfo();
        },
		loaduserInfo: function() { //从本地localstorage里加载会员图像
			var userinfo = localStorage.getItem('userinfo');
		    userinfo = JSON.parse(decodeURIComponent(userinfo));
		    base.$('#sjh').value = userinfo.phone;
		},
        bind: function () {
            var muiBack = mui('.mui-back')[0];
            mui(document).on('tap', '#hqyzm', function () {
                    getYzm();
            }).on('tap','#nextStep', function () {
				    nextstep(); 
            })
        }
    };
mui.plusReady(page.init);
//  page.init();
    
    function nextstep() {
    	var sjh = document.querySelector("#sjh").value;
    	if(!base.isPhoneNum(sjh)){
			return;
		}
    	var checkCode = document.querySelector("#yzma").value;
    	if(checkCode == null || checkCode == "") {
			mui.toast("请输入验证码");
			return;
		}
        var pageObj = {
				pageUrl: '../../page/setup/updatePwd.html?sjh='+sjh+'&checkCode='+checkCode
			};
		pageChange(pageObj);	
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