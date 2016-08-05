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
		  hqyzmEvent();
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
		  updatePwdEvent();
		  break;
	}
}

// 点击获取验证码事件
function hqyzmEvent() {
		sjh = document.querySelector("#sjh").value;
		if(sjh == null || sjh == "") {
			mui.toast("请输入手机号");
			return;
		}

		var reg = /^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;
		if(!reg.test(sjh)) {
			mui.toast("手机号格式不正确");
			return;
		}


		var loginSettings = {
			"url": baseUrl + "front/get_checkcode/" + sjh
		};
		muiAjax(loginSettings, function(data) {
			if(data.status =='200') {
				// 取得验证码成功
			  document.getElementById("div1").style.display="none";
			  document.getElementById("div2").style.display="block";
			  document.getElementById("div3").style.display="none";
			  mui.alert(data.message);

			  step = 2;
			} else {
				mui.alert(data.message);
			}
		}, function(status) {
			//当前ajax错误预留
		});
	}

// 密码修改提交
function updatePwdEvent() {
		mima = document.querySelector("#mima").value;
	  	if(mima == null || mima == "") {
			 mui.toast("请输入新密码");
			 return;
	    }
	  	
	    var dataObj={
	    	memberAccount:sjh,
	        memberPwd:mima,
	        checkCode:yzm
	    };
	    
		var pwdSettings = {
    	    type:'post',
    	    contentType: "application/json",
    	    data:JSON.stringify(dataObj),
			url: baseUrl + "front/reset_forget_password"
		};
		muiAjax(pwdSettings, function(data) {
			if(data.status==='200') {
				// 取得验证码成功
				var pageObj={
					mui.toast("密码设置成功");
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


window.addEventListener('refreshMe', function() { //页面刷新时需要执行的逻辑

});