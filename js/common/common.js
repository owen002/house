mui.init({
    gestureConfig: {
        tap: true, //默认为true
        doubletap: true, //默认为false
        longtap: true, //默认为false
    }
});

// 设置json默认值
// defaults：默认值
// settings：返回值
function extendSettings(defaults, settings) {
    if (typeof(settings) != "object") {
        return defaults;
    } else {
        for (var o in defaults) {
            var addflg = true;
            var addobj;
            for (var n in settings) {
                if (o == n) {
                    addflg = false;
                    addobj = "";
                    break;
                } else {
                    addobj = o;
                }
            }

            if (addflg) {
                settings[addobj] = defaults[addobj];
            }
        }

        return settings;
    }
}

// 事件绑定
// settings.eventId：对象id
// settings.eventType：事件绑定类型，默认tap
// settings.eventFunction：触发方法体
function elementBindEvent(settings) {
    var defaults = {
        eventType: "tap"
    };
    settings = extendSettings(defaults, settings);
    mui("#" + settings.eventId)[0].addEventListener(settings.eventType, function (ele) {
        if (settings.eventFunction) {
            settings.eventFunction.call('', this, ele);
        }
    })
};
// 群组上事件
// settings.eventObj：父容器id
// settings.eventType：事件绑定类型
// settings.targetObj：带绑定控件组样式
// settings.eventFunction：触发方法体
function elementBindEventByObj(settings) {
    var defaults = {
        eventType: "tap"
    };
    settings = extendSettings(defaults, settings);
    var selector = settings.selector || '#';
    mui(selector + settings.eventObj).on(settings.eventType, "." + settings.targetObj, function (ele) {
        if (unsafe_tap()) return;
        if (settings.eventFunction) {
            settings.eventFunction.call('', this, ele);
        }
    })
};


var tap_first = null;

function unsafe_tap() {
    if (!tap_first) {
        tap_first = new Date().getTime();
        setTimeout(function () {
            tap_first = null;
        }, 1500);
    } else {
        return true;
    }
}

// 页面跳转
// settings.pageUrl：页面url
// settings.postData：目标页面参数
// settings.aniShow：页面加载动态效果,默认为slide-in-right
function pageChange(settings) {
if(!mui.os.ios&&!mui.os.android){
    location.href = settings.pageUrl;//浏览器模式
}else{
                settings.postData = settings.postData || {};
                settings.postData.webViewId = plus.webview.currentWebview().id;
                var defaults = {
                	aniShow: "pop-in"
                };
                settings = extendSettings(defaults, settings);
                document.activeElement.blur(); //跳转时关闭软键盘
                //id去除timestamp
                	var pos = settings.pageUrl.indexOf("?");
                	var viewId;
                	if(pos <= -1) {
                		viewId = settings.pageUrl;
                	} else {
                		viewId = settings.pageUrl.substr(0, pos);
                	}
                settings.id=viewId;
                var ycjwvnums=localStorage.getItem('bzmcjwv');
                if(ycjwvnums==null||ycjwvnums==undefined||ycjwvnums==''){
                	ycjwvnums=0;
                }
                if(ycjwvnums>=25){//系统已创建的webview超过23，关闭先前的10个webview，释放资源
                	var allwv=plus.webview.all();
                	var cwv=0;
                	for(var o=0;o<allwv.length&&cwv<=10;o++){
                		if((allwv[o].parent&&allwv[o].parent.id==plus.webview.getLaunchWebview().id)
                		||(allwv[o].id==plus.webview.getLaunchWebview().id)){//首页及其加载的子页不销毁
               
                		}
                		else{
                			allwv.close();
                			cwv++;
                		}
                	}
                }
                if(viewId==plus.webview.getLaunchWebview().id){//首页不重复创建
                	plus.webview.getLaunchWebview().reload();
                	plus.webview.getLaunchWebview().show();
                	return;
                }
                	mui.openWindow({
                		id: settings.id,
                		url: settings.pageUrl,
                		show: {
                			autoShow: true, //页面loaded事件发生后自动显示，默认为true
                			aniShow: settings.aniShow, //页面显示动画，默认为”slide-in-right“；
                			duration: 200 //页面动画持续时间，Android平台默认100毫秒，iOS平台默认200毫秒；
                		},
                		waiting: {
                			autoShow: false
                		},
                		extras: {
                			param: settings.postData
                		},
                		createNew:true //是否重复创建同样id的webview，默认为false:不重复创建，直接显示，此处设为true，主要是考虑回退
                	});
                	localStorage.setItem('bzmcjwv',plus.webview.all().length+1);
                	}
};

// 获取请求参数
// name：参数名称
function getQueryString(name) {
    var self = plus.webview.currentWebview();
    if (self.param) {
        var obj = self.param;
        return obj[name];
    }
    return null;
};

// 组合json
function jsonjoin(sorJosn, tarJosn) {
    sorJosn.push = function (o) {
        if (typeof(o) == 'object')
            for (var p in o) this[p] = o[p];
    };
    sorJosn.push(
        tarJosn
    )

    return sorJosn;
};

