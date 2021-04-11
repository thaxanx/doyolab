/* ===================================================================
 * Kreative 2.0.0 - Main JS
 *
 * ------------------------------------------------------------------- */

(function($) {

    "use strict";
    
    const cfg = {
                scrollDuration : 800, // smoothscroll duration
                mailChimpURL   : ''   // mailchimp url
                };

    // Add the User Agent to the <html>
    // will be used for IE10/IE11 detection (Mozilla/5.0 (compatible; MSIE 10.0; Windows NT 6.2; Trident/6.0; rv:11.0))
    // const doc = document.documentElement;
    // doc.setAttribute('data-useragent', navigator.userAgent);


   /* preloader
    * -------------------------------------------------- */
    const ssPreloader = function() {

        const preloader = document.querySelector('#preloader');

        // #preloaderが見つからないときは、returnで処理を終了する。
        if (!preloader) return;

        document.querySelector('html').classList.add('ss-preload');
        
        window.addEventListener('load', function() {
               
            document.querySelector('html').classList.remove('ss-preload');
            document.querySelector('html').classList.add('ss-loaded');

            // transitionが終了したとき、#preloaderをdisply = noneで見えなくする。
            preloader.addEventListener('transitionend', function(e) {
                if (e.target.matches("#preloader")) {
//                    this.style.display = 'none';
                }
            });
        });

        // ページの更新時にページのスクロール位置を強制的に上に移動する。
//        window.addEventListener('beforeunload' , function () {
//            window.scrollTo(0, 0);
//        });
    };

    
    
   /* fade out
    * -------------------------------------------------- */
    const ssFadeOut = function() {
        // 別ウインドウと#リンク以外の遷移を止める。
        $('a:not([href^="#"]):not([target])').on('click', function(e){
            e.preventDefault();
            
            // 遷移先のurlを取得。
            var url = $(this).attr('href');
            
            // アニメーションクラスを挿入。
            if (url !== '') {
                console.log(url);
                $('html').removeClass('ss-loaded');
                $('html').addClass('fadeout');
                
                // 0.6秒後に取得したurlに遷移。
                setTimeout(function(){
                    window.location = url;
                }, 600);
            }
            return false;
        });
    };
    
    
    
   /* move header
    * -------------------------------------------------- */
    const ssMoveHeader = function () {

        const hdr = document.querySelector('.s-header');
        const hero = document.querySelector('#home');
        let triggerHeight;

        if (!(hdr && hero)) return;

        setTimeout(function(){
            triggerHeight = hero.offsetHeight - 170;
        }, 300);

        window.addEventListener('scroll', function () {

            let loc = window.scrollY;

            if (loc > triggerHeight) {
                hdr.classList.add('sticky');
            } else {
                hdr.classList.remove('sticky');
            }

            if (loc > triggerHeight + 20) {
                hdr.classList.add('offset');
            } else {
                hdr.classList.remove('offset');
            }

            if (loc > triggerHeight + 150) {
                hdr.classList.add('scrolling');
            } else {
                hdr.classList.remove('scrolling');
            }

        });
    };



   /* Mobile Menu
    * ---------------------------------------------------- */ 
    const ssMobileMenu = function() {

        const $toggleButton = $('.s-header__menu-toggle');
        const $nav = $('.s-header__nav');


        $toggleButton.on('click', function(event){
            event.preventDefault();
            $toggleButton.toggleClass('is-clicked');
            $nav.slideToggle();
        });

        // add mobile class
        if ($toggleButton.is(':visible')) $nav.addClass('mobile');

        $(window).resize(function() {
            if ($toggleButton.is(':visible')) $nav.addClass('mobile');
            else $nav.removeClass('mobile');
        });

        $('.s-header__nav ul').find('a').on("click", function() {
            if ($nav.hasClass('mobile')) {
                $toggleButton.trigger('click');
            }
        });
    }; 


   /* search
    * ------------------------------------------------------ */
    const ssSearch = function() {

        const searchWrap = document.querySelector('.s-header__search');
        const searchTrigger = document.querySelector('.s-header__search-trigger');

        if (!(searchWrap && searchTrigger)) return;

        const searchField = searchWrap.querySelector('.search-field');
        const closeSearch = searchWrap.querySelector('.s-header__overlay-close');
        const siteBody = document.querySelector('body');

        searchTrigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            siteBody.classList.add('search-is-visible');
            setTimeout(function(){
                searchWrap.querySelector('.search-field').focus();
            }, 100);
        });

        closeSearch.addEventListener('click', function(e) {
            e.stopPropagation();

            if(siteBody.classList.contains('search-is-visible')) {
                siteBody.classList.remove('search-is-visible');
                setTimeout(function(){
                    searchWrap.querySelector('.search-field').blur();
                }, 100);
            }
        });

        searchWrap.addEventListener('click', function(e) {
            if( !(e.target.matches('.search-field')) ) {
                closeSearch.dispatchEvent(new Event('click'));
            }
        });

        searchField.addEventListener('click', function(e) {
            e.stopPropagation();
        })

        searchField.setAttribute('placeholder', 'Type Keywords');
        searchField.setAttribute('autocomplete', 'off');
    };



   /* Highlight the current section in the navigation bar
    * ------------------------------------------------------ */
    const ssWaypoints = function() {

        const $sections = $(".target-section");
        const $navigationLinks = $(".s-header__nav li a");

        $sections.waypoint( {

            handler: function(direction) {

                let $activeSection;

                $activeSection = $('section#' + this.element.id);

                if (direction === "up") $activeSection = $activeSection.prevAll(".target-section").first();

                let $activeLink = $('.s-header__nav li a[href="#' + $activeSection.attr("id") + '"]');

                $navigationLinks.parent().removeClass("current");
                $activeLink.parent().addClass("current");

            },

            offset: '25%'

        });
    };



   /* Slick Slider
    * ------------------------------------------------------ */
    const ssSlickSlider = function() {

        // Home Slider
        // ----------------------------
        function ssRunHomeSlider() {
            const $heroSlider = $('.s-home__slider');

            $heroSlider.slick({
                arrows: false,
                dots: false,
                speed: 1000,
                fade: true,
                cssEase: 'linear',
                autoplay: false,
                autoplaySpeed: 5000,
                pauseOnHover: false
            });

            $('.s-home__arrow-prev').on('click', function() {
                $heroSlider.slick('slickPrev');
            });
    
            $('.s-home__arrow-next').on('click', function() {
                $heroSlider.slick('slickNext');
            });

        } // end ssRunHomeSlider

        function ssRunTestimonialSlider() {
            const $testimonialSlider = $('.testimonial-slider');
                            
            $testimonialSlider.slick({
                arrows: false,
                dots: true,
                infinite: true,
                slidesToShow: 3,
                slidesToScroll: 1,
                pauseOnFocus: false,
                autoplaySpeed: 1500,
                responsive: [
                    {
                        breakpoint: 1080,
                        settings: {
                            slidesToShow: 2,
                            slidesToScroll: 1
                        }
                    },
                    {
                        breakpoint: 800,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            });
        } // end ssRunTestimonialSlider

        ssRunHomeSlider();
        ssRunTestimonialSlider();
    };



   /* animate on scroll
    * ------------------------------------------------------ */
    const ssAOS = function() {
        
        AOS.init( {
            offset: 100,
            duration: 600,
            easing: 'ease-in-out',
            delay: 300,
            once: true,
            disable: 'mobile'
        });

    };



   /* alert boxes
    * ------------------------------------------------------ */
    const ssAlertBoxes = function() {

        const boxes = document.querySelectorAll('.alert-box');

        boxes.forEach(function(box) {

            box.addEventListener('click', function(e){
                if (e.target.matches(".alert-box__close")) {
                    e.stopPropagation();
                    e.target.parentElement.classList.add("hideit");

                    setTimeout(function() {
                        box.style.display = "none";
                    }, 500)
                }    
            });

        })
    };


   /* smooth scrolling
    * ------------------------------------------------------ */
    const ssSmoothScroll = function() {
        
        $('.smoothscroll').on('click', function (e) {
            const target = this.hash;
            const $target = $(target);
            
            e.preventDefault();
            e.stopPropagation();

            $('html, body').stop().animate({
                'scrollTop': $target.offset().top
            }, cfg.scrollDuration, 'swing').promise().done(function () {
                window.location.hash = target;
            });
        });
    };


   /* back to top
    * ------------------------------------------------------ */
    const ssBackToTop = function() {

        const pxShow = 800;
        const goTopButton = document.querySelector(".ss-go-top");

        if (!goTopButton) return;

        // Show or hide the button
        if (window.scrollY >= pxShow) goTopButton.classList.add("link-is-visible");

        window.addEventListener('scroll', function() {
            if (window.scrollY >= pxShow) {
                if(!goTopButton.classList.contains('link-is-visible')) goTopButton.classList.add("link-is-visible")
            } else {
                goTopButton.classList.remove("link-is-visible")
            }
        });
    };


    /* map
    * ------------------------------------------------------ */
    const initMap = function() {
        var latlng = new google.maps.LatLng(35.458689826364456, 139.62773998276748);

        var map = new google.maps.Map(document.getElementById('map'), {
            center: latlng,
            zoom: 15,
            disableDefaultUI: true,
            zoomControl: true,
        });
        
        var marker = new google.maps.Marker({
            position: latlng,
            map: map,
            title: 'KU Fab Studio',
            animation: google.maps.Animation.BOUNCE,
        });
        
        // マーカー
        var infoWindow = new google.maps.InfoWindow({
            position: latlng,
            content: '<strong>神奈川大学みなとみらいキャンパス<br>KU Fab Studio</strong><br>神奈川県横浜市西区みなとみらい４－５－３',
        });
        
        // クリックしたときにマーカーを表示
        marker.addListener('click', function() {
            infoWindow.open(map);
        });
    };

    google.maps.event.addDomListener( window, 'load', initMap );



   /* initialize
    * ------------------------------------------------------ */
    (function ssInit() {

        ssPreloader();
        ssFadeOut();
        ssMoveHeader();
        ssMobileMenu();
        ssSearch();
        ssWaypoints();
        ssSlickSlider();
        ssAOS();
        ssAlertBoxes();
        ssSmoothScroll();
        ssBackToTop();

    })();

})(jQuery);