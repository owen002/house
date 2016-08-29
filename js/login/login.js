mui.init();//初始化
// mui.plusReady(function() {//plus基座准备好后执行
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
	elementBindEvent(regObj);//注册按钮绑定tap事件
	
	//登录切换
	var yzmdlObj={
		eventId:'yzmdl',
		eventFunction:function(){
			var pageObj={
			 	 pageUrl:'../../page/login/loginbycode.html'
			};
			pageChange(pageObj);
		}
	};
	elementBindEvent(yzmdlObj);//获取验证码按钮绑定tap事件

function loginEvent(){
	document.activeElement.blur(); //关闭键盘
		var memberAccount = document.querySelector("#account").value;
		var memberPwd = document.querySelector("#password").value;
		var loginurl = Constants.login;

		if(memberAccount == null || memberAccount == "") {
			mui.toast("请输入用户名/手机号");
			return;
		}

        var data
		if(memberPwd == null || memberPwd== "") {
			mui.toast("请输入登录密码");
			return;
		}
		data={
        	memberAccount:memberAccount,
        	memberPwd:memberPwd
        };

		var loginSettings = {
			data:data,
			type: "post",
			url: loginurl
		};

		document.getElementById("login").disabled = true;

		muiAjax(loginSettings, function(data) {
			if(data.status=='200'){//登录成功
				locsaveuserinfo('phone',data.memberPhone);
				locsaveuserinfo('username',data.memberName);
				locsaveuserinfo('memberID',data.memberID);
				locsaveuserinfo('headerPic',data.headerPic);
				locsaveuserinfo('nickName',data.nickName);
				locsaveuserinfo('gender',data.gender);
				var pageObj={
					  pageUrl:plus.webview.getLaunchWebview().id//首页只create一次
//					pageUrl:'../../index.html'
				}
				pageChange(pageObj);
				//关闭当前页面
					setTimeout(function() {
						plus.webview.currentWebview().hide(); //解决close闪屏问题
						plus.webview.currentWebview().close();
					}, 1000);
			}else{//登录失败
				alert(data.message);
				mui.toast(data.message);
				document.getElementById("login").disabled = false;
			}
		},function(status){
			
		});
}
window.addEventListener('refreshMe',function(){//页面刷新时需要执行的逻辑
	plus.webview.currentWebview().reload();
});
