/**
 * @file
 * Behaviors Varbase hero slider media general scripts.
 */

(function ($, _, Drupal, drupalSettings) {
  "use strict";

  Drupal.behaviors.varbaseHeroSliderMedia_vimeo = {
    attach: function (context) {
      // On before slide change.
      $('.slick--view--media-hero-slider .slick__slider', context).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        var currentSlideObject = $('.slide--' + currentSlide + '.slick-active');
        var nextSlideObject = $('.slide--' + nextSlide);
        var currentIframe = currentSlideObject.find('.video-embed-field-responsive-video iframe', context);
        var nextIframe = nextSlideObject.find('.video-embed-field-responsive-video iframe', context);

        if (currentIframe.length !== 0) {
          var currentPlayer = $f(currentIframe[0]);
          currentPlayer.api("pause");
        }

        if (nextIframe.length !== 0) {
          var nextPlayer = $f(nextIframe[0]);
          nextPlayer.addEvent('pause', onPause);
          nextPlayer.addEvent('finish', onFinish);
          nextPlayer.addEvent('playProgress', onPlayProgress);
          nextPlayer.api("play");
        }
      });

      // When first slide has a video (Pause the slider and play the video).
      $('.slick--view--media-hero-slider .video-embed-field-responsive-video iframe').on("load", function () {
        var firstSlideVideo = $('.slick__slider .slick-active').find('.media-video').length !== 0;
        if (firstSlideVideo) {
          $('.slick__slider').slick('slickPause');
          player.api("play");
        }
      });

      // Vimeo variable.
      if ($('.slick--view--media-hero-slider .video-embed-field-responsive-video iframe').length > 0) {
        var iframe = $('.video-embed-field-responsive-video iframe')[0];
        var player = $f(iframe);

        // When the player is ready, add listeners for pause, finish,
        // and playProgress.
        player.addEvent('ready', function () {
          player.addEvent('pause', onPause);
          player.addEvent('finish', onFinish);
          player.addEvent('playProgress', onPlayProgress);
        });
      }

      // Play when paused.
      function onPause() {
        $('.slick__slider').slick('slickPlay');
      }

      // Play when finished.
      function onFinish() {
        $('.slick__slider').slick('slickPlay');
      }

      // Puse on play prgress.
      function onPlayProgress() {
        $('.slick__slider').slick('slickPause');
      }

    }
  };

  Drupal.behaviors.varbaseHeroSliderMedia_youtube = {
    attach: function (context, settings) {
      $(window).on('load', function () {

        //Youtube API
        var yotubePlayer;
        yotubePlayer = new YT.Player('youtubeVideo', {
          events: {
            'onStateChange': onPlayerStateChange,
            'onReady': onPlayerReady
          }
        });

        //Play youtube video on ready
        function onPlayerReady() {
          var firstSlideVideo = $('.slick--view--media-hero-slider .slick__slider .slick-active').find('.media-video').length !== 0;
          if (firstSlideVideo) {
            $('.slick--view--media-hero-slider .slick__slider').slick('slickPause');
            yotubePlayer.playVideo();
          } else {// if hero slider has one Slide
            var onlySlide = $('.slick--view--media-hero-slider .slick').find('.media-video').length !== 0;
            if (onlySlide) {
              yotubePlayer.playVideo();
            }
          }
        }

        //video status
        function onPlayerStateChange(event) {
          if (event.data === 0) { // On finish
            $('.slick--view--media-hero-slider .slick__slider').slick('slickPlay');
          } else if (event.data === 1) { // On playing
            $('.slick--view--media-hero-slider .slick__slider').slick('slickPause');
          } else if (event.data === 2) { // Onpause
            $('.slick--view--media-hero-slider .slick__slider').slick('slickPause');
          }
        }

        $('.slick--view--media-hero-slider .slick__slider', context).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
          var currentSlideObject = $('.slick--view--media-hero-slider .slide--' + currentSlide + '.slick-active');
          var nextSlideObject = $('.slick--view--media-hero-slider .slide--' + nextSlide);
          var currentIframe = currentSlideObject.find('.video-embed-field-responsive-video #youtubeVideo', context);
          var nextIframe = nextSlideObject.find('.video-embed-field-responsive-video #youtubeVideo', context);

          if (currentIframe.length !== 0) {
            yotubePlayer.a = currentIframe[0];
            yotubePlayer.pauseVideo();
          }

          if (nextIframe.length !== 0) {
            yotubePlayer.a = nextIframe[0];
            yotubePlayer.playVideo();
          }
        });

        // When first slide has a video (Pause the slider and play the video).
        $('.slick--view--media-hero-slider .video-embed-field-responsive-video #youtubeVide').on("load", function () {
          var firstSlideVideo = $('.slick--view--media-hero-slider .slick__slider .slick-active').find('.media-video').length !== 0;
          if (firstSlideVideo) {
            $('.slick--view--media-hero-slider .slick__slider').slick('slickPause');
            yotubePlayer.playVideo();
          }
        });
      });
    }
  };
})(window.jQuery, window._, window.Drupal, window.drupalSettings);
