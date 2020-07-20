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
                        curBlock.css({'height': newHeight + 'px'});
                    } else {
                        otherBlock.css({'height': curHeight + 'px'});
                    }
                }
            });
        });
    });

});