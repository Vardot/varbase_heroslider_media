/**
 * @file
 * Behaviors of Vimeo player in the Hero slider OEmbed iframe.
 */

function ready(fn) {
  if (document.readyState !== 'loading') {
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', function onReadyStateChange() {
      if (document.readyState !== 'loading') {
        fn();
      }
    });
  }
}

// Load the Vimeo API library.
const tag = document.createElement('script');
tag.src = '//player.vimeo.com/api/player.js';
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

ready(function initializeVimeoPlayer() {
  const mediaIframe = document.querySelector('iframe');
  mediaIframe.setAttribute('id', 'media-oembed-iframe');

  let playerConfigured = false;
  let videoLoop = false;
  let vimeoPlayer;

  function actionProcessor(evt) {
    // Manage Vimeo video.
    if (evt.data === 'play') {
      if (!playerConfigured) {
        const vimeoIframe = document.querySelector('iframe[src*="vimeo.com"]');

        const vimeoOptions = {
          background: true,
          autoplay: true,
          muted: true,
          controls: false,
        };

        vimeoPlayer = new window.Vimeo.Player(vimeoIframe, vimeoOptions);
        vimeoPlayer.setVolume(0);
        vimeoPlayer.setLoop(videoLoop);
        vimeoPlayer.on('ended', function onVimeoEnded() {
          window.parent.postMessage('endedVimeo', '*');
          vimeoPlayer.pause();
        });

        vimeoPlayer.on('play', function onVimeoPlay() {
          window.parent.postMessage('playingVimeo', '*');
        });
        playerConfigured = true;
      }

      vimeoPlayer.ready().then(function onVimeoReady() {
        vimeoPlayer.getPaused().then(function onGetPausedState(paused) {
          if (paused) {
            vimeoPlayer.play();
          }
        });
      });
    } else if (evt.data === 'pause') {
      if (playerConfigured) {
        vimeoPlayer.pause();
      }
    } else if (evt.data === 'loop') {
      videoLoop = true;
    }
  }

  // Setup the event listener for messaging.
  if (window.addEventListener) {
    window.addEventListener('message', actionProcessor, false);
  } else {
    window.attachEvent('onmessage', actionProcessor);
  }
});
