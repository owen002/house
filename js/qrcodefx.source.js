(function() {
	mui.init();
	var page = {
		init: function() {
			base.setPageRem();
			page.csqrcode();
			page.bind();
		},
		bind: function() {},
		csqrcode: function() {
			//使用canvas生成
			jQuery('#qrcode').qrcode({
				render: "canvas",
				text: "http://www.xiangshan.rh-ronghe.com/rental_interface/",//apk下载地址
				width: 300,
				height: 300
			});
		}
	};
	page.init();
})();