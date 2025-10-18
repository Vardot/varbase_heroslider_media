/**
 * @file
 * Behaviors of Varbase hero slider media for local video scripts.
 */

(function varbaseHeroSliderMediaLocalVideo($, Drupal) {
  Drupal.behaviors.varbaseHeroSliderMedia_local_video = {
    attach(context) {
      $(window).on('load', function onWindowLoad() {
        const mediaSliders = $(
          '.slick--view--varbase-heroslider-media .slick__slider',
          context,
        );

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

        // On before slide change.
        mediaSliders.on(
          'beforeChange',
          function onBeforeSlideChange(event, slick, currentSlide, nextSlide) {
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
              const nextPlayPromise = nextPlayer.play();
              if (
                nextPlayPromise &&
                Object.keys(nextPlayPromise).length === 0 &&
                nextPlayPromise.constructor === Object
              ) {
                nextPlayPromise
                  // eslint-disable-next-line max-nested-callbacks
                  .then(() => {
                    // Automatic playback started!
                    // Show playing UI.
                    // We can now safely pause video...
                    nextPlayer.pause();
                  })
                  // eslint-disable-next-line max-nested-callbacks
                  .catch(() => {
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
        $('.slick--view--varbase-heroslider-media', context).each(
          function processFirstSlideVideo() {
            const firstVideo = $(this)
              .find('.slide.slick-active')
              .find('.varbase-video-player video', context);

            if (firstVideo.length > 0) {
              mediaSliders.slick('slickPause');

              const firstVideoPlayer = firstVideo.get(0);
              firstVideoPlayer.muted = true;

              // DOMException - The play() request was interrupted.
              // https://developer.chrome.com/blog/play-request-was-interrupted
              const firstVideoPlayPromise = firstVideoPlayer.play();
              if (
                firstVideoPlayPromise &&
                Object.keys(firstVideoPlayPromise).length === 0 &&
                firstVideoPlayPromise.constructor === Object
              ) {
                firstVideoPlayPromise
                  // eslint-disable-next-line max-nested-callbacks
                  .then(() => {
                    // Automatic playback started!
                    // Show playing UI.
                    // We can now safely pause video...
                    firstVideoPlayer.pause();
                  })
                  // eslint-disable-next-line max-nested-callbacks
                  .catch(() => {
                    // Auto-play was prevented
                    // Show paused UI.
                  });
              }

              // eslint-disable-next-line max-nested-callbacks
              firstVideo.on('ended', function onFirstVideoEnded() {
                mediaSliders.slick('slickPlay');
              });
            }
          },
        );

        $('.slick--view--varbase-heroslider-media.slick--less', context).each(
          function processLessSliderVideo() {
            const firstVideo = $(this)
              .find('.slide')
              .find('.varbase-video-player video', context);

            if (firstVideo.length > 0) {
              const firstVideoPlayer = firstVideo.get(0);
              firstVideoPlayer.muted = true;
              firstVideoPlayer.loop = true;

              // DOMException - The play() request was interrupted.
              // https://developer.chrome.com/blog/play-request-was-interrupted
              const firstVideoPlayPromise = firstVideoPlayer.play();
              if (
                firstVideoPlayPromise &&
                Object.keys(firstVideoPlayPromise).length === 0 &&
                firstVideoPlayPromise.constructor === Object
              ) {
                firstVideoPlayPromise
                  // eslint-disable-next-line max-nested-callbacks
                  .then(() => {
                    // Automatic playback started!
                    // Show playing UI.
                    // We can now safely pause video...
                    firstVideoPlayer.pause();
                  })
                  // eslint-disable-next-line max-nested-callbacks
                  .catch(() => {
                    // Auto-play was prevented
                    // Show paused UI.
                  });
              }
            }
          },
        );

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
      });
    },
  };
})(window.jQuery, window.Drupal);
