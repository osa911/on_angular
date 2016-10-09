jQuery(function($) {

    "use strict";

    $(function() {

    	/*
         * Split nav
         */

        UIkit.$win.on('load resize orientationchange', (function(){

            var fn = function() {

                var logowidth   = $('.bh-logo').outerWidth(),
                    nav         = $('.bh-navbar .uk-navbar-nav'),
                    navwrap     = $('.bh-navbar-nav-wrapper'),
                    navitems    = nav.children(),
                    equal       = Math.ceil(navitems.length / 2),
                    rtl         = ($.UIkit.langdirection == 'right'),
                    movenav     = 0;

                    navwrap.css('visibility', 'hidden');

                navwrap.css({ 'margin-right':'', 'margin-left':'' });
                navitems.eq(equal - 1).css({ 'margin-right':'', 'margin-left':'' });

                for( var i = 0; i < equal; i++ ) {
                    movenav += navitems.eq(i).width();
                }

                movenav = (navwrap.width() - movenav) - movenav;

                navwrap.css(rtl ? 'margin-right' : 'margin-left', movenav);
                navitems.eq(equal - 1).css(rtl ? 'margin-left' : 'margin-right', logowidth + 10);

                setTimeout(function(){
                    navwrap.css('visibility', '');
                }, 150);

                return fn;
            };

            return fn();

        })());

        /*
         * Search Focus
         */

        $('.bh-search-toggle').on('click', function(){
            setTimeout(function(){
                $('.bh-search-bar input:first').focus();
            }, 50);
        });

        /*
         * Counter
         */

        if(window.countUp) {

            $('[data-count-up]').each(function(){

                var ele       = $(this),
                    options   = $.UIkit.Utils.options(ele.attr('data-count-up')) || {},
                    counter   = new countUp(this, options.start || 0, options.end || 100, 0, options.duration || 1.5, options);

                ele.on('inview.uk.scrollspy', function(){
                    counter.start();
                });

                var scrollspy = $.UIkit.scrollspy(ele);
            });
        }

        

    });

});
