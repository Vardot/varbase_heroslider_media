/**
 * @file
 * Behaviors of Varbase hero slider media for Youtube video scripts.
 */

(function ($, Drupal) {
  "use strict";

  Drupal.behaviors.varbaseHeroSliderMedia_youtube = {
    attach: function (context, settings) {
      $(window).on('load', function () {
        // On before slide change.
        $('.slick--view--varbase-heroslider-media .slick__slider', context).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
          var currentSlideObject = $('.slide--' + currentSlide + '.slick-active');
          var nextSlideObject = $('.slide--' + nextSlide);
          var currentVideo = currentSlideObject.find('.varbase-video-player iframe[src*="youtube.com"]', context);
          var nextVideo = nextSlideObject.find('.varbase-video-player iframe[src*="youtube.com"]', context);

          if (currentVideo.length > 0) {
            var currentPlayer = currentVideo.get(0).contentWindow;
            currentPlayer.postMessage('pause', "*");
          }

          if (nextVideo.length > 0) {
            var nextPlayer = nextVideo.get(0).contentWindow;
            nextPlayer.postMessage('play', "*");
          }
          else {
            $('.slick__slider').slick('slickPlay');
          }
        });

        // When first slide has a video (Pause the slider and play the video).
        $('.slick--view--varbase-heroslider-media', context).each(function () {
          var firstIframeVideo = $(this).find('.slide').first().find('.varbase-video-player iframe[src*="youtube.com"]', context);
          if (firstIframeVideo.length > 0) {
            $('.slick__slider').slick('slickPause');
            var firstIframeVideoPlayer = firstIframeVideo.get(0).contentWindow;
            firstIframeVideoPlayer.postMessage('play', "*");
          }
        });

        function youtubeActionProcessor(e) {
          if (e.data === "endedYoutube" || e.message === "endedYoutube") {
            $('.slick__slider').slick('slickNext');
          }
          else {
            $('.slick__slider').slick('slickPause');
          }
        }

        // Setup the event listener for messaging.
        if (window.addEventListener) {
          window.addEventListener("message", youtubeActionProcessor, false);
        }
        else {
          window.attachEvent("onmessage", youtubeActionProcessor);
        }

      });
    }
  };
})(window.jQuery, window.Drupal);
