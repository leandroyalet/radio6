(function () {

  function init() {

    function fetchSongName() {
      fetch('https://servidorstream.com/radio.php?q=8149/live.xspf')
        .then(response => response.text())
        .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
        .then(data => {
          if (data.querySelector('playlist > trackList > track > title')) {
            var title = data.querySelector('playlist > trackList > track > title').textContent;
            var annotation = data.querySelector('playlist > trackList > track > annotation').textContent;
            if (title) {
              document.getElementById('songTitle').innerHTML = title;
              console.info("Loaded song title: " + title);
            } else {
              document.getElementById('songTitle').innerHTML = "AWESOME PIRATE MIX";
            }
            if (annotation) {
              var annotationLines = annotation.split("\n");
              var currentListeners = annotationLines[4].split(": ");
              document.getElementById('listeners').innerHTML = currentListeners[0] + ": " + (parseInt(currentListeners[1]) + 53);
            }
          } else {
            document.getElementById('songTitle').innerHTML = 'The radio is currently down! Please stay tuned!';
          }
          setTimeout(function () {
            fetchSongName();
          }, 20000);
        })
    }

    fetchSongName();
  }

  soundManager.setup({
    onready: init,
    ontimeout: init
  });

}());
