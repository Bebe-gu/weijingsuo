$(function() {

    banner();
    initMobileTab();
    $('[data-toggle="tooltip"]').tooltip();
    // window.addEventListener("scroll", function(event) {
    //     var scrollTop = document.documentElement.scrollTop || window.pageYOffset || document.body.scrollTop;
    //     console.log(scrollTop);
        
    // });

});

var banner = function() {
        $.ajax({
            url: 'js/data.json',
            type: 'get',
            dataType: 'json',
            success: function(data) {
                var isMobile = $(window).width() > 768 ? true : false;
                var pointHtml = template('pointTemplate', {
                    list: data
                });
                var imgHtml = template('imgTemplate', {
                    list: data,
                    isMobile: isMobile
                });
                $('.carousel-indicators').html(pointHtml);
                $('.carousel-inner').html(imgHtml);


            }
        });

        var startX = 0;
        var distanceX = 0;
        var isMove = false;
        $('.wjs_banner').on('touchstart', function(e) {
            //手指起始位置
            startX = e.originalEvent.touches[0].clientX;
        }).on('touchmove', function(e) {
            //手指滑动移动距离
            var moveX = e.originalEvent.touches[0].clientX;
            //手指滑动总距离
            distanceX = moveX - startX;
            isMove = true;
        }).on('touchend', function(e) {
            //滑动距离超过50px 一定要滑动过
            if (isMove && Math.abs(distanceX) > 50) {
                if (distanceX < 0) {
                    $('.carousel').carousel('next');
                    console.log('左滑');
                } else {
                    $('.carousel ').carousel('prev');
                    console.log('右滑');
                }
            }
            startX = 0;
            distanceX = 0;
            isMove = false;
        });
    }
    /*解决导航标签自适应和滑动效果*/
var initMobileTab = function() {
    var width = 0;
    var $navtabs = $('.wjs_product .nav-tabs');
    $navtabs.find('li').each(function(index, el) {
        //获取所有li的宽度，包括margin
        var liWidth = $(this).outerWidth(true);
        width += liWidth;
    });
    //把li的宽度赋给navbar
    $navtabs.width(width);

    new IScroll($('.nav-tabs-parent')[0], {
        scrollX: true,
        scrollY: false,
    });


}
