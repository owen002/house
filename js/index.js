(function(){var pageSize=10,pageNo=1;var userinfo=localStorage.getItem("userinfo");var isLogin=false;if(userinfo&&userinfo!={}){isLogin=true;userinfo=JSON.parse(decodeURIComponent(userinfo))}var page={init:function(){mui.init();base.setPageRem();page.getSliderImage();page.initSliderMenu();page.checkUser();page.bind();page.getBztt()},getSliderImage:function(){var setting={url:baseUrl+"front/json_advertisement",type:"get",contentType:"application/json"};muiAjax(setting,function(data){var rowsArr=data.rows;var arr=new Array;arr[0]=rowsArr[rowsArr.length-1];arr[rowsArr.length+1]=rowsArr[0];for(var i=0,j=rowsArr.length;i<j;i++){arr[i+1]=rowsArr[i]}var obj={rowsArr:rowsArr,rows:arr};var tmpl=mui("#index-guangao-template")[0].innerHTML;mui("#slider")[0].innerHTML=Mustache.render(tmpl,obj);mui(".mui-slider-item")[0].className=mui(".mui-slider-item")[0].className+" mui-slider-item-duplicate";mui(".mui-slider-item")[rowsArr.length+1].className=mui(".mui-slider-item")[rowsArr.length+1].className+" mui-slider-item-duplicate";mui(".mui-indicator")[0].className=mui(".mui-indicator")[0].className+" mui-active";mui("#slider").slider({interval:3e3})},function(status){})},checkUser:function(){if(!!userinfo){userinfo=decodeURIComponent(userinfo);var uid=userinfo.memberID;if(!!uid){mui("#goToLogin")[0].style.display="none"}}},initSliderMenu:function(){if(isLogin){base.$("#goToLogin").style.display="none";base.$("#bzm_username").style.display="block";base.$("#bzm_username").innerHTML=userinfo.username||"已登录";base.$("#loginBtn").style.display="block"}var offCanvasWrapper=mui("#offCanvasWrapper");var offCanvasInner=offCanvasWrapper[0].querySelector(".mui-inner-wrap");var offCanvasSide=document.getElementById("offCanvasSide");var classList=offCanvasWrapper[0].classList;offCanvasSide.classList.remove("mui-transitioning");offCanvasSide.setAttribute("style","");classList.add("mui-scalable");document.getElementById("offCanvasShow").addEventListener("tap",function(){offCanvasWrapper.offCanvas("show")});mui("#offCanvasSideScroll").scroll();mui("#offCanvasContentScroll").scroll();if(mui.os.plus&&mui.os.ios){mui.plusReady(function(){plus.webview.currentWebview().setStyle({popGesture:"none"})})}},bind:function(){mui("#gussULikeUl").on("tap","li",function(){location.href="page/rent.html"});mui(document).on("tap","#goToLogin",function(){var pageObj={pageUrl:"page/login/login.html"};pageChange(pageObj)}).on("tap","#navigateMenus li",function(){var id=this.getAttribute("data-type");var pageObj={};if(!isLogin){switch(id){case"1":case"2":case"3":case"4":case"5":pageObj={pageUrl:"page/login/login.html"};pageChange(pageObj);break}}else{switch(id){case"1":pageObj={pageUrl:"page/myfabu.html"};break;case"2":pageObj={pageUrl:"page/mysign.html"};break;case"3":pageObj={pageUrl:"page/myfavo.html"};break;case"4":pageObj={pageUrl:"page/myhistroy.html"};break;case"5":pageObj={pageUrl:""};break}pageChange(pageObj)}}).on("tap","#myFirstPage",function(){var pageObj={pageUrl:"index.html"};pageChange(pageObj)}).on("tap","#myNearBy",function(){var pageObj={pageUrl:""};pageChange(pageObj)}).on("tap","#bzmZf",function(){var pageObj={pageUrl:"page/rentList.html"};pageChange(pageObj)}).on("tap","#bzmSF",function(){var pageObj={pageUrl:"page/salehouseList.html"};pageChange(pageObj)}).on("tap","#bzmZC",function(){var pageObj={pageUrl:"page/croudfunding.html"};pageChange(pageObj)}).on("tap","#bzmXF",function(){var pageObj={pageUrl:"page/newhouse.html"};pageChange(pageObj)}).on("tap","#loginBtn",function(){localStorage.setItem("userinfo","");isLogin=false;var pageObj={pageUrl:"index.html"};pageChange(pageObj)}).on("tap","#mySetUp",function(){var pageObj={pageUrl:"page/setup/setmain.html"};pageChange(pageObj)}).on("tap","#locationCity",function(){var pageObj={pageUrl:"page/location.html"};pageChange(pageObj)})},getBztt:function(){var setting={url:Constants.bztt,data:{"pager.pageSize":pageSize,"pager.pageNo":pageNo}};muiAjax(setting,function(data){var tplsetting={container:"#bzttul",template:"#bztttpl",obj:data};getTemplate(tplsetting);var scroll2=new ScrollText("bzttul","pre2","next2",true,70,true);scroll2.LineHeight=60},function(status){})}};page.init()})();