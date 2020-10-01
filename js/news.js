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

});