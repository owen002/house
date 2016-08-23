var baidu_query_api = 'http://api.map.baidu.com/geocoder/v2/';

function get_loc(options) {
	var params = {
		enableHighAccuracy: true,
		timeout: 3000,
		provider: 'baidu',
		coordsType: "bd09ll"
	};

	plus.geolocation.getCurrentPosition(function(p) {
		var codns = p.coords; //获取地理坐标信息；
		var parms = {
			ak: 'wILCdicbD0gokTVFKFowE1L8VGuDVbtQ',
			mcode:'BA:AD:09:3A:82:82:9F:B4:32:A7:B2:8C:B4:CC:F0:E9:F3:7D:AE:58;io.dcloud.Baozumei',//模拟器里需要
			output: 'json',
			location: codns.latitude + ',' + codns.longitude
				//,pois:1（周边poi数组） //不建议要，周边数据太杂，不需要
		};
		mui.ajax(baidu_query_api, {
			data: parms,
			dataType: 'json', //服务器返回json格式数据
			type: 'post', //HTTP请求类型
			timeout: 10000, //超时时间设置为10秒；
			async:false,
			success: function(data) {
				console.log(JSON.stringify(data));
				if(data.status == 0) {
					if(options && options.success) {
						options.success(data.result);
					}
				} else {
					if(options && options.error) {
						var e="";
						if(data.status==1){
							e="服务器内部错误";
						}
						else if(data.status==2){
							e="请求参数非法";
						}
						else if(data.status==3){
							e="权限校验失败";
						}
						else if(data.status==4){
							e="配额校验失败";
						}
						else if(data.status==5){
							e="ak不存在或者非法";
						}
						else if(data.status==101){
							e="服务禁用";
						}
						else if(data.status==102){
							e="不通过白名单或者安全码不对";
						}
						else if(data.status>=200&&data.status<300){
							e="无权限";
						}else{
							e="配额错误";
						}
						options.error(e);
					}
				}
			},
			error: function(xhr, type, errorThrown) {
				if(options && options.error) {
					options.error(errorThrown);
				}
			}
		});

	}, function(e) {
		if(options && options.error) {
			options.error(e);
		}

	}, params);
}