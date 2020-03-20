(function() {

function init() {

    function fetchSongName(){
      fetch('https://servidorstream.com/radio.php?q=8149/live.xspf')
      .then(response => response.text())
      .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
      .then(data => {
        var title = data.querySelector('playlist > trackList > track > title').textContent;
        document.getElementById('songTitle').innerHTML = title;
        console.info("Loaded song title: " + title);
        setTimeout(function(){
          fetchSongName();
        }, 20000);
      })
    }

    fetchSongName();

  // Demo-specific things: background-switching, etc.

  var bgIndex = 1,
      backgrounds;

  // note: remote servers will need to serve a CORS response header for cross-domain canvas access.
  backgrounds = [
   'https://source.unsplash.com/1600x900/?music,crowd'
  ];

  /*
  document.getElementById('nextBackground').onclick = function(e) {

    var i, j, refreshed,
        loader = document.getElementById('tape-loader');

    function refreshDone() {
      // re-hide the loader
      refreshed++;
      if (refreshed == tapeUIs.length) {
        if (loader) {
          loader.className = 'hidden';
        }
      }
    }

    // hack: make the loader visible again
    if (loader) {
      loader.className = 'visible';
    }

    document.getElementsByTagName('html')[0].style.backgroundImage = 'url(' + backgrounds[bgIndex] + ')';

    refreshed = 0;

    for (i=0, j=tapeUIs.length; i<j; i++) {
      tapeUIs[i].refreshBlurImage(refreshDone);
    }

    if (++bgIndex >= backgrounds.length) {
      bgIndex = 0;
    }

    e.preventDefault();
    return false;

  }
*/

}

soundManager.setup({
  onready: init,
  ontimeout: init
});

}());
