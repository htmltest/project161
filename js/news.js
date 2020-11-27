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

    $('.analytics-team-prev, .analytics-team-next').each(function() {
        $('.window').append('<div class="window-size-test" style="position:absolute; left:0; top:0; right:0; height:1px;"></div>');
        $(this).css({'left': $('.window-size-test').width() / 2});
        $('.window-size-test').remove();
    });

    if ($(window).width() > 1199) {
        $('.analytics-menu').mCustomScrollbar('destroy');
    } else {
        $('.analytics-menu').mCustomScrollbar({
            axis: 'x'
        });
    }

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

    var clipboard = new ClipboardJS('.analytics-location-info-coords span');
    clipboard.on('success', function(e) {
        alert('Координаты скопированы в буфер');
    });

    $('body').on('click', '.window-link', function(e) {
        windowOpen($(this).attr('href'));
        e.preventDefault();
    });

    $('body').on('keyup', function(e) {
        if (e.keyCode == 27) {
            windowClose();
        }
    });

    $(document).click(function(e) {
        if ($(e.target).hasClass('window')) {
            windowClose();
        }
    });

    $('body').on('click', '.window-close', function(e) {
        windowClose();
        e.preventDefault();
    });

    $('.analytics-library-more a').click(function(e) {
        var curBlock = $(this).parents().filter('.analytics-library');
        $.ajax({
            type: 'POST',
            url: $(this).attr('href'),
            dataType: 'html',
            cache: false
        }).done(function(html) {
            curBlock.find('.analytics-library-list').append($(html).find('.analytics-library-list').html());
            if ($(html).find('.analytics-library-more').length == 1) {
                curBlock.find('.analytics-library-more a').attr('href', $(html).find('.analytics-library-more a').attr('href'));
            } else {
                curBlock.find('.analytics-library-more').remove();
            }
        });
        e.preventDefault();
    });

    $('.analytics-programm-tabs-menu a').click(function(e) {
        var curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            $('.analytics-programm-tabs-menu li.active').removeClass('active');
            curItem.addClass('active');
            var curIndex = $('.analytics-programm-tabs-menu li').index(curItem);
            $('.analytics-programm-tab.active').removeClass('active');
            $('.analytics-programm-tab').eq(curIndex).addClass('active');
        }
        e.preventDefault();
    });

    $('.analytics-programm-tabs-menu a').click(function(e) {
        var curItem = $(this).parent();
        if (!curItem.hasClass('active')) {
            $('.analytics-programm-tabs-menu li.active').removeClass('active');
            curItem.addClass('active');
            var curIndex = $('.analytics-programm-tabs-menu li').index(curItem);
            $('.analytics-programm-tab.active').removeClass('active');
            $('.analytics-programm-tab').eq(curIndex).addClass('active');
            $('.analytics-programm-tabs-menu').removeClass('open');
            $('.analytics-programm-tabs-menu-current span').html($(this).html());
        }
        e.preventDefault();
    });

    $('.analytics-programm-tabs-menu-current').click(function() {
        $('.analytics-programm-tabs-menu').toggleClass('open');
    });

    $(document).click(function(e) {
        if ($(e.target).parents().filter('.analytics-programm-tabs-menu').length == 0) {
            $('.analytics-programm-tabs-menu').removeClass('open');
        }
    });

});

function windowOpen(linkWindow, dataWindow) {
    if ($('.window').length == 0) {
        var curPadding = $('.wrapper').width();
        var curWidth = $(window).width();
        if (curWidth < 480) {
            curWidth = 480;
        }
        var curScroll = $(window).scrollTop();
        $('html').addClass('window-open');
        curPadding = $('.wrapper').width() - curPadding;
        $('body').css({'margin-right': curPadding + 'px'});

        $('body').append('<div class="window"><div class="window-loading"></div></div>')

        $('.wrapper').css({'top': -curScroll});
        $('.wrapper').data('curScroll', curScroll);
        $('meta[name="viewport"]').attr('content', 'width=' + curWidth);
    } else {
        $('.window').append('<div class="window-loading"></div>')
        $('.window-container').addClass('window-container-preload');
    }

    $.ajax({
        type: 'POST',
        url: linkWindow,
        processData: false,
        contentType: false,
        dataType: 'html',
        data: dataWindow,
        cache: false
    }).done(function(html) {
        if ($('.window-container').length == 0) {
            $('.window').html('<div class="window-container window-container-preload">' + html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a></div>');
        } else {
            $('.window-container').html(html + '<a href="#" class="window-close"><svg><use xlink:href="' + pathTemplate + 'images/sprite.svg#window-close"></use></svg></a>');
            $('.window .window-loading').remove();
        }

        window.setTimeout(function() {
            $('.window-container-preload').removeClass('window-container-preload');
        }, 100);

        $(window).trigger('resize');
    });
}

function windowClose() {
    if ($('.window').length > 0) {
        $('.window').remove();
        $('html').removeClass('window-open');
        $('body').css({'margin-right': 0});
        $('.wrapper').css({'top': 0});
        $('meta[name="viewport"]').attr('content', 'width=device-width');
        $(window).scrollTop($('.wrapper').data('curScroll'));
    }
}