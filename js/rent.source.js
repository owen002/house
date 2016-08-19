(function ($) {
    var trimVal = base.trimVal;
    var page = {
        init: function () {
            mui.init();
            base.setPageRem();
            mui('#offCanvasContentScroll').scroll();

            var rentid = base.param('rentid');
            //查询租房详情
            page.queryDetail(rentid);
            page.bind();
        },
        queryDetail: function (rentid) {
            var querySettings = {
                url: Constants.rentdetail + '/' + rentid,
                type: 'get'
            };

            if (rentid) {
                muiAjax(querySettings, function (data) {
                    page.setHeadImg(data);
                    page.setTitleInfo(data);
                    page.setRentDetailInfo(data);
                }, function (status) {

                });
            }
        },
        setHeadImg: function (data) {
            var imgArr = data.attachmentList, picPub = '', j = imgArr.length, ldom = '<section class="mui-slider">', bdom = '<div class="mui-slider-indicator mui-text-right">';
            if (j > 0) {
                ldom += '<div class="mui-slider-group mui-slider-loop">';
                ldom += '<div class="mui-slider-item mui-slider-item-duplicate"><img src="' + picPub + imgArr[j - 1].attachmentName + '"></div>';
                ldom += '<div class="mui-slider-item"><img src="' + picPub + data.rentalHousing.mainImage + '"></div>';
                for (var i = 0; i < j; i++) {
                    var img = imgArr[i];
                    ldom += '<div class="mui-slider-item"><img src="' + picPub + img.attachmentName + '"></div>';
                    if (i == 0) {
                        bdom += '<div class="mui-indicator mui-active"></div>';
                    } else {
                        bdom += '<div class="mui-indicator"></div>';
                    }
                }
                bdom += '<div class="mui-indicator"></div>';
                ldom += '<div class="mui-slider-item mui-slider-item-duplicate"><img src="' + picPub + data.rentalHousing.mainImage + '"></div>';
                ldom += '</div>' + bdom + '</section>';
                base.$('#houseDetailImg').innerHTML = ldom;
                base.startSlider($);
            } else {
                ldom += '<img src="' + picPub + data.rentalHousing.mainImage + '">';
                ldom += '</section>';
                base.$('#houseDetailImg').innerHTML = ldom;
            }
        },
        setTitleInfo: function (data) {
            var house = data.rentalHousing;
            base.$('#pageTitle').innerText = trimVal(house.villageName);
            base.$('#houseDesc').innerText = trimVal(house.title);
            base.$('#villDesc').innerText = trimVal(house.housingDesc);
            base.$('#addrDesc').innerText = trimVal(house.districtName + house.platName + house.villageName);
        },
        setRentDetailInfo: function (data) {
            var ul = document.createElement('ul');
            var rent = data.rentalHousing;
            var date = new Date(rent.updateTime);
            ul.innerHTML = ' <li>租金：<span class="color-orange" style="font-weight: bold">' + trimVal(rent.rental) + '元/月</span></li>' +
                '<li>押付：<span>' + trimVal(rent.paymentMethod) + '</span></li><li>房型：<span>' + trimVal(rent.rooms) + '室' + trimVal(rent.halls) + '厅' + trimVal(rent.toilet) + '卫(' + trimVal(data.rentalMode) + ')</span></li>' +
                '<li>装修：<span>' + trimVal(data.decoration) + '</span></li><li>面积：<span>' + trimVal(rent.housingArea) + '平米</span></li><li>朝向：<span>' + trimVal(data.orientation) + '</span></li>' +
                '<li>楼层：<span>' + trimVal(rent.locationFloor) + '层/' + trimVal(rent.totalFloor) + '层</span></li><li>类型：<span>普通住宅</span></li>' +
                '<li>小区：<span>' + trimVal(rent.villageName) + '</span></li><li>时间：<span>' + getStandardTime(date) + '</span></li>';
            base.$('#rentDetail').appendChild(ul);
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

    page.init();
})(mui);