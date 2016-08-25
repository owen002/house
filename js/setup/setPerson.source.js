//个人资料
(function () {
    mui.init();
    base.setPageRem();
    var userinfo = localStorage.getItem('userinfo');
	userinfo = JSON.parse(decodeURIComponent(userinfo));
    var page = {
        init: function () {
            base.setPageRem();
            page.loaduserInfo();
       //     base.setMuiBackHeight();
            //列表
            page.bind();
          
        },
        loaduserInfo: function() { //从本地localstorage里加载会员图像
		    base.$('#nickName').value = userinfo.nickName;
		},
        bind: function () {
	        var muiBack = mui('.mui-back')[0];
	        mui(document).on('tap', '#savePerson', function () {
	            savePerson();
	        })
        }
    };

	function savePerson() {
        var nickName = document.querySelector("#nickName").value;
		if(nickName == null || nickName == "") {
			mui.toast("请输入昵称");
			return;
		}
		
		dataObj={
        	nickName:nickName
        };
        
		var setings = {
			data:JSON.stringify(dataObj),
	    	type:'post',
	    	contentType: "application/json",
	    	url: Constants.updateMember
		};
		
		muiAjax(setings, function(data) {
			if(data.status==='200') {
				mui.toast(data.message);
				//更新缓存
				var newuserinfo = {phone:userinfo.phone,username:userinfo.username,uid:userinfo.uid,headerPic:userinfo.headerPic,nickName:nickName,gender:userinfo.gender};
				localStorage.setItem('userinfo',encodeURIComponent(JSON.stringify(newuserinfo)));
				var pageObj={
					pageUrl:'../../page/setup/personalData.html'
				}
				pageChange(pageObj);
			} else {
				//错误处理
				mui.toast(data.message);
			}
		}, function(status) {
			//当前ajax错误预留
		});
    }
    page.init();
})();