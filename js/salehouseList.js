(function() {
	base.setPageRem();
	base.setMuiBackHeight();
	var muiBack = mui('.mui-back')[0];
	mui(document).on('tap', '.slider-menu-choose li', function() {
		var cLocation = mui('.choose-location')[0];
		if(cLocation.style.display == 'none') {
			base.Slider.slideDown(cLocation, 100);
			muiBack.style.display = 'block';
		} else {
			base.Slider.slideUp(cLocation, 100);
			muiBack.style.display = 'none';
		}
	}).on('tap', '#guessUlike li', function() {
		var fyid=this.getAttribute('fyid');
		var pageObj = {
			pageUrl: "salehouse.html",
			postData:{
				fyid:fyid
			}
		};
		pageChange(pageObj);
	})
})();

var deceleration = mui.os.ios ? 0.003 : 0.0009;
mui('.mui-scroll-wrapper').scroll({
	bounce: false,
	indicators: true, //是否显示滚动条
	deceleration: deceleration
});
var pageNum = 1;
mui.ready(function() {
	mui.each(document.querySelectorAll('.mui-scroll'), function(index, pullRefreshEl) {
		mui(pullRefreshEl).pullToRefresh({
			up: {
				callback: function() {
					var self = this;
					setTimeout(function() {
						getAjaxData(self, 1);
					}, 1000);
				},
				auto:true//页面加载完自动执行一次上拉动作
			},
			down: {
				callback: function() {
					var self = this;
					setTimeout(function() {
						getAjaxData(self, 2);
					}, 1000);
				}
			}
		});
	});
});

function getAjaxData(escl, upOrdown) {
	var adata = {
		page: {
			pageSize: 5,
			pageNum: pageNum
		}
	};
	var setting = {
		url: baseUrl + 'front/json_sale_housing',
		data: adata,
		type: 'post',
		contentType: "application/json"
	};
	muiAjax(setting, function(data) {
		if(upOrdown == 1) { //向上滑动
			pageNum++;
			if(data.totalRows < 5) { //没有更多数据
				var obj = {
					imgUrl: baseUrl,
					rows: data.rows
				};
				var tmpl = mui('#xsfyxs')[0].innerHTML;
				escl.element.querySelector('.gus-list-ul').innerHTML += Mustache.render(tmpl, obj);
				escl.endPullUpToRefresh(true); //禁止上拉
			} else {
				escl.endPullUpToRefresh(); //结束上拉
			}
		} else { //向下滑动
			pageNum = 1;
			var obj = {
				imgUrl: baseUrl,
				rows: data.rows
			};
			var tmpl = mui('#xsfyxs')[0].innerHTML;
			escl.element.querySelector('.gus-list-ul').innerHTML = Mustache.render(tmpl, obj);
			if(data.totalRows<5){
				escl.endPullUpToRefresh(true); //禁止上拉
			}else{
				escl.refresh(true);//重置可上拉
			}
			escl.endPullDownToRefresh();//结束下拉
		}

	}, function(status) {
		//异常处理
	});
}