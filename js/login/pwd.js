var step = 1;
var sjh;
var yzm;
var mima;
mui.init(); //初始化
mui.plusReady(function() { //plus基座准备好后执行
	var pwdObj = {
		eventId: 'setpwd',
		eventFunction: function() {
			setpEvent()
		}
	};
	elementBindEvent(pwdObj); //下一步绑定tap事件
});

function setpEvent() {
	switch(step) {
		case 1:
		  if(!hqyzmEvent());
		  	break;
		  document.getElementById("div1").style.display="none";
		  document.getElementById("div2").style.display="block";
		  document.getElementById("div3").style.display="none";
		  step = 2;
		  break;
		case 2:
		  //填写验证码跳下一步
		  yzm = document.querySelector("#yzm").value;
		  if(yzm == null || yzm == "") {
			 mui.toast("请输入验证码");
			 return;
		  }
		  
		  document.getElementById("div1").style.display="none";
		  document.getElementById("div2").style.display="none";
		  document.getElementById("div3").style.display="block";
		  step = 3;
		  break;
		case 3: 
		  //填写密码提交
		  mima = document.querySelector("#mima").value;
		  if(mima == null || mima == "") {
			 mui.toast("请输入新密码");
			 return;
		  }
		  break;
	}
}

// 点击获取验证码事件
function hqyzmEvent() {
		sjh = document.querySelector("#sjh").value;
		if(sjh == null || sjh == "") {
			mui.toast("请输入手机号");
			return false;
		}

		var reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		if(!reg.test(sjh)) {
			mui.toast("手机号格式不正确");
			return false;
		}

//		document.getElementById("hqyzm").disabled = true;
//		document.getElementById("hqyzm").innerHTML = "发送中...";

		var loginSettings = {
			"url": Constants.urlPath + "front/get_checkcode/" + sjh
		};
		muiAjax(loginSettings, function(data) {
			if(data.status==='200') {
				yzmtime(30);
				// 取得验证码成功
				mui.alert(data.message);
				return true;
			} else {
				//错误处理
				mui.alert(data.message);
//				document.getElementById("hqyzm").innerHTML = "获取验证码";
//				document.getElementById("hqyzm").disabled = false;
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
    	url:Constants.urlPath+'front/save_member'
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