(function(){mui.init();base.setPageRem();var page={init:function(){base.setPageRem();page.loaduserInfo();page.bind()},loaduserInfo:function(){base.$("#nickName").value=locgetuserinfo("nickName")},bind:function(){var muiBack=mui(".mui-back")[0];mui(document).on("tap","#savePerson",function(){savePerson()})}};function savePerson(){var nickName=document.querySelector("#nickName").value;if(nickName==null||nickName==""){mui.toast("请输入昵称");return}dataObj={nickName:nickName};var setings={data:JSON.stringify(dataObj),type:"post",contentType:"application/json",url:Constants.updateMember};muiAjax(setings,function(data){if(data.status==="200"){mui.toast(data.message);locsaveuserinfo("nickName",nickName);zdRefresh("personalData.html","personMain");setTimeout(function(){plus.webview.currentWebview().hide();plus.webview.currentWebview().close()},1e3)}else{mui.toast(data.message)}},function(status){})}page.init()})();