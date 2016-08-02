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
    // location.href = settings.pageUrl;
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
    var ycjw=plus.webview.getWebviewById(settings.id);
    if(ycjw){
    	mui.fire(ycjw,'refreshMe');//如果webview已存在，自动刷新，每个页面必须自定义refreshMe事件函数，表示页面刷新逻辑
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
    		createNew:false //是否重复创建同样id的webview，默认为false:不重复创建，直接显示
    	});
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
            if (fuc instanceof Function) fuc(data);
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