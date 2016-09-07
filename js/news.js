(function () {
    mui.init();
    var querySettings=''
    var id='';
    var page = {
        init: function () {
            base.setPageRem();
            mui('#offCanvasContentScroll').scroll();
            id = base.param('id');
            var type = base.param('type');
            if(type==1) {
            	querySettings = {
	                url: Constants.bzttnews+'/'+id,
	                type: 'get'
            	};
            }
            else if(type==2) {
            	querySettings = {
	                url: Constants.ljtjxxnews+'/'+id,
	                type: 'get'
            	};
            }
            else if(type==3) {
            	querySettings = {
	                url: Constants.aboutus,
	                type: 'get'
            	};
            }
            page.queryNews();
            page.bind();
        },
        queryNews: function () {
            muiAjax(querySettings, function (data) {
            	mui('#pageTitle')[0].innerHTML = data.title;
                var tmpl = mui('#content-template')[0].innerHTML;
                mui('#content')[0].innerHTML = Mustache.render(tmpl, data);
            }, function (status) {

            });
        },
        bind: function () {

            var muiBack = mui('.mui-back')[0];
        }
    };
mui.plusReady(page.init);
//  page.init();
})();