mui.init(); //初始化
mui.plusReady(function() { //plus基座准备好后执行
	var regObj = {
		eventId: 'reg',
		eventFunction: function() {
			regEvent();
		}
	};
	elementBindEvent(regObj); //登录按钮绑定tap事件
	var yzmObj = {
		eventId: 'hqyzm',
		eventFunction: function() {
			hqyzmEvent();
		}
	};
	elementBindEvent(yzmObj); //登录按钮绑定tap事件
	
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

//手机注册事件
function regEvent() {
	var sjh = document.querySelector("#account").value;
	var yzma = document.querySelector("#yzma").value;
	var mima = document.querySelector("#password").value;
	var yqm = document.querySelector("#yqma").value;
	var xycheck=mui('input[name=\'checkbox1\']')[0];
	if(sjh == null || sjh == "") {
		mui.toast("请输入手机号");
		return;
	}
	var reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
	if(!reg.test(sjh)) {
		mui.toast("手机号格式不正确");
		return;
	}

	if(yzma == null || yzma == "") {
		mui.toast("请输入验证码");
		return;
	}

	if(mima == null || mima == "") {
		mui.toast("请输入需要设置的密码");
		return;
	} else {
		if(mima.length < 6 || mima.length > 14) {
			mui.toast("请输入6-14位密码");
			return;
		}
	}
    if(!xycheck.checked){
    	mui.toast('请同意包租妹协议');
    	return;
    }
    document.querySelector('#reg').disabled=true;
    var dataObj={
    	memberAccount:sjh,
        memberPhone:sjh,
        memberPwd:mima,
        checkCode:yzma
    };
    var setting={
    	data:JSON.stringify(dataObj),
    	type:'post',
    	contentType: "application/json",
    	url:Constants.regAccount
    };
    muiAjax(setting,function(data){
    	if(data.status==='200'){
    		mui.toast(data.message);
    		//注册成功跳转登录页
    		var pageObj={
    			pageUrl:'login.html'
    		};
    		pageChange(pageObj);
    	}else{
    		mui.toast(data.message);
    		document.getElementById("hqyzm").innerHTML = "获取验证码";
    		document.querySelector('#reg').disabled=false;
    	}
    },function(status){
    	
    });
}

function yzmtime(countdown) {
		var countdown = countdown;
		if(countdown == 0) {
			document.getElementById("hqyzm").innerHTML = "获取验证码";
			document.getElementById("hqyzm").disabled = false;
			clearTimeout(set);
		} else {
			document.getElementById("hqyzm").disabled = true;
			document.getElementById("hqyzm").innerHTML = countdown + "s后再获取";
			countdown--;
			set = setTimeout(function() {
				yzmtime(countdown);
			}, 1000);
		}

	}

window.addEventListener('refreshMe', function() { //页面刷新时需要执行的逻辑

});