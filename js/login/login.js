mui.init();//初始化
mui.plusReady(function() {//plus基座准备好后执行
	// 点击登录按钮事件
	var loginObj={
		eventId:'login',
		eventFunction:function(){
			loginEvent();
		}
	};
	elementBindEvent(loginObj);//登录按钮绑定tap事件
	var regObj={
		eventId:'btnreg',
		eventFunction:function(){
			 var pageObj={
			 	 pageUrl:'reg.html'
			 };
			 pageChange(pageObj);
		}
	};
	elementBindEvent(regObj);//登录按钮绑定tap事件
	
});

function loginEvent(){
	document.activeElement.blur(); //关闭键盘
		var memberAccount = document.querySelector("#account").value;
		var memberPwd = document.querySelector("#password").value;

		if(memberAccount == null || memberAccount == "") {
			mui.toast("请输入用户名/手机号");
			return;
		}

		if(memberPwd == null || memberPwd== "") {
			mui.toast("请输入登录密码");
			return;
		}
        
        var data={
        	memberAccount:memberAccount,
        	memberPwd:memberPwd
        };
        
		var loginSettings = {
			data:data,
			type: "post",
			url: Constants.urlPath + "front/login"
		};

		document.getElementById("login").disabled = true;

		muiAjax(loginSettings, function(data) {
			if(data.status=='200'){//登录成功
				
			}else{//登录失败
				mui.toast(data.message);
				document.getElementById("login").disabled = false;
			}
		},function(status){
			
		});
}
window.addEventListener('refreshMe',function(){//页面刷新时需要执行的逻辑
	
});
