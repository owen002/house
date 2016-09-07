(function() {
	mui.init();
	//阻尼系数
	var deceleration = mui.os.ios ? 0.003 : 0.0009;
//  mui('.mui-scroll-wrapper').scroll({
//	    bounce: false,
//	   indicators: true, //是否显示滚动条
//	   deceleration: deceleration
//    });		
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
	var dname='';
	var pname='';
	var page = {
		init: function() {
			base.setPageRem();
			
			mui.plusReady(function() {
				clocation = getQueryString('location');
				dsid = getQueryString('dsid');
				ptid = getQueryString('ptid');
				dname= getQueryString('dname');
				pname = getQueryString('pname');
				page.dqwzxs();
				page.queryList(1);
				page.bind();
			});

			
		},
		queryList: function(type,upOrdown) {
			var qurl = '';
			var qdata = {};
			if(type == 1) { //租房
				if(clocation == undefined || clocation == null || clocation == '') { //定位失败手动选择
					qurl = Constants.rentlist;
				} else { //定位成功
                     qurl = Constants.fjzf;
				}
			}
			if(type == 2) { //售房
				if(clocation == undefined || clocation == null || clocation == '') { //定位失败手动选择
					qurl = Constants.salelist;
				} else { //定位成功
                     qurl = Constants.fjesf;
				}
			}
			if(type == 3) { //众筹房
				if(clocation == undefined || clocation == null || clocation == '') { //定位失败手动选择
					qurl = Constants.crowdfundlist;
				} else { //定位成功
                     qurl = Constants.fjzcouf;
				}
			}
			if(type == 4) { //新房
				if(clocation == undefined || clocation == null || clocation == '') { //定位失败手动选择
					qurl = Constants.newhouselist;
				} else { //定位成功
                     qurl = Constants.fjxf;
				}
			}
			if(clocation == undefined || clocation == null || clocation == '') { //定位失败手动选择
				if(upOrdown==2||upOrdown==undefined){//向上
						qdata = {
						'parameters[cityID]': locgetuserinfo('cityid'),
						'parameters[districtID]': dsid,
						'parameters[platID]': ptid,
						'pager.pageSize': pageSize,
						'pager.pageNo': page.getPageNo(type)
					};
					}else{//向下
						qdata = {
						'parameters[cityID]': locgetuserinfo('cityid'),
						'parameters[districtID]': dsid,
						'parameters[platID]': ptid,
						'pager.pageSize': pageSize,
						'pager.pageNo': 1
					};
					}
			}else{
				if(upOrdown==2||upOrdown==undefined){//向上
						qdata = {
						'parameters[longitude]': Math.floor(clocation.longitude*1000000)/1000000,
						'parameters[latitude]': Math.floor(clocation.latitude*1000000)/1000000,
						'pager.pageSize': pageSize,
						'pager.pageNo': page.getPageNo(type)
					};
					}else{//向下
						qdata = {
						'parameters[longitude]': Math.floor(clocation.longitude*1000000)/1000000,
						'parameters[latitude]': Math.floor(clocation.latitude*1000000)/1000000,
						'pager.pageSize': pageSize,
						'pager.pageNo': 1
					};
					}
			}
			
			

			var querySettings = {
				url: qurl,
				data: qdata,
				type: 'post'
			};
//          console.log(currentid+':'+JSON.stringify(querySettings));
			muiAjax(querySettings, function(data) {
//				console.log(JSON.stringify(data));
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
					var obj;

					var tmpl = mui('#rows-li-template' + currentid)[0].innerHTML;
					var fragment = document.createDocumentFragment();
					var div = document.createElement('div');
					if(currentid==3){//众筹剩余处理
						obj = {
						rows: rows,
						syz:function(){
							return (this.totalPrice-this.atualInvestment);
						}
					};
					}else{
						obj = {
						rows: rows
					};
					}
					
					div.innerHTML = Mustache.render(tmpl, obj);
					while(div.hasChildNodes()) {
						fragment.appendChild(div.firstChild);
					}
					if(upOrdown==2||upOrdown==undefined){//向上
						mui('#guessUlike' + currentid)[0].appendChild(fragment);
					}else{
						mui('#guessUlike' + currentid)[0].innerHTML='';
						mui('#guessUlike' + currentid)[0].appendChild(fragment);
					}
					
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
				pageNos.pageNo3 += adds;
			}
			if(currentid == 4) {
				pageNos.pageNo4 += adds;
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
			mui.each(document.querySelectorAll('.mui-scroll'),
				function(index, pullRefreshEl) {
					mui(pullRefreshEl).pullToRefresh({
						down: {
							callback: function() {
								var self = this;
								setTimeout(function() {
									page.queryList(currentid,1);
									self.endPullDownToRefresh();
								}, 500);
							}
						},
						up: {
							callback: function() {
								var self = this;
								setTimeout(function() {
									if(page.getCanPull(currentid)) {
										page.setPageNo(currentid,1);
										page.queryList(currentid,2);
									}
									self.endPullUpToRefresh(!page.getCanPull(currentid));
								}, 500);
							}
						}
					});
					mui(pullRefreshEl).pullToRefresh().pullUpTipsIcon.innerHTML = '';//刚开始时不显示上拉可加载更多提示
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
			}).on('tap', '#guessUlike1 li', function() {
				var fzid = this.getAttribute('fzid');
				var pageObj = {
					pageUrl: "rent.html?rentid=" + fzid
				};
				pageChange(pageObj);
			}).on('tap', '#guessUlike2 li', function() {
				var fzid = this.getAttribute('fzid');
				var pageObj = {
					pageUrl: "salehouse.html?saleHousingID=" + fzid
				};
				pageChange(pageObj);
			}).on('tap', '#guessUlike3 li', function() {
				var fzid = this.getAttribute('fzid');
				var pageObj = {
					pageUrl: "croudfundingdetail.html?crowdfundingHousingID=" + fzid
				};
				pageChange(pageObj);
			}).on('tap', '#guessUlike4 li', function() {
				var fzid = this.getAttribute('fzid');
				var pageObj = {
					pageUrl: "newhousedetail.html?newHousingID=" + fzid
				};
				pageChange(pageObj);
			})
		},
		dqwzxs:function(){
			var tpl={
				container:'#dqwz',
				template:'#dqwztmpl',
				obj:{
					rows:{pname:pname,
					dname:dname
					}
				}
			};
			getTemplate(tpl);
		}
	};

	function switchTab($this) {
		currentid = parseInt($this.getAttribute('data-type'));
		base.removeClass(base.$s('.ms-m'), 'ms-menu-active');
		base.addClass($this, 'ms-menu-active');
		base.removeClass(base.$('.section-active'), 'section-active');
		base.addClass(base.$('.ms-con' + currentid), 'section-active');
		if(mui('#guessUlike' + currentid)[0].childNodes.length<2){
			mui("#loading")[0].classList.toggle('none');
			page.queryList(currentid);
			mui("#loading")[0].classList.toggle('none');
		}
		
		
	}
 mui.plusReady(page.init);
//	page.init();
})();