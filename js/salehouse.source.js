(function ($) {
    var trimVal = base.trimVal;
    var saleHousingID='';
    var pageSize = 10,
		pageNo = 1,
		canPull = true;
    var page = {
        init: function () {
            mui.init();
            base.setPageRem();
            mui('#offCanvasContentScroll').scroll();

            saleHousingID = base.param('saleHousingID');
            //查询租房详情
            page.queryDetail(saleHousingID);
            page.bind();
            mui.plusReady(function(){
				page.fjfytj(1);
			});
        },
        queryDetail: function (saleHousingID) {
            var querySettings = {
                url: Constants.saledetail + '/' + saleHousingID,
                type: 'get'
            };

            if (saleHousingID) {
                muiAjax(querySettings, function (data) {
                	mui('#pageTitle')[0].innerHTML = data.saleHousing.villageName;
                    var tmpl = mui('#sale-detail-template')[0].innerHTML;
					mui('#sale-detail-innerHtml')[0].innerHTML += Mustache.render(tmpl, data);
					
					var rowsArr = data.attachmentList;
	                var arr = new Array();
	                arr[0] = rowsArr[rowsArr.length - 1];
	                arr[rowsArr.length + 1] = rowsArr[0];
	                for (var i = 0, j = rowsArr.length; i < j; i++) {
	                    arr[i + 1] = rowsArr[i];
	                }
	
	                var obj = {
	                    rowsArr: rowsArr,
	                    rows: arr
	                };
                
                	var imagetmpl = mui('#salehouse-image-template')[0].innerHTML;
					mui('#detailImg')[0].innerHTML = Mustache.render(imagetmpl, obj);
				    mui('.mui-slider-item')[0].className = mui('.mui-slider-item')[0].className + ' mui-slider-item-duplicate';
                	mui('.mui-slider-item')[rowsArr.length + 1].className = mui('.mui-slider-item')[rowsArr.length + 1].className + ' mui-slider-item-duplicate';
                	mui('.mui-indicator')[0].className = mui('.mui-indicator')[0].className + ' mui-active';
					base.startSlider($);
                }, function (status) {

                });
            }
        },
        bind: function () {
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
            mui(document).on('tap', '.slider-menu-choose li', function () {
                var cLocation = mui('.choose-location')[0];
                if (cLocation.style.display == 'none') {
                    base.Slider.slideDown(cLocation, 100);
                    muiBack.style.display = 'block';
                } else {
                    base.Slider.slideUp(cLocation, 100);
                    muiBack.style.display = 'none';
                }
            }).on('tap', '#guessUlike li', function () {
                var id = this.getAttribute('data-id');
                var pageObj = {
                    pageUrl: "rent.html?rentid=" + id
                };
                pageChange(pageObj);
            }).on('tap', '#dzan', function () {
                var dzsetting={
                	url:Constants.dzan+'/'+saleHousingID+'/2',
                	type:'post'
                };
                muiAjax(dzsetting, function (data) {
                    mui.toast(data.message);
                }, function (status) {

                });
            }).on('tap', '#callphone', function () {//拨打电话
                var btnArray = ['拨打', '取消']; 
                var Phone =parseInt(this.getAttribute('contact'));
                mui.confirm('是否拨打 ' + Phone + ' ？', '', btnArray, function(e) { 
                    if (e.index == 0) { 
                        plus.device.dial(Phone, true); 
                    }  
                }); 
            }).on('tap', '#fav', function () {//加入收藏
                var dzsetting={
                	url:Constants.memberFav+'/'+saleHousingID+'/2',
                	type:'post'
                };
                muiAjax(dzsetting, function (data) {
                    mui.toast(data.message);
                }, function (status) {

                });
            })
        },
        fjfytj: function(upOrdown) { //附近房源推荐
			get_loc({
				success: function(result) { //定位
					var qdata;
					var qurl = Constants.fjesf;;
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
//					    qurl=Constants.salelist;
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
								var tmpl = mui('#fjesftj')[0].innerHTML;
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
						mui.toast('定位异常');
					}
				},
				error: function(e) {
					mui.toast('定位异常');
					//测试数据
//					    var qurl=Constants.salelist;
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
//								var tmpl = mui('#fjesftj')[0].innerHTML;
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
        if (time < 10) {
            time = '0' + time;
        }
        return time;
    }

    page.init();
})(mui);