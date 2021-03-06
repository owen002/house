(function($) {
	var trimVal = base.trimVal;
	var rentid = "";
	var pageSize = 10,
		pageNo = 1,
		canPull = true;
	var contact = ""; //联系电话，用来调取电话
	var page = {
		init: function() {
			mui.init();
			//阻尼系数
//				var deceleration = mui.os.ios?0.003:0.0009;
//				$('.gueulike-wrapper').scroll({
//					bounce: false,
//					indicators: true, //是否显示滚动条
//					deceleration:deceleration
//				});
			base.setPageRem();
			mui('#offCanvasContentScroll').scroll();

			rentid = base.param('rentid');
			//查询租房详情
			page.queryDetail(rentid);
			page.bind();
			mui.plusReady(function(){
				page.fjfytj(1);
			});
			
		},
		queryDetail: function(rentid) {
			var querySettings = {
				url: Constants.rentdetail + '/' + rentid,
				type: 'get'
			};

			if(rentid) {
				muiAjax(querySettings, function(data) {
					page.setHeadImg(data);
					page.setTitleInfo(data);
					page.setRentDetailInfo(data);
					page.setFacility(data.rentalFacilitiesList);
					page.setVilige(data.village);
				}, function(status) {

				});
			}
		},
		setHeadImg: function(data) {
			var imgArr = data.attachmentList,
				picPub = '',
				j = imgArr.length,
				ldom = '<section class="mui-slider">',
				bdom = '<div class="mui-slider-indicator mui-text-right">';
			if(j > 0) {
				ldom += '<div class="mui-slider-group mui-slider-loop">';
				ldom += '<div class="mui-slider-item mui-slider-item-duplicate"><img src="' + picPub + imgArr[j - 1].attachmentName + '" style="height: 5rem;"></div>';
				ldom += '<div class="mui-slider-item"><img src="' + picPub + data.rentalHousing.mainImage + '"></div>';
				for(var i = 0; i < j; i++) {
					var img = imgArr[i];
					ldom += '<div class="mui-slider-item"><img src="' + picPub + img.attachmentName + '"></div>';
					if(i == 0) {
						bdom += '<div class="mui-indicator mui-active"></div>';
					} else {
						bdom += '<div class="mui-indicator"></div>';
					}
				}
				bdom += '<div class="mui-indicator"></div>';
				ldom += '<div class="mui-slider-item mui-slider-item-duplicate"><img src="' + picPub + data.rentalHousing.mainImage + '"></div>';
				ldom += '</div>' + bdom + '</section>';
				base.$('#houseDetailImg').innerHTML = ldom;
				base.startSlider($);
			} else {
				ldom += '<img src="' + picPub + data.rentalHousing.mainImage + '">';
				ldom += '</section>';
				base.$('#houseDetailImg').innerHTML = ldom;
			}
		},
		setTitleInfo: function(data) {
			var house = data.rentalHousing;
			contact = house.contactNumber;
			base.$('#pageTitle').innerText = trimVal(house.villageName);
			base.$('#houseDesc').innerText = trimVal(house.title);
		},
		setRentDetailInfo: function(data) {
			var ul = document.createElement('ul');
			var rent = data.rentalHousing;
			var date = new Date(rent.updateTime);
			ul.innerHTML = ' <li>租金：<span class="color-orange" style="font-weight: bold">' + trimVal(rent.rental) + '元/月</span></li>' +
				'<li>押付：<span>' + trimVal(rent.paymentMethod) + '</span></li><li>房型：<span>' + trimVal(rent.rooms) + '室' + trimVal(rent.halls) + '厅' + trimVal(rent.toilet) + '卫(' + trimVal(rent.rentalMode) + ')</span></li>' +
				'<li>装修：<span>' + trimVal(rent.decoration) + '</span></li><li>面积：<span>' + trimVal(rent.housingArea) + '平米</span></li><li>朝向：<span>' + trimVal(rent.orientation) + '</span></li>' +
				'<li>楼层：<span>' + trimVal(rent.locationFloor) + '层/' + trimVal(rent.totalFloor) + '层</span></li>' + //<li>类型：<span>普通住宅</span></li>
				'<li>小区：<span>' + trimVal(rent.villageName) + '</span></li><li>时间：<span>' + getStandardTime(date) + '</span></li>';
			base.$('#rentDetail').appendChild(ul);
		},
		setFacility: function(faArr) {
			var dom = '';
			for(var i = 0, j = faArr.length; i < j; i++) {
				var fa = faArr[i];
				var faid = fa.facilitiesCode,
					name = fa.facilitiesName;
				faid = modifyStandTime(faid);
				dom += '<li><img src="../res/img/house-icons/pz' + faid + '.png" alt=""><div class="items-name">' + name + '</div></li>';
			}
			base.$('#facilityUl').innerHTML = dom;
		},
		setVilige: function(vi) {
//			var dom = '<li><div class="dis-inline">小区地址：</div><div class="dis-inline" id="addrDesc">' + (vi.address || '') + '</div></li><li><div class="dis-inline">小区交通：</div>' +
//				'<div class="dis-inline">' + (vi.peripheralEquipment || '') + '</div></li><li><div class="dis-inline">小区介绍：</div>' +
//				'<div class="dis-inline" id="villDesc">' + (vi.projectIntroduction || '') + '</div></li>';
//			base.$('#housePT').innerHTML = dom;
			base.$('#houseJS').innerHTML = vi.peripheralEquipment;
			base.$('#housePT').innerHTML = vi.projectIntroduction;
		},
		bind: function() {
			mui.each(document.querySelectorAll('.gueulike-wrapper'),
				function(index, pullRefreshEl) {
					mui(pullRefreshEl).pullToRefresh({
						down: {
							callback: function() {
								var self = this;
								setTimeout(function() {
									page.fjfytj(1);
									self.endPullDownToRefresh();
								}, 500);
							}
						},
						up: {
							callback: function() {
								var self = this;
								setTimeout(function() {
									if(canPull) {
										pageNo += 1;
										page.fjfytj(2);
									}
									self.endPullUpToRefresh(!canPull);
								}, 500);
							}
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
				var id = this.getAttribute('fzid');
				var pageObj = {
					pageUrl: "rent.html?rentid=" + id
				};
				pageChange(pageObj);
			}).on('tap', '#dzan', function() {
				var dzsetting = {
					url: Constants.dzan + '/' + rentid + '/1',
					type: 'post'
				};
				muiAjax(dzsetting, function(data) {
					mui.toast(data.message);
				}, function(status) {

				});
			}).on('tap', '#callphone', function() { //拨打电话
				var btnArray = ['拨打', '取消'];
				var Phone = parseInt(contact);
				mui.confirm('是否拨打 ' + Phone + ' ？', '', btnArray, function(e) {
					if(e.index == 0) {
						plus.device.dial(Phone, true);
					}
				});
			}).on('tap', '#fav', function() { //加入收藏
				var dzsetting = {
					url: Constants.memberFav + '/' + rentid + '/1',
					type: 'post'
				};
				muiAjax(dzsetting, function(data) {
					mui.toast(data.message);
				}, function(status) {

				});
			})
		},
		fjfytj: function(upOrdown) { //附近房源推荐
			get_loc({
				success: function(result) { //定位
					var qdata;
					var qurl = Constants.fjzf;
					if(result.coords.longitude != null || result.coords.longitude != '') {
						if(upOrdown == 2 || upOrdown == undefined) { //向上
							qdata = {
								'parameters[longitude]': Math.floor(result.coords.longitude*1000000)/1000000,
								'parameters[latitude]': Math.floor(result.coords.latitude*1000000)/1000000,
								'pager.pageSize': pageSize,
								'pager.pageNo': pageNo
							};
						} else { //向下
							qdata = {
								'parameters[longitude]': Math.floor(result.coords.longitude*1000000)/1000000,
								'parameters[latitude]': Math.floor(result.coords.latitude*1000000)/1000000,
								'pager.pageSize': pageSize,
								'pager.pageNo': 1
							};
						}
						//测试数据
//						qurl=Constants.rentlist;
//						if(upOrdown == 2 || upOrdown == undefined) { //向上
//							qdata = {
//								'parameters.cityID': '1',
//								'parameters.districtID': '1',
//								'parameters.platID': '1',
//								'pager.pageSize': pageSize,
//								'pager.pageNo': pageNo
//							};
//						} else { //向下
//							qdata = {
//								'parameters.cityID': '1',
//								'parameters.districtID': '1',
//								'parameters.platID': '1',
//								'pager.pageSize': pageSize,
//								'pager.pageNo': 1
//							};
//						}
						//测试数据结束
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
									canPull = false;
								} else if(totalLength == (pageSize * (pageNo - 1) + rentlength)) {
									canPull = false;
								} else {
									canPull = true;
								}
								obj = {
									rows: rows
								};
								var tmpl = mui('#fjzftj')[0].innerHTML;
								var fragment = document.createDocumentFragment();
								var div = document.createElement('div');

								div.innerHTML = Mustache.render(tmpl, obj);
								while(div.hasChildNodes()) {
									fragment.appendChild(div.firstChild);
								}
								mui('#guessUlike')[0].appendChild(fragment);
							} else {
								canPull = false;
							}
						}, function(status) {

						});
					} else {
						mui.toast('定位异常,获取的经纬度为空');
					}
				},
				error: function(e) {
					mui.toast('定位异常'+JSON.stringify(e));
					//测试数据
//					    var qurl=Constants.rentlist;
//					    var qdata;
//						if(upOrdown == 2 || upOrdown == undefined) { //向上
//							qdata = {
//								'parameters.cityID': '1',
//								'parameters.districtID': '1',
//								'parameters.platID': '1',
//								'pager.pageSize': pageSize,
//								'pager.pageNo': pageNo
//							};
//						} else { //向下
//							qdata = {
//								'parameters.cityID': '1',
//								'parameters.districtID': '1',
//								'parameters.platID': '1',
//								'pager.pageSize': pageSize,
//								'pager.pageNo': 1
//							};
//						}
//						var querySettings = {
//							url: qurl,
//							data: qdata,
//							type: 'post'
//						};
//						muiAjax(querySettings, function(data) {
//							var rows = data.rows;
//							var rentlength = rows.length,
//								totalLength = data.totalRows;
//							if(rows.length > 0) {
//								if(rentlength < pageSize) {
//									canPull = false;
//								} else if(totalLength == (pageSize * (pageNo- 1) + rentlength)) {
//									canPull = false;
//								} else {
//									canPull = true;
//								}
//								obj = {
//									rows: rows
//								};
//								var tmpl = mui('#fjzftj')[0].innerHTML;
//								var fragment = document.createDocumentFragment();
//								var div = document.createElement('div');
//
//								div.innerHTML = Mustache.render(tmpl, obj);
//								while(div.hasChildNodes()) {
//									fragment.appendChild(div.firstChild);
//								}
//								mui('#guessUlike')[0].appendChild(fragment);
//							} else {
//								canPull = false;
//							}
//						}, function(status) {
//
//						});
					
				}
			});
		}
	};

	function getStandardTime(date) {
		return date.getFullYear() + '-' + modifyStandTime(date.getMonth() + 1) + '-' + modifyStandTime(date.getDate());
	}

	function modifyStandTime(time) {
		if(time < 10) {
			time = '0' + time;
		}
		return time;
	}
mui.plusReady(page.init);
//	page.init();
})(mui);