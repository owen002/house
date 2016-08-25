function get_loc(options) {
	var params = {
		//		enableHighAccuracy: true,
		timeout: 3000,
		provider: 'amap'
	};

	plus.geolocation.getCurrentPosition(function(p) {
		if(options && options.success) {
			console.log(JSON.stringify(p));
			options.success(p);
		}

	}, function(e) {
		if(options && options.error) {
			options.error(e);
		}

	}, params);
}