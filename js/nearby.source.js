(function () {
    mui.init();
    var page = {
        init: function () {
            base.setPageRem();
            mui('#location1,#locationcontent1').scroll();
            page.queryDsList();//或取城市下的分区列表
            page.bind();
        },
        queryDsList: function () {//或取城市下的分区列表
            var querySettings = {
                url: Constants.dsList,
                data: {
                    'parameters.cityID':locgetuserinfo('cityid')
                },
                type: 'post'
            };

            muiAjax(querySettings, function (data) {
                var mtpl={
                	container:'#areaList',
                	template:'#dsList',
                	obj:data
                };
                getTemplate(mtpl);
            }, function (status) {

            });
        },
        queryPtList: function (dsid) {//或取分区下板块列表
            var querySettings = {
                url: Constants.ptList,
                data: {
                    'parameters.districtID':dsid
                },
                type: 'post'
            };

            muiAjax(querySettings, function (data) {
                var mtpl={
                	container:'#platList',
                	template:'#ptList',
                	obj:data
                };
                getTemplate(mtpl);
            }, function (status) {

            });
        },
        bind: function () {
          mui(document).on('tap','#areaList>li',function(){
          	mui.each(document.querySelectorAll('#areaList li'),function(){
          		this.classList.remove('choose-left-active');
          	});
          	this.classList.add("choose-left-active");
          	var dsid=this.querySelector('.bzm-navigate-right').getAttribute('id');
          	page.queryPtList(dsid);
          }).on('tap','#platList li',function(){
          	 var pageObj={
          	 	pageUrl:'../page/mynearby.html',
          	 	postData:{
          	 		dsid:this.getAttribute('dsid'),
          	 		ptid:this.getAttribute('ptid')
          	 	}
          	 };
          	 pageChange(pageObj);
          });
        }
    };

    page.init();
})();