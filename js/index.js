(function(){var pageSize=10,pageNo=1;var tjxqflag="";var userinfo=localStorage.getItem("userinfo");var perRem=0,endPageX=0;var isLogin=false;if(userinfo&&userinfo!={}){isLogin=true;userinfo=JSON.parse(decodeURIComponent(userinfo))}var page={init:function(){page.getSliderImage();page.initSliderMenu();page.checkUser();page.bind();page.getBztt();page.getyzfy()},sxsjbycityid:function(){page.getSliderImage();page.checkUser();page.getBztt();page.getyzfy()},getSliderImage:function(){var setting={url:baseUrl+"front/json_advertisement",type:"get",contentType:"application/json"};muiAjax(setting,function(data){var rowsArr=data.rows;var arr=new Array;arr[0]=rowsArr[rowsArr.length-1];arr[rowsArr.length+1]=rowsArr[0];for(var i=0,j=rowsArr.length;i<j;i++){arr[i+1]=rowsArr[i]}var obj={rowsArr:rowsArr,rows:arr};var tmpl=mui("#index-guangao-template")[0].innerHTML;mui("#slider")[0].innerHTML=Mustache.render(tmpl,obj);mui(".mui-slider-item")[0].className=mui(".mui-slider-item")[0].className+" mui-slider-item-duplicate";mui(".mui-slider-item")[rowsArr.length+1].className=mui(".mui-slider-item")[rowsArr.length+1].className+" mui-slider-item-duplicate";mui(".mui-indicator")[0].className=mui(".mui-indicator")[0].className+" mui-active";mui("#slider").slider({interval:3e3})},function(status){})},checkUser:function(){if(!!userinfo){userinfo=decodeURIComponent(userinfo);var uid=userinfo.memberID;if(!!uid){mui("#goToLogin")[0].style.display="none"}}},initSliderMenu:function(){if(isLogin){base.$("#goToLogin").style.display="none";base.$("#bzm_username").style.display="block";base.$("#bzm_username").innerHTML=userinfo.username||"已登录";base.$("#loginBtn").style.display="block"}var offCanvasWrapper=mui("#offCanvasWrapper");var offCanvasInner=offCanvasWrapper[0].querySelector(".mui-inner-wrap");var offCanvasSide=document.getElementById("offCanvasSide");var classList=offCanvasWrapper[0].classList;offCanvasSide.classList.remove("mui-transitioning");offCanvasSide.setAttribute("style","");classList.add("mui-scalable");document.getElementById("offCanvasShow").addEventListener("tap",function(){offCanvasWrapper.offCanvas("show")});mui("#offCanvasSideScroll").scroll();mui("#offCanvasContentScroll").scroll();if(mui.os.plus&&mui.os.ios){mui.plusReady(function(){plus.webview.currentWebview().setStyle({popGesture:"none"})})}},bind:function(){mui("#gussULikeUl").on("tap","li",function(){location.href="page/rent.html"});mui(document).on("tap","#goToLogin",function(){var pageObj={pageUrl:"page/login/login.html"};pageChange(pageObj)}).on("tap","#navigateMenus li",function(){var id=this.getAttribute("data-type");var pageObj={};if(!isLogin){switch(id){case"1":case"2":case"3":case"4":case"5":pageObj={pageUrl:"page/login/login.html"};pageChange(pageObj);break}}else{switch(id){case"1":pageObj={pageUrl:"page/myfabu.html"};break;case"2":pageObj={pageUrl:"page/mysign.html"};break;case"3":pageObj={pageUrl:"page/myfavo.html"};break;case"4":pageObj={pageUrl:"page/myhistroy.html"};break;case"5":pageObj={pageUrl:""};break;case"6":pageObj={pageUrl:"page/qrcodefx.html"};break}pageChange(pageObj)}}).on("tap","#myFirstPage",function(){var pageObj={pageUrl:"index.html"};pageChange(pageObj)}).on("tap","#myNearBy",function(){get_loc({success:function(result){if(result.addressComponent.adcode==null||result.addressComponent.adcode==undefined||result.addressComponent.adcode==""||result.addressComponent.adcode.length!==6){var pageObj={pageUrl:"page/nearby.html"};pageChange(pageObj)}else{var pageObj={pageUrl:"page/mynearby.html",postData:{location:result.location}};pageChange(pageObj)}},error:function(e){console.log("地址获取异常:"+JSON.stringify(e));var pageObj={pageUrl:"page/nearby.html"};pageChange(pageObj)}})}).on("tap","#bzmZf",function(){var pageObj={pageUrl:"page/rentList.html"};pageChange(pageObj)}).on("tap","#bzmSF",function(){var pageObj={pageUrl:"page/salehouseList.html"};pageChange(pageObj)}).on("tap","#bzmZC",function(){var pageObj={pageUrl:"page/croudfunding.html"};pageChange(pageObj)}).on("tap","#bzmXF",function(){var pageObj={pageUrl:"page/newhouse.html"};pageChange(pageObj)}).on("tap","#loginBtn",function(){localStorage.setItem("userinfo","");isLogin=false;var pageObj={pageUrl:"index.html"};pageChange(pageObj)}).on("tap","#mySetUp",function(){var pageObj={pageUrl:"page/setup/setmain.html"};pageChange(pageObj)}).on("tap","#locationCity",function(){var pageObj={pageUrl:"page/location.html"};pageChange(pageObj)}).on("touchmove","#sliderBlockImg",function(e){var touch=e.touches[0];var left=touch.pageX-.75*perRem;if(left>.5*perRem&&left<8*perRem){this.style.left=left+"px";endPageX=left}}).on("touchstart","#sliderBlockImg",function(e){mui.init({gestureConfig:{drag:false}})}).on("touchend","#sliderBlockImg",function(e){var left=endPageX;if(left<2.375*perRem){this.style.left=.5*perRem+"px"}else if(left>=2.375&&left<6.125*perRem){this.style.left=4.25*perRem+"px";step(1)}else if(left>=6.125*perRem){this.style.left=8*perRem+"px";step(3)}mui.init({gestureConfig:{drag:true}})}).on("tap",".ri11",function(){tjxqflag="4";step(2)}).on("tap",".ri12",function(){tjxqflag="2";step(2)}).on("tap",".ri21",function(){tjxqflag="1";step(4)}).on("tap",".ri22",function(){tjxqflag="3";step(4)}).on("tap","#sub1",function(){page.tjxq(1)}).on("tap","#sub2",function(){page.tjxq(2)})},tjxq:function(flag){var sjh="";var content="";if(flag==1){sjh=document.querySelector("#czphone").value;if(sjh==null||sjh==""){mui.toast("请输入手机号");return}var reg=/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;if(!reg.test(sjh)){mui.toast("手机号格式不正确");return}content=document.querySelector("#czcontent").value;if(content==null||content==""){mui.toast("请输入相关内容");return}}else{sjh=document.querySelector("#mmphone").value;if(sjh==null||sjh==""){mui.toast("请输入手机号");return}var reg=/^(((13[0-9]{1})|(14[0-9]{1})|(15[0-9]{1})|(17[0-9]{1})|(18[0-9]{1}))+\d{8})$/;if(!reg.test(sjh)){mui.toast("手机号格式不正确");return}content=document.querySelector("#mmcontent").value;if(content==null||content==""){mui.toast("请输入相关内容");return}}data={contactNumber:sjh,content:content,kind:tjxqflag};var codeSettings={url:Constants.myneed,type:"post",data:JSON.stringify(data),contentType:"application/json"};hideAll();muiAjax(codeSettings,function(data){mui.toast(data.message)},function(status){})},getBztt:function(){var setting={url:Constants.bztt,data:{"parameters.cityID":locgetuserinfo("cityid"),"pager.pageSize":pageSize,"pager.pageNo":pageNo}};muiAjax(setting,function(data){var tplsetting={container:"#bzttul",template:"#bztttpl",obj:data};getTemplate(tplsetting);var scroll2=new ScrollText("bzttul","pre2","next2",true,70,true);scroll2.LineHeight=60},function(status){})},getGpsPos:function(){var cityId=locgetuserinfo("citycode");if(cityId==null||cityId==undefined||cityId==""){get_loc({success:function(result){if(result.addressComponent.adcode==null||result.addressComponent.adcode==undefined||result.addressComponent.adcode==""||result.addressComponent.adcode.length!==6){var pageObj={pageUrl:"page/location.html"};pageChange(pageObj)}else{plus.navigator.closeSplashscreen();page.init();locsaveuserinfo("citycode",result.addressComponent.adcode)}},error:function(e){console.log("地址获取异常:"+JSON.stringify(e));var pageObj={pageUrl:"page/location.html"};pageChange(pageObj)}})}else{plus.navigator.closeSplashscreen();page.init()}},getyzfy:function(){var setting={url:Constants.newhouselist,type:"post",data:{"parameters.isTop":1,"parameters.cityID":locgetuserinfo("cityid"),"pager.pageSize":3,"pager.pageNo":1}};muiAjax(setting,function(data){var tplsetting={container:"#gussULikeUl",template:"#yzfytpl",obj:data};getTemplate(tplsetting)},function(status){})}};mui.init();perRem=base.setPageRem();if(mui.os.ios||mui.os.android){mui.plusReady(function(){page.getGpsPos()})}else{page.init()}function step(type){base.$("#rent1").style.display="none";base.$("#rent2").style.display="none";base.$("#rent3").style.display="none";base.$("#rent4").style.display="none";base.$("#rent"+type).style.display="block";base.$(".bzm-dialog").style.display="block"}function hideAll(){base.$("#rent1").style.display="none";base.$("#rent2").style.display="none";base.$("#rent3").style.display="none";base.$("#rent4").style.display="none";base.$(".bzm-dialog").style.display="none"}mui(document).on("tap",".search-box",function(){base.goSearch("index")});window.addEventListener("refreshMe",function(){page.sxsjbycityid()})})();