(function() {
	mui.init();
	var pageSize = 10,
		pageNos = {
			pageNo1: 1,
			pageNo2: 1,
			pageNo3: 1,
			pageNo4: 1
		},
		canPulls = {
			canPull1: true,
			canPull2: true,
			canPull3: true,
			canPull4: true
		};
	var currentid = 1;
	var clocation = {};
	var dsid = '';
	var ptid = '';
	var page = {
		init: function() {
			base.setPageRem();
			mui.plusReady(function() {
				clocation = getQueryString('location');
				dsid = getQueryString('dsid');
				ptid = getQueryString('ptid');
//				page.queryList(1);
			});

			page.bind();
		},
		queryList: function(type,upOrdown) {
			var qurl = '';
			var qdata = {};
			if(type == 1) { //租房
				if(clocation == undefined || clocation == null || clocation == '') { //定位失败手动选择
					qurl = Constants.rentlist;
					if(upOrdown==2){//向上
						qdata = {
						'parameters.cityID': locgetuserinfo('cityid'),
						'parameters.districtID': dsid,
						'parameters.platID': ptid,
						'pager.pageSize': pageSize,
						'pager.pageNo': pageNos.pageNo1
					};
					}else{//向下
						qdata = {
						'parameters.cityID': locgetuserinfo('cityid'),
						'parameters.districtID': dsid,
						'parameters.platID': ptid,
						'pager.pageSize': pageSize,
						'pager.pageNo': 1
					};
					}
					
				} else { //定位成功
                     qurl = Constants.fjzf;
					if(upOrdown==2){//向上
						qdata = {
						'parameters.longitude': location.lng,
						'parameters.latitude': location.lat,
						'pager.pageSize': pageSize,
						'pager.pageNo': pageNos.pageNo1
					};
					}else{//向下
						qdata = {
						'parameters.longitude': location.lng,
						'parameters.latitude': location.lat,
						'pager.pageSize': pageSize,
						'pager.pageNo': 1
					};
					}
				}
			}
			if(type == 2) { //售房

			}
			if(type == 3) { //众筹房

			}
			if(type == 4) { //新房

			}

			var querySettings = {
				url: qurl,
				data: qdata,
				type: 'post'
			};

			muiAjax(querySettings, function(data) {
				var rows = data.rows;
				var rentlength = rows.length,
					totalLength = data.totalRows;
				if(rows.length > 0) {
					if(rentlength < pageSize) {
						page.setCanPull(type, false);
					} else if(totalLength == (pageSize * (page.getPageNo(type) - 1) + rentlength)) {
						page.setCanPull(type, false);
					} else {
						page.setCanPull(type, true);
					}
					var obj = {
						rows: rows
					};

					var tmpl = mui('#rows-li-template' + currentid)[0].innerHTML;
					var fragment = document.createDocumentFragment();
					var div = document.createElement('div');
					div.innerHTML = Mustache.render(tmpl, obj);
					while(div.hasChildNodes()) {
						fragment.appendChild(div.firstChild);
					}
					mui('#guessUlike' + currentid)[0].appendChild(fragment);
				} else {
					page.setCanPull(false);
				}
			}, function(status) {

			});
		},
		getPageNo: function(currentid) {
			if(currentid == 1) {
				return pageNos.pageNo1;
			}
			if(currentid == 2) {
				return pageNos.pageNo2;
			}
			if(currentid == 3) {
				return pageNos.pageNo3;
			}
			if(currentid == 4) {
				return pageNos.pageNo4;
			}
		},
		setPageNo: function(currentid, adds) {
			if(currentid == 1) {
				pageNos.pageNo1 += adds;
			}
			if(currentid == 2) {
				pageNos.pageNo2 += adds;
			}
			if(currentid == 3) {
				pageNos.pageNo3 += ads;
			}
			if(currentid == 4) {
				pageNos.pageNo4 += ads;
			}
		},
		getCanPull: function(currentid) {
			if(currentid == 1) {
				return canPulls.canPull1;
			}
			if(currentid == 2) {
				return canPulls.canPull2;
			}
			if(currentid == 3) {
				return canPulls.canPull3;
			}
			if(currentid == 4) {
				return canPulls.canPull4;
			}
		},
		setCanPull: function(currentid, flag) {
			if(currentid == 1) {
				canPulls.canPull1 = flag;
			}
			if(currentid == 2) {
				canPulls.canPull2 = flag;
			}
			if(currentid == 3) {
				canPulls.canPull3 = flag;
			}
			if(currentid == 4) {
				canPulls.canPull4 = flag;
			}
		},
		bind: function() {
			mui('.ms-header-menu').on('tap', '.ms-m', function() {
				switchTab(this);
			});
			mui.each(document.querySelectorAll('.mysign-content'),
				function(index, pullRefreshEl) {
					mui(pullRefreshEl).pullToRefresh({
						down: {
							callback: function() {
								var self = this;
								setTimeout(function() {
									page.queryList(index,1);
									self.endPullDownToRefresh();
								}, 500);
							}
						},
						up: {
							callback: function() {
								var self = this;
								setTimeout(function() {
									if(page.getCanPull(index)) {
										page.setCanPull(index,2);
										page.queryList(index);
									}
									self.endPullUpToRefresh(!page.getCanPull(index));
								}, 500);
							},
							auto:true//自动触发上拉加载
						}
					});
				});
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
				var id = this.getAttribute('data-id');
				var pageObj = {
					pageUrl: "newhousedetail.html?houseid=" + id
				};
				pageChange(pageObj);
			})
		}
	};

	function switchTab($this) {
		currentid = $this.getAttribute('data-type');
		base.removeClass(base.$s('.ms-m'), 'ms-menu-active');
		base.addClass($this, 'ms-menu-active');
		base.removeClass(base.$('.section-active'), 'section-active');
		base.addClass(base.$('.ms-con' + currentid), 'section-active');
	}

	page.init();
})();