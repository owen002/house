(function ($) {
    var trimVal = base.trimVal;
    var crowdfundingHousingID ="";
    var pageSize = 15, pageNo = 1, canPull = true;
    mui('#location1,#choose2Scroll,#locationcontent1,#choose3Scroll,#choose4Scroll').scroll();
    var pa = base.param('pa') || '';

    var $guessUlike = base.$('#guessUlike');
    var param = {
    	'parameters[crowdfundingHousingID]':crowdfundingHousingID,
        'pager.pageSize': pageSize,
        'pager.pageNo': pageNo
    };
    
    var page = {
        init: function () {
            mui.init();
            base.setPageRem();
            mui('#offCanvasContentScroll').scroll();

            crowdfundingHousingID = base.param('crowdfundingHousingID');
            page.queryDetail(crowdfundingHousingID);
            
            page.bind();
        },
        queryDetail: function (crowdfundingHousingID) {
        	mui('#idMinInvestment')[0].innerHTML = '';
        	mui('#idRentalIncome')[0].innerHTML = '';
            var querySettings = {
                url: Constants.crowdfunddetail + '/' + crowdfundingHousingID,
                type: 'get'
            };

            if (crowdfundingHousingID) {
                muiAjax(querySettings, function (data) {
                	mui('#title')[0].innerHTML = data.crowdfundingHousing.villageName;
                    var tmpl = mui('#detail-template')[0].innerHTML;
                    var obj = {
                        attachmentList: data.attachmentList,
                        crowdfundingHousing:data.crowdfundingHousing,
                        labelsArr:data.labelsArr,
                        processpercet:function(){
							return (100-data.crowdfundingHousing.progress);
						},
						syz:function(){
							return data.crowdfundingHousing.totalPrice-data.crowdfundingHousing.atualInvestment;
						}
                    };
					mui('#detail-id')[0].innerHTML = Mustache.render(tmpl, obj);
					mui('#idMinInvestment')[0].innerHTML = '最低起投资金为'+data.crowdfundingHousing.minInvestment+'元';
        			mui('#idRentalIncome')[0].innerHTML = '项目年收益'+data.crowdfundingHousing.atualInvestment+'万元';					
					mui('#offCanvasContentScroll').scroll();
					
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
                    
                    //	var imagetmpl1 = mui('#crfoudfunding-image-template')[0];
               	var imagetmpl = mui('#crfoudfunding-image-template')[0].innerHTML;
					mui('#houseDetailImg')[0].innerHTML = Mustache.render(imagetmpl, obj);
				    mui('.mui-slider-item')[0].className = mui('.mui-slider-item')[0].className + ' mui-slider-item-duplicate';
                	mui('.mui-slider-item')[rowsArr.length + 1].className = mui('.mui-slider-item')[rowsArr.length + 1].className + ' mui-slider-item-duplicate';
                	mui('.mui-indicator')[0].className = mui('.mui-indicator')[0].className + ' mui-active';
					base.startSlider($);
				
			     page.queryMyenrollList();
                }, function (status) {

                });
            }
        },
        queryMyenrollList: function () {
            var querySettings = {
                url: Constants.myenrollList,
                data: param,
                type: 'post'
            };

            muiAjax(querySettings, function (data) {
                var rows = data.rows;
                var rentlength = rows.length, totalLength = data.totalRows;
                if (rows.length > 0) {
                    if (rentlength < pageSize) {
                        canPull = false;
                    } else if (totalLength == (pageSize * (pageNo - 1) + rentlength)) {
                        canPull = false
                    } else {
                        canPull = true;
                    }
                    
				    for(var i=0;i<rentlength;i++){
                    	if(i%2==1){
                    		rows[i].className='';
                    	}else{
                    		rows[i].className='bg-gray';
                    	}						
					}
					
					var obj = {
                        rows: rows
                    };
                    var tmpl = mui('#myenroll-template')[0].innerHTML;
                    mui('#fundRecord')[0].innerHTML += Mustache.render(tmpl, obj);
                    
                } else {
                    canPull = false;
                }
            }, function (status) {

            });
        },
        bind: function () {
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
            }).on('tap', '#fyxx', function () {
                mui('#fyxx')[0].className = 'menu-bar-pub fyxx menu-bar-active';
                mui('#tzjl')[0].className = 'menu-bar-pub tzjl';
                mui('#fyxxRecord')[0].style.display="block";
                mui('#fyxxRecord1')[0].style.display="block";
                mui('#fundRecord')[0].style.display="none";
            }).on('tap', '#tzjl', function () {
                mui('#fyxx')[0].className = 'menu-bar-pub fyxx';
                mui('#tzjl')[0].className = 'menu-bar-pub tzjl menu-bar-active';
                mui('#fyxxRecord')[0].style.display="none";
                mui('#fyxxRecord1')[0].style.display="none";
                mui('#fundRecord')[0].style.display="block";
            }).on('tap', '#dzan', function () {
                var dzsetting={
                	url:Constants.dzan+'/'+crowdfundingHousingID+'/3',
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
                	url:Constants.memberFav+'/'+crowdfundingHousingID+'/3',
                	type:'post'
                };
                muiAjax(dzsetting, function (data) {
                    mui.toast(data.message);
                }, function (status) {

                });
            }).on('tap', '#ljtz', function () {
                mui('#zc_article')[0].style.display="block";
            }).on('tap', '#agreeZc', function () {
                var zcje = document.querySelector("#zcje").value;
				if(zcje == null || zcje == "") {
					mui.toast("请输入金额");
					return;
				}
				
				dataObj={
		        	crowdfundingHousingID:crowdfundingHousingID,
		        	amount:zcje
		        };
		        
				var setings = {
					data:JSON.stringify(dataObj),
			    	type:'post',
			    	contentType: "application/json",
			    	url: Constants.savememberenroll
				};
				
				muiAjax(setings, function(data) {
					if(data.status==='200') {
						mui.toast(data.message);
						mui('#zc_article')[0].style.display="none";
					} else {
						//错误处理
						mui.toast(data.message);
					}
				}, function(status) {
					//当前ajax错误预留
				});
				
				
            })
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
mui.plusReady(page.init);
//  page.init();
})(mui);