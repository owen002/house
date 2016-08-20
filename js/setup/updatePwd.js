(function () {
    mui.init();
    var page = {
        init: function () {
            base.setPageRem();
            page.bind();
        },
        getYzm() {
			var sjh = document.querySelector("#account").value;
			if(!isPhoneNum(sjh)){
				return;
			}
//			if(sjh == null || sjh == "") {
//				mui.toast("请输入手机号");
//				return;
//			}
//	
//			var reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
//			if(!reg.test(sjh)) {
//				mui.toast("手机号格式不正确");
//				return;
//			}
	
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
	    },
        bind: function () {
            var muiBack = mui('.mui-back')[0];
            mui(document).on('tap', '#hqyzm', function () {
                    page.getYzm();
            }).on('tap', '#nextStep', function () {
                    var pageObj = {
							pageUrl: '../../page/setup/updatePwd.html'
						};
					pageChange(pageObj);					
            })
        }
    };

    page.init();
    
    function nextstep() {
    	if(!isPhoneNum(sjh)){
			return;
		}
    	//var code = 
    }
})();