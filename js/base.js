var base = (function() {
	var api = {

	}

	function setPageRem() {
		var cwidth = document.body.clientWidth;
		document.getElementsByTagName("html")[0].style.fontSize = cwidth / 10 + 'px';
	}

	return {
		api: api,
		setPageRem:setPageRem
	}
})()