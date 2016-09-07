var shares = null;
var share_img = '';//分享显示图片
var share_content = '';//分享内容
var share_href = '';//分享链接
var share_title = '';//分享标题
var wrhShare = function () {
    return {
        /**
         * 初始化分享服务
         */
        init: function () {
            plus.share.getServices(function (s) {
                shares = {};
                for (var i in s) {
                    var t = s[i];
                    shares[t.id] = t;
                }
            }, function (e) {
                mui.toast("获取分享服务列表失败：" + e.message);
            });

        },
        /**
         * 分享操作
         */
        shareAction: function (id, ex) {
            var s = null;
            if (!id || !(s = shares[id])) {
                mui.toast("无效的分享服务！");
                return;
            }
            if (s.authenticated) {
                wrhShare.shareMessage(s, ex);
            } else {
                s.authorize(function () {
                    wrhShare.shareMessage(s, ex);
                }, function (e) {
                    mui.toast("认证授权失败：" + e.code + " - " + e.message);
                });
            }
        },
        shareShow: function () {
            var ids = [{id: "sinaweibo"}, 
//          {id: "weixin", ex: "WXSceneSession"}, {
//                  id: "weixin",
//                  ex: "WXSceneTimeline"
//              },
                {id: "qq"}],
                bts = [{title: "分享到新浪微博"}, 
//              {title: "发送给微信好友"}, {title: "分享到微信朋友圈"}, 
                {title: "分享到QQ"}];
            plus.nativeUI.actionSheet({cancel: "取消", buttons: bts},
                function (e) {
                    var i = e.index;
                    if (i > 0) {
                        wrhShare.shareAction(ids[i - 1].id, ids[i - 1].ex);
                    } else {

                    }
                }
            );
        },
        /**
         * 打开分享操作列表
         */
        sendShare: function (title_param, content_param, img_param, href_param) {
            wrhShare.init();
            share_title = title_param;
            share_content = content_param;
            share_img = img_param;
            share_href = href_param;
            wrhShare.shareShow();
        },
        /**
         * 发送分享消息
         */
        shareMessage: function (s, ex) {
            var msg = {extra: {scene: ex}};
            msg.content = share_content;
            msg.title = share_title;
            if (share_img) {
                msg.thumbs = [share_img];
            }
            if (share_href) {
                msg.href = [share_href];
            }
            var sendMessage = function () {
                s.send(msg, function () {
                    mui.toast("分享到\"" + s.description + "\"成功！ ");
                }, function (e) {
                });
            }
            if ('sinaweibo' == s.id) {//新浪微博无法分享链接,不传递href，不能写href='',否则无法显示图片
                if (plus.os.name == "Android") {//Android 不能分享网络图片
                    // mui.toast("下载图片中，即将打开新浪微博分享...");
                    var dtask = plus.downloader.createDownload();
                    var localPictures = '';

                    function onStateChanged(d, status) {
                        switch (d.state) {
                            case 4:
                                if (status == 200) {
                                    console.log("图片下载完成：" + d.filename);
                                    localPictures = plus.io.convertLocalFileSystemURL(d.filename);
                                    msg.thumbs = [localPictures];
                                    msg.pictures = [localPictures];
                                    sendMessage();
                                } else {
                                    mui.toast("下载图片失败");
                                }
                                break;
                            case 1:
                                console.log("下载开始");
                                break;
                            case 2:
                                console.log("请求已响应");
                                break;
                            case 3:
                                console.log("下载进行中");
                                break;
                            default:
                                console.log("state: " + d.state);
                                break;
                        }
                    }

                    mui.each(msg.pictures, function (i, n) {
                        var dtask = plus.downloader.createDownload(n);
                        dtask.addEventListener("statechanged", onStateChanged, false);
                        dtask.start();
                    });
                }
            } else {
                msg.href = share_href;
                sendMessage();
            }
        }
    }
}();