/**
 * @file
 * Behaviors Varbase hero slider media general scripts.
 */

(function ($, _, Drupal, drupalSettings) {
  "use strict";

  Drupal.behaviors.varbaseHeroSliderMedia_vimeo = {
    attach: function (context, settings) {

      // On before slide change.
      $('.slick--view--varbase-heroslider-media .slick__slider', context).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        var currentSlideObject = $('.slide--' + currentSlide + '.slick-active');
        var nextSlideObject = $('.slide--' + nextSlide);
        var currentIframe = currentSlideObject.find('.video-embed-field-responsive-video iframe[src*="vimeo.com"]', context);
        var nextIframe = nextSlideObject.find('.video-embed-field-responsive-video iframe[src*="vimeo.com"]', context);

        if (currentIframe.length !== 0) {
          var currentPlayer = new Vimeo.Player(currentIframe[0]);
          currentPlayer.pause();
        }

        if (nextIframe.length !== 0) {
          var nextPlayer = new Vimeo.Player(nextIframe[0]);
          nextPlayer.on('pause', onPause);
          nextPlayer.on('ended', onFinish);
          nextPlayer.on('play', onPlayProgress);
          nextPlayer.play();
        }
      });

      // When first slide has a video (Pause the slider and play the video).
      $('.slick--view--varbase-heroslider-media .video-embed-field-responsive-video iframe[src*="vimeo.com"]').on("load", function () {
        var firstSlideVideo = $('.slick__slider .slick-active').find('.media-video').length !== 0;
        if (firstSlideVideo) {
          $('.slick__slider').slick('slickPause');
          player.play();
        }
      });

      // Vimeo variable.
      if ($('.slick--view--varbase-heroslider-media .video-embed-field-responsive-video iframe[src*="vimeo.com"]').length > 0) {
        var iframe = $('.video-embed-field-responsive-video iframe[src*="vimeo.com"]')[0];
        var player = new Vimeo.Player(iframe);

        // When the player is ready, add listeners for pause, finish,
        // and playProgress.
        player.on('pause', onPause);
        player.on('ended', onFinish);
        player.on('play', onPlayProgress);
      }

      // Play when paused.
      function onPause() {
        $('.slick__slider').slick('slickPlay');
      }

      // Play when finished.
      function onFinish() {
        $('.slick__slider').slick('slickPlay');
      }

      // Pause on play prgress.
      function onPlayProgress() {
        $('.slick__slider').slick('slickPause');
      }
    }
  };

  Drupal.behaviors.varbaseHeroSliderMedia_youtube = {
    attach: function (context, settings) {
      $(window).on('load', function () {

        // Youtube API.
        var yotubePlayer;
        yotubePlayer = new YT.Player('youtubeVideo', {
          events: {
            'onStateChange': onPlayerStateChange,
            'onReady': onPlayerReady
          }
        });

        // Play youtube video on ready.
        function onPlayerReady() {
          var firstSlideVideo = $('.slick--view--varbase-heroslider-media .slick__slider .slick-active').find('.media-video').length !== 0;
          if (firstSlideVideo) {
            $('.slick--view--varbase-heroslider-media .slick__slider').slick('slickPause');
            yotubePlayer.playVideo();
          } else {// if hero slider has one Slide
            var onlySlide = $('.slick--view--varbase-heroslider-media .slick').find('.media-video').length !== 0;
            if (onlySlide) {
              yotubePlayer.playVideo();
            }
          }
        }

        // Video status.
        function onPlayerStateChange(event) {
          if (event.data === 0) { // On finish
            $('.slick--view--varbase-heroslider-media .slick__slider').slick('slickPlay');
          } else if (event.data === 1) { // On playing
            $('.slick--view--varbase-heroslider-media .slick__slider').slick('slickPause');
          } else if (event.data === 2) { // Onpause
            $('.slick--view--varbase-heroslider-media .slick__slider').slick('slickPause');
          }
        }

        $('.slick--view--varbase-heroslider-media .slick__slider', context).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
          var currentSlideObject = $('.slick--view--varbase-heroslider-media .slide--' + currentSlide + '.slick-active');
          var nextSlideObject = $('.slick--view--varbase-heroslider-media .slide--' + nextSlide);
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
        $('.slick--view--varbase-heroslider-media .video-embed-field-responsive-video #youtubeVide').on("load", function () {
          var firstSlideVideo = $('.slick--view--varbase-heroslider-media .slick__slider .slick-active').find('.media-video').length !== 0;
          if (firstSlideVideo) {
            $('.slick--view--varbase-heroslider-media .slick__slider').slick('slickPause');
            yotubePlayer.playVideo();
          }
        });
      });
    }
  };
})(window.jQuery, window._, window.Drupal, window.drupalSettings);