// 事件绑定扩展
// settings.eventObj：对象
// settings.eventType：事件绑定类型，默认tap
// settings.eventFunction：触发方法体
function elementBindEventListener(settings) {
    var defaults = {
        eventType: "tap"
    };
    settings = extendSettings(defaults, settings);
    mui(settings.eventObj)[0].addEventListener(settings.eventType, function (ele) {
        if (settings.eventFunction) {
            settings.eventFunction.call('', this, ele);
        }
    })
};

// 标签元素绑定事件扩展(带延迟)
// settings.eventObj 对象
// settings.eventType 事件类型
// settings.targetObj 目标选择器对象
// settings.eventFunction 触发方法体
function elementBindEventExtend(settings) {
    var defaults = {
        eventType: "tap"
    };
    settings = extendSettings(defaults, settings);
    mui(settings.eventObj).on(settings.eventType, settings.targetObj, function (ele) {
        if (unsafe_tap()) return;
        if (settings.eventFunction) {
            settings.eventFunction.call('', this, ele);
        }
    })
};

// 标签元素绑定事件(不带延迟)
// settings.eventObj 对象
// settings.eventType 事件类型
// settings.targetObj 目标选择器对象
// settings.eventFunction 触发方法体
function elementBind(settings) {
    var defaults = {
        eventType: "tap"
    };
    settings = extendSettings(defaults, settings);
    mui(settings.eventObj).on(settings.eventType, settings.targetObj, function (ele) {
        if (settings.eventFunction) {
            settings.eventFunction.call('', this, ele);
        }
    })
};


// 错误处理器
function errorHandler(fn, XMLHttpRequest, textStatus, errorThrown) {
    var code = "";
    if (textStatus) {
        code = textStatus;
    } else {
        if (XMLHttpRequest) {
            code = XMLHttpRequest.status;
        }
    }
    if (fn instanceof Function) {
        fn.call("", code);
    }
}

/*
 * mui ajax请求封装
 */
function muiAjax(settings, fuc, errfuc) {
    var dataAjax = {
        dataType: 'json',
        type: 'get',
        timeout: Constants.TIMEOUT,
        success: function (data) {
        	if(data.status==='401'){
        		var logpos='';
        		var durl='';
        		if(mui.os.ios||mui.os.android){
        			durl=plus.webview.currentWebview().getURL();
        		}else{
        			durl=window.location.href;
        		}
        		if(durl.indexOf('page/login/')>-1){
        				logpos='login.html';
        			}
        			else if(durl.indexOf('page/setup/')>-1){
        				logpos='../login/login.html';
        			}else if(durl.indexOf('page/')>-1){
        				logpos='login/login.html';
        			}else{
        				logpos='page/login/login.html';
        			}
        		var pageObj={
        			pageUrl:logpos
        		};
        		pageChange(pageObj);
        	}else{
        		if (fuc instanceof Function) fuc(data);
        	}
            
        },
        error: function (xhr, type, errorThrown) {
            // 系统级别错误处理
            errorHandler(function (status) {
                if (errfuc instanceof Function) {
                    errfuc(status);
                }
            }, xhr, type, errorThrown);
        }
    };
    settings = extendSettings(dataAjax, settings);
    mui.ajax(settings.url, settings);
}

//模板绑定
function getTemplate(settings) {
	var temp = settings.template;
	var container = settings.container;
	var template = mui(temp)[0].innerHTML;
	var tpl =Mustache.render(template, settings.obj);
	mui(container)[0].innerHTML = tpl;
}

//主动刷新页面，考虑系统中有多个同名id的webview
//zid:webviewid
//func:页面自定义事件函数
function zdRefresh(zid,func){
	var allw=plus.webview.all();
	for(o in allw){
		if(allw[o].id==zid){
			mui.fire(allw[o],func);
		}
	}
}

//存储userinfo
function locsaveuserinfo(key,value){
	var userinfostr = localStorage.getItem('userinfo');
	if(userinfostr!=undefined&&userinfostr!=null&&userinfostr!=''&&userinfostr!='null'){
		userinfostr = decodeURIComponent(userinfostr);
		var userinfo=JSON.parse(userinfostr);
		userinfo[key]=value;
		localStorage.setItem('userinfo',encodeURIComponent(JSON.stringify(userinfo)));
	}else{
		var userinfo={
		};
		userinfo[key]=value;
		localStorage.setItem('userinfo',encodeURIComponent(JSON.stringify(userinfo)));
	}
}
//获取userinfo
function locgetuserinfo(key){
	var userinfostr = localStorage.getItem('userinfo');
	if(userinfostr!=undefined&&userinfostr!=null&&userinfostr!=''&&userinfostr!='null'){
		userinfostr = decodeURIComponent(userinfostr);
		var userinfo=JSON.parse(userinfostr);
		return userinfo[key];
	}else{
		return '';
	}
}
