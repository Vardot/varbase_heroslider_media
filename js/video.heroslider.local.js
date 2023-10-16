/**
 * @file
 * Behaviors of Varbase hero slider media for local video scripts.
 */

(function ($, Drupal) {
  Drupal.behaviors.varbaseHeroSliderMedia_local_video = {
    attach(context) {
      $(window).on('load', function () {
        const mediaSliders = $(
          '.slick--view--varbase-heroslider-media .slick__slider',
          context,
        );

        // On before slide change.
        mediaSliders.on(
          'beforeChange',
          function (event, slick, currentSlide, nextSlide) {
            const currentSlideObject = $(
              `.slide--${currentSlide}.slick-active`,
            );
            const nextSlideObject = $(`.slide--${nextSlide}`);
            const currentVideo = currentSlideObject.find(
              '.varbase-video-player video',
              context,
            );
            const nextVideo = nextSlideObject.find(
              '.varbase-video-player video',
              context,
            );

            if (currentVideo.length > 0) {
              const currentPlayer = currentVideo.get(0);
              currentPlayer.pause();
            }

            if (nextVideo.length > 0) {
              const nextPlayer = nextVideo.get(0);
              nextPlayer.muted = true;
              nextPlayer.onpause = onPause;
              nextPlayer.onended = onFinish;
              nextPlayer.onplay = onPlayProgress;

              // DOMException - The play() request was interrupted.
              // https://developer.chrome.com/blog/play-request-was-interrupted
              var playPromise = nextPlayer.play();
              if (playPromise !== undefined) {
                playPromise.then(_ => {
                  // Automatic playback started!
                  // Show playing UI.
                  // We can now safely pause video...
                  nextPlayer.pause();
                })
                .catch(error => {
                  // Auto-play was prevented
                  // Show paused UI.
                });
              }
            } else {
              mediaSliders.slick('slickPlay');
            }
          },
        );

        // When first slide has a video (Pause the slider and play the video).
        $('.slick--view--varbase-heroslider-media', context).each(function () {
          const firstVideo = $(this)
            .find('.slide')
            .find('.varbase-video-player video', context);

          if (firstVideo.length > 0) {
            mediaSliders.slick('slickPause');

            const firstVideoPlayer = firstVideo.get(0);
            firstVideoPlayer.muted = true;

            // DOMException - The play() request was interrupted.
            // https://developer.chrome.com/blog/play-request-was-interrupted
            var playPromise = firstVideoPlayer.play();
            if (playPromise !== undefined) {
              playPromise.then(_ => {
                // Automatic playback started!
                // Show playing UI.
                // We can now safely pause video...
                firstVideoPlayer.pause();
              })
              .catch(error => {
                // Auto-play was prevented
                // Show paused UI.
              });
            }

            firstVideo.on('ended', function () {
              mediaSliders.slick('slickPlay');
            });
          }
        });

        // Local Video variable.
        if (
          $(
            '.slick--view--varbase-heroslider-media .varbase-video-player video',
            context,
          ).length > 0
        ) {
          const player = $(
            '.slick--view--varbase-heroslider-media .varbase-video-player video',
            context,
          ).get(0);

          // When the player is ready, add listeners for pause, finish,
          // and playProgress.
          player.onpause = onPause;
          player.onended = onFinish;
          player.onplay = onPlayProgress;
        }

        // Play when paused.
        function onPause() {
          mediaSliders.slick('slickNext');
        }

        // Play when finished.
        function onFinish() {
          mediaSliders.slick('slickPlay');
        }

        // Pause on play progress.
        function onPlayProgress() {
          mediaSliders.slick('slickPause');
        }
      });
    },
  };
})(window.jQuery, window.Drupal);
