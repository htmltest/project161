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
                        ccurHeight = newHeight;
                    } else {
                        otherBlock.css({'height': curHeight + 'px'});
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