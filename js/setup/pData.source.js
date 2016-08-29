(function() {
	mui.init();
	var currentid = '1';
	var nickName = '';
	var userinfo = localStorage.getItem('userinfo');
	userinfo = JSON.parse(decodeURIComponent(userinfo));
	var page = {
		init: function() {
			base.setPageRem();
			page.bind();
			page.loaduserInfo();
			page.loadImg();
		},

		bind: function() {
			var muiBack = mui('.mui-back')[0];
			mui.plusReady(function() {
				mui(document).on('tap', '#grtxspan', scTx);
			});
			
			mui(document).on('tap', '#setsex', function () {
	            setsex();
	        }).on('tap', '#sub2', function () {
	            savesex();
	        }).on('tap', '#setnickname', function () {
	            var pageObj={
					pageUrl:'../../page/setup/nickname.html'
				}
				pageChange(pageObj);
	        }).on('tap', '#updatepwd', function () {
	            var pageObj={
					pageUrl:'../../page/setup/updatePhonePwdMsg.html'
				}
				pageChange(pageObj);
	        })
		},
		loadImg: function() { //从本地localstorage里加载会员图像
			var grtx = locgetuserinfo('headerPic');
			if(grtx==undefined||grtx==null||grtx==''){
				grtx='../../images/login/head.png';
			}
			var txtmpl = {
				container: '#grtxspan',
				template: '#grtx',
				obj: {
					headerPic: grtx
				}
			};
			getTemplate(txtmpl);
		},
		loaduserInfo: function() { //从本地localstorage里加载会员图像
		    base.$('#account').innerHTML = userinfo.phone;
		    nickName = userinfo.nickName;
		    if(nickName=='' || nickName==null){
		    	nickName = '未设置';
		    }
		    base.$('#nickName').innerHTML = nickName;
		    var gender = userinfo.gender;
		    var genderName='';
		    if(gender=='1') {
		    	genderName = '男';
		    }else if(gender=='2'){
		    	genderName = '女';
		    }else{
		    	genderName = '未设置';
		    }
		    base.$('#gender').innerHTML = genderName;
		    
		    
		}
	};

	function scTx() { //上传图像
		var btnArray = [{
			title: "拍照"
		}, {
			title: "从相册中选择"
		}];
		plus.nativeUI.actionSheet({
			title: "上传个人图像",
			cancel: "取消",
			buttons: btnArray
		}, function(e) {
			var index = e.index;
			switch(index) {
				case 0:
					break;
				case 1:
					cameraImg();
					break;
				case 2:
					galleryImg();
					break;
			}
		});
	}

	function showImg(url) {
		// 兼容以“file:”开头的情况

		if(0 != url.toString().indexOf("file://")) {
			url = "file://" + url;
		}
		plus.io.resolveLocalFileSystemURL(url, function(entry) {
				entry.file(function(file) {
					var dstname = "_upload/" + file.name; //压缩后的文件地址
					plus.zip.compressImage({
							src: url,
							dst: dstname,
							overwrite: true,
							width: "110",
							height: "110",
							quality: 70
						},
						function(event) { //文件压缩成功 
							uploadImg(event.target, url);
						},
						function(error) { //文件压缩失败
							mui.alert(error.message);
						});
				});
			},
			function(e) {
				mui.toast(e.message);
			});
	}

	//上传图像文件
	function uploadImg(t_file, localurl) {
		var url = Constants.mysctx;
		plus.nativeUI.showWaiting();
		var task = plus.uploader.createUpload(url, {
				method: "POST",
				blocksize: 204800, //断点续传文件块大小 
				priority: 100 //任务优先级
			},
			function(t, status) { // 上传回调函数 
				plus.nativeUI.closeWaiting();
				if(status == 200) { //服务器响应成功
					var data = JSON.parse(t.responseText);
					if(data.status === 200) {//上传成功
						var txtmpl = {
							container: '#grtxspan',
							template: '#grtx',
							obj: data
						};
						getTemplate(txtmpl);
						locsaveuserinfo('headerPic',data.headerPic);
						
					} else if(data.status === '401') {//未登录
						var pageObj = {
							pageUrl: '../../page/login/loginbycode.html'
						};
						pageChange(pageObj);
					} else {
						mui.toast(data.message);
						plus.webview.currentWebview().reload();
					}

				} else {

					mui.toast("文件上传失败，请重新上传");
				}
			}
		);
		task.addFile(t_file, {}); //第2个参数不可缺
		//								plus.navigator.removeAllCookie();//模拟未登录
		task.start();
	}

	//从相册中选择图片
	function galleryImg() {
		mui.toast("从相册中选择一张图片");
		plus.gallery.pick(function(path) {
			showImg(path);
		}, function(err) {
			if(err.code == 12) { //取消选择

			} else {
				mui.toast("图片选择失败");
			}

		}, {
			filter: "image",
			multiple: false //禁止多选
		});
	}

	//拍照
	function cameraImg() {
		
		if(mui.os.ios) {
			var AVCaptureDevice = plus.ios.importClass("AVCaptureDevice");
			var Status = AVCaptureDevice.authorizationStatusForMediaType("vide");
			if(3 != Status) { //ios7.0+
				var btnArray = ["去打开", "取消"];
				mui.confirm('未取得您的相机使用权限，此功能无法使用。请前往应用权限设置打开权限。', '', btnArray, function(e) {
					if(e.index == 0) {
						var NSBundle = plus.ios.importClass('NSBundle');
						var bundle = NSBundle.mainBundle();
						plus.runtime.openURL("prefs:root=" + packageName);
					} else {

					}
				});
			} else {
				cmr.captureImage(function(p) {
					plus.io.resolveLocalFileSystemURL(p, function(entry) {
						var localurl = entry.toLocalURL(); //把拍照的目录路径，变成本地url路径，例如file:///........之类的。
						showImg(localurl);
					});
				}, function(e) {
					if(e.code == 2) { ////调用了相机，但是没有拍照

					} else {
						mui.toast("拍照失败");
					}

				});

			}
		} else {
			//相机权限判断，比较笨的方法
			var isCanuse = true;
			var Camera = plus.android.importClass("android.hardware.Camera");
			var camera = null;
			try {
				camera = Camera.open();
			} catch(e) {
				isCanuse = false;
			} finally {
				if(camera != null) {
					camera.setPreviewCallback(null);
					camera.release();
					camera = null;
				}
			}
			if(isCanuse) {
				var cmr = plus.camera.getCamera();
				cmr.captureImage(function(p) {
					plus.io.resolveLocalFileSystemURL(p, function(entry) {
						var localurl = entry.toLocalURL(); //把拍照的目录路径，变成本地url路径，例如file:///........之类的。
						showImg(localurl);
					});
				}, function(e) {
					if(e.code == 11) { ////调用了相机，但是没有拍照
						if(e.message == 'null') {
							mui.toast("设备异常");
							plus.webview.currentWebview().reload();
						}
					} else {
						mui.toast("拍照失败");
					}

				});
			} else {
				var btnArray = ["去打开", "取消"];
				mui.confirm('未取得您的相机使用权限，此功能无法使用。请前往应用权限设置打开权限。', '', btnArray, function(e) {
					if(e.index == 0) {
						var Builder = plus.android.importClass('android.os.Build');
						var sjcs = Builder.MANUFACTURER;
						if(sjcs.toLowerCase() == 'huawei') {
							try { //华为手机华为管家设置页
								var main = plus.android.runtimeMainActivity();
								var Intent = plus.android.importClass("android.content.Intent");
								var ComponentName = plus.android.importClass('android.content.ComponentName');
								var comp = new ComponentName("com.huawei.systemmanager", "com.huawei.permissionmanager.ui.MainActivity");
								var mIntent = new Intent();
								mIntent.setComponent(comp);
								mIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
								main.startActivity(mIntent);
							} catch(e) {
								mui.toast('请进入手机应用程序设置打开相应权限');
							}
						} else {
							try {
								var main = plus.android.runtimeMainActivity();
								var Intent = plus.android.importClass("android.content.Intent");
								//							var Uri = plus.android.importClass("android.net.Uri");
								//							var mIntent = new Intent('android.settings.APPLICATION_DETAILS_SETTINGS');
								//							mIntent.setFlags(Intent.FLAG_ACTIVITY_NEW_TASK);
								//							mIntent.setData(Uri.parse("package:"+packageName));
								var mIntent = new Intent('android.settings.APPLICATION_SETTINGS');
								main.startActivity(mIntent);
							} catch(e) {
								mui.toast('请进入手机应用程序设置打开相应权限');
							}
						}
					} else {

					}
				});

			}

		}

	}
	
	function setsex() { 
		base.$('#setsex').style.display="block";
	}
	
	function savesex() { 
		var gender = '';
		var radionum = document.getElementsByName("se-type");
 		for(var i=0;i<radionum.length;i++){
			if(radionum[i].checked){
				gender = radionum[i].value
 			}
 		}
       
		if(gender == null || gender == "") {
			mui.toast("请选择性别");
			return;
		}
		
		dataObj={
        	gender:gender
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
				locsaveuserinfo('gender',gender);
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

function loadDefaultImg(element) {
	element.src = "../../images/login/head.png";
}