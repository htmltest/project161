$(window).on('load resize', function() {

    $('.page-news-list').each(function() {
        var curList = $(this);

        curList.find('.page-news-item a').css({'height': 'auto'});

        curList.find('.page-news-item a').each(function() {
            var curBlock = $(this);
            var curHeight = curBlock.outerHeight();
            var curTop = curBlock.offset().top;

            curList.find('.page-news-item a').each(function() {
                var otherBlock = $(this);
                if (otherBlock.offset().top == curTop) {
                    var newHeight = otherBlock.outerHeight();
                    if (newHeight > curHeight) {
                        curHeight = newHeight;
                    }
                }
            });

            curList.find('.page-news-item a').each(function() {
                var otherBlock = $(this);
                if (otherBlock.offset().top == curTop) {
                    otherBlock.css({'height': curHeight + 'px'});
                }
            });
        });
    });

    $('.main-conf-speakers-list').each(function() {
        var curList = $(this);
        if ($(window).width() > 1023) {
            if (!curList.hasClass('slick-slider')) {
                curList.slick({
                    infinite: true,
                    slidesToShow: 4,
                    slidesToScroll: 4,
                    prevArrow: '<button type="button" class="slick-prev"></button>',
                    nextArrow: '<button type="button" class="slick-next"></button>',
                    dots: false
                });
            }
        } else {
            if (curList.hasClass('slick-slider')) {
                curList.slick('unslick');
            }
            if (curList.find('.main-conf-speaker:visible').length < curList.find('.main-conf-speaker').length) {
                $('.main-conf-speakers-more').addClass('visible');
            } else {
                $('.main-conf-speakers-more').removeClass('visible');
            }
        }
    });

});

$(document).ready(function() {

    $('.conference-section-speakers').each(function() {
        var curBlock = $(this);
        if (curBlock.find('.conference-section-speaker').length > 10) {
            curBlock.find('.conference-section-speakers-more').addClass('visible');
        }
    });

    $('.conference-section-speakers-more a').click(function(e) {
        var curBlock = $(this).parents().filter('.conference-section-speakers');
        var countItems = curBlock.find('.conference-section-speaker').length;
        var countVisible = curBlock.find('.conference-section-speaker:visible').length;
        countVisible += 10;
        var curTop = curBlock.find('.conference-section-speakers-more').offset().top;
        if (countVisible >= countItems) {
            curBlock.find('.conference-section-speakers-more').removeClass('visible');
        }
        curBlock.find('.conference-section-speaker:lt(' + countVisible + ')').css({'display': 'inline-block'});
        $('html, body').animate({'scrollTop': curTop}, 100);
        e.preventDefault();
    });

    $('.main-conf-speakers-more a').click(function(e) {
        var curBlock = $(this).parents().filter('.main-conf-speakers');
        var countItems = curBlock.find('.main-conf-speaker').length;
        var countVisible = curBlock.find('.main-conf-speaker:visible').length;
        countVisible += 2;
        var curTop = curBlock.find('.main-conf-speakers-more').offset().top;
        if (countVisible >= countItems) {
            curBlock.find('.main-conf-speakers-more').removeClass('visible');
        }
        curBlock.find('.main-conf-speaker:lt(' + countVisible + ')').addClass('visible');
        $('html, body').animate({'scrollTop': curTop}, 100);
        e.preventDefault();
    });

});