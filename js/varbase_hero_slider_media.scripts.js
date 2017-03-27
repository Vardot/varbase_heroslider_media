/**
 * @file
 * Behaviors Varbase hero slider media general scripts.
 */

(function ($, _, Drupal, drupalSettings) {
  "use strict";

  Drupal.behaviors.varbaseHeroSliderMedia = {
    attach: function (context) {
      // On before slide change.
      $('.slick--view--varbase-heroslider-media .slick__slider', context).on('beforeChange', function (event, slick, currentSlide, nextSlide) {
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
        $('.slick--view--varbase-heroslider-media .video-embed-field-responsive-video iframe').on("load", function () {
          var firstSlideVideo = $('.slick__slider .slick-active').find('.media-video').length !== 0;
          if (firstSlideVideo) {
            $('.slick__slider').slick('slickPause');
            player.api("play");
          }
        });

        // Vimeo variable.
        if ($('.slick--view--varbase-heroslider-media .video-embed-field-responsive-video iframe').length > 0) {
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
})(window.jQuery, window._, window.Drupal, window.drupalSettings);
