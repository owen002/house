(function () {
    base.setPageRem();
    base.setMuiBackHeight();
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
        var pageObj = {
            pageUrl: "rent.html"
        };
        pageChange(pageObj);
    })
})();