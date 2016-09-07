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
	elementBindEvent(regObj);//注册按钮绑定tap事件
	var yzmObj={
		eventId:'hqyzm',
		eventFunction:function(){
			hqyzmEvent();
		}
	};
	elementBindEvent(yzmObj);//获取验证码按钮绑定tap事件
	
	//登录切换
	var yzmdlObj={
		eventId:'mmdl',
		eventFunction:function(){
			var pageObj={
			 	 pageUrl:'../../page/login/login.html'
			};
			pageChange(pageObj);
		}
	};
	elementBindEvent(yzmdlObj);//获取验证码按钮绑定tap事件
	
});
// 点击获取验证码事件
function hqyzmEvent() {
		var sjh = document.querySelector("#account").value;
		if(sjh == null || sjh == "") {
			mui.toast("请输入手机号");
			return;
		}

		var reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		if(!reg.test(sjh)) {
			mui.toast("手机号格式不正确");
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
			mui.toast("请输入验证码");
			return;
		}
		loginurl = Constants.loginbyphone
		data={
        	memberPhone:memberAccount,
        	checkCode:memberPwd
        };
        
		var loginSettings = {
			data:data,
			type: "post",
			url: loginurl
		};

		document.getElementById("login").disabled = true;

		muiAjax(loginSettings, function(data) {
			if(data.status=='200'){//登录成功
				locsaveuserinfo('memberAccount',data.memberAccount);
				locsaveuserinfo('memberPwd',data.memberPwd);
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
