(function(){mui.init();var currentid="1";var page={init:function(){base.setPageRem();page.bind()},bind:function(){mui(".ms-header-menu").on("tap",".ms-m",function(){switchTab(this)});var muiBack=mui(".mui-back")[0];mui.plusReady(function(){mui(document).on("tap","#fabu",fabuEvent)})}};function switchTab($this){currentid=$this.getAttribute("data-type");base.removeClass(base.$s(".ms-m"),"ms-menu-active");base.addClass($this,"ms-menu-active");base.removeClass(base.$(".section-active"),"section-active");base.addClass(base.$(".ms-con"+currentid),"section-active")}function fabuEvent(){document.activeElement.blur();var content=document.querySelector("#content").value;var sjh=document.querySelector("#phonenum").value;if(content==null||content==""){mui.toast("请输入小区");return}if(sjh==null||sjh==""){mui.toast("请输入手机号");return}var reg=/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;if(!reg.test(sjh)){mui.toast("手机号格式不正确");return}var data={content:content,kind:currentid,contactNumber:sjh};var fburl="";fburl=Constants.myneed;var fabuSettings={data:JSON.stringify(data),type:"post",url:fburl,contentType:"application/json"};document.getElementById("fabu").disabled=true;muiAjax(fabuSettings,function(data){if(data.status=="200"){mui.toast(data.message);plus.webview.currentWebview().reload()}else{mui.toast(data.message);document.getElementById("fabu").disabled=false;plus.webview.currentWebview().reload()}},function(status){})}page.init()})();window.addEventListener("refreshMe",function(){plus.webview.currentWebview().reload()});