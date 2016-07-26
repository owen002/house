(function() {

	var page = {
		init: function() {
			mui.init();
			base.setPageRem();
			page.initSliderMenu();
			//图片轮播
			mui("#slider").slider({
				interval: 3000
			});

		},
		initSliderMenu: function() {
			//侧滑容器父节点
			var offCanvasWrapper = mui('#offCanvasWrapper');
			//主界面容器
			var offCanvasInner = offCanvasWrapper[0].querySelector('.mui-inner-wrap');
			//菜单容器
			var offCanvasSide = document.getElementById("offCanvasSide");

			//侧滑容器的class列表，增加.mui-slide-in即可实现菜单移动、主界面不动的效果；
			var classList = offCanvasWrapper[0].classList;

			offCanvasSide.classList.remove('mui-transitioning');
			offCanvasSide.setAttribute('style', '');
			classList.add('mui-scalable');
//			classList.add('mui-slide-in');
			//主界面‘显示侧滑菜单’按钮的点击事件
			document.getElementById('offCanvasShow').addEventListener('tap', function() {
				offCanvasWrapper.offCanvas('show');
			});
			//主界面和侧滑菜单界面均支持区域滚动；
			mui('#offCanvasSideScroll').scroll();
			mui('#offCanvasContentScroll').scroll();
			//实现ios平台原生侧滑关闭页面；
			if(mui.os.plus && mui.os.ios) {
				mui.plusReady(function() { //5+ iOS暂时无法屏蔽popGesture时传递touch事件，故该demo直接屏蔽popGesture功能
					plus.webview.currentWebview().setStyle({
						'popGesture': 'none'
					});
				});
			}
		}
	}
	page.init();
})()