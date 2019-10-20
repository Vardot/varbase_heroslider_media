/**
 * @file
 * Behaviors of Varbase hero slider media for vimeo embeded videos scripts.
 */

(function ($, Drupal) {
  "use strict";

  Drupal.behaviors.varbaseHeroSliderMedia_vimeo = {
    attach: function (context, settings) {
      var mediaSliders = $('.slick--view--varbase-heroslider-media .slick__slider', context);
      // On before slide change.
      mediaSliders.on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        var currentVideo = $('.slide--' + currentSlide + '.slick-active').find('.varbase-video-player iframe[src*="vimeo.com"]', context);
        if (currentVideo.length > 0) {
          currentVideo.get(0).contentWindow.postMessage('pause', "*");
        }
      });

      // On after slide change.
      mediaSliders.on('afterChange', function (event, slick, currentSlide) {
        var currentVideo = $('.slide--' + currentSlide + '.slick-active').find('.varbase-video-player iframe[src*="vimeo.com"]', context);
        if (currentVideo.length > 0) {
          currentVideo.get(0).contentWindow.postMessage('play', "*");
        }
        else {
          $('.slick__slider').slick('slickPlay');
        }
      });

      // On first slide load.
      mediaSliders.each(function(i) {
        var firstIframeVideo = $(this).find('.slide').first().find('.varbase-video-player iframe[src*="vimeo.com"]', context);
        if (firstIframeVideo.length > 0) {
          firstIframeVideo.on("load", function() {
            $('.slick__slider').slick('slickPause');
            $(this).get(0).contentWindow.postMessage('play', "*");
          });
        }
      });

      function vimeoActionProcessor(e) {
        if (e.data === "endedVimeo" || e.message === "endedVimeo") {
          $('.slick__slider').slick('slickNext');
        }
        else {
          $('.slick__slider').slick('slickPause');
        }
      }

      // Setup the event listener for messaging.
      if (window.addEventListener) {
        window.addEventListener("message", vimeoActionProcessor, false);
      }
      else {
        window.attachEvent("onmessage", vimeoActionProcessor);
      }

    }
  };
})(window.jQuery, window.Drupal);
