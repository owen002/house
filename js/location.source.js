(function($) {
	var trimVal = base.trimVal;
	var page = {
		init: function() {
			base.setPageRem();
			mui.init();
			mui.ready(function() {
				var header = document.querySelector('header.mui-bar');
				var list = document.getElementById('list');
				page.query();
				//calc hieght
				list.style.height = (document.body.offsetHeight - header.offsetHeight) + 'px';
				//create
				window.indexedList = new mui.IndexedList(list);
			});
			mui.plusReady(page.bind);
		},
		query: function() {
			var querySettings = {
				url: Constants.citylist,
				type: 'post',
				async:false //很重要，数据一定要在mui.IndexedList(list)前存在
			};

			muiAjax(querySettings, function(data) {
				console.log(JSON.stringify(data));
				var templsetting={
					container:'#cityList',
					template:'#cityindexlist',
					obj:{
						rows:data
					}
				};
				getTemplate(templsetting);

			}, function(status) {

			});
		},
		bind: function() {
			mui('#cityList').on('tap', '.mui-indexed-list-item', function() {
				locsaveuserinfo('citycode',this.getAttribute('citycode'));
				locsaveuserinfo('cityname',this.getAttribute('cityName'));
				locsaveuserinfo('cityid',this.getAttribute('cityId'));
				var iwv=plus.webview.getLaunchWebview();
				mui.fire(iwv,'refreshMe');
				iwv.show();
			});
		}
	};
	page.init();
})(mui);