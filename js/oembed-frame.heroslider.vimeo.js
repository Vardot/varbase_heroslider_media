/**
 * @file
 * Behaviors of Vimeo player in the Hero slider OEmbed iframe.
 */

function ready(fn) {
  if (document.readyState != 'loading') {
    fn();
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    document.attachEvent('onreadystatechange', function() {
      if (document.readyState != 'loading') {
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

ready(function() {
  const media_iframe = document.querySelector('iframe');
  media_iframe.setAttribute('id', 'media-oembed-iframe');

  let player_confgured = false;
  let vimeo_player;

  function actionProcessor(evt) {
    // Manage Vimeo video.
    if (evt.data === 'play') {
      if (!player_confgured) {
        const vimeo_iframe = document.querySelector('iframe[src*="vimeo.com"]');

        const vimeo_options = {
          background: true,
          autoplay: true,
          muted: true,
          controls: false
        };

        vimeo_player = new Vimeo.Player(vimeo_iframe, vimeo_options);
        vimeo_player.setVolume(0);
        vimeo_player.on('ended', function() {
          window.parent.postMessage('endedVimeo', '*');
          vimeo_player.pause();
        });

        vimeo_player.on('play', function() {
          window.parent.postMessage('playingVimeo', '*');
        });
        player_confgured = true;
      }

      vimeo_player.ready().then(function() {
        vimeo_player.getPaused().then(function(paused) {
          if (paused) {
            vimeo_player.play();
          }
        });
      });
    } else if (evt.data === 'pause') {
      if (player_confgured) {
        vimeo_player.pause();
      }
    }
  }

  // Setup the event listener for messaging.
  if (window.addEventListener) {
    window.addEventListener('message', actionProcessor, false);
  } else {
    window.attachEvent('onmessage', actionProcessor);
  }
});
