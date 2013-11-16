// Copyright (c) 2013 Jordi Vilaplana.
// Use of this source code is governed by a license that can be
// found in the LICENSE file.

var rockFM = {
  /**
   * RockFM URL that will give us the current song playing.
   *
   * @type {string}
   * @private
   */
  searchOnRockFM_: 'http://player.rockfm.fm/rdsrock.php',

  /**
   * Sends an XHR GET request to get the current song from RockFM radio station. The
   * XHR's 'onload' event hooks up to the 'getSong_' method.
   *
   * @public
   */
  getCurrentSong: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this.searchOnRockFM_, true);
    req.onload = this.getSong_.bind(this);
    req.send(null);
  },
  requestSonicmp3: function(query) {
    var req = new XMLHttpRequest();
    var searchon = 'http://www.sonicomp3.com/music/' + encodeURIComponent(query) + '.html';
    document.body.appendChild(document.createTextNode(searchon));
    req.open("GET", searchon, true);
    req.onload = this.getSonicmp3_.bind(this);
    req.send(null);
  },

  /**
   * Handle the 'onload' event of our kitten XHR request, generated in
   * 'requestKittens', by generating 'img' elements, and stuffing them into
   * the document for display.
   *
   * @param {ProgressEvent} e The XHR ProgressEvent.
   * @private
   */
  getSong_: function (e) {
    var currentSong = e.target.response;
    currentSong = currentSong.split("@")[0];
    currentSong = currentSong.replace(/:/g, "");
    currentSong = currentSong.replace(/"/g, '');

    var prova = document.createElement('div');
    if(currentSong.indexOf("RockFM") == -1) {
      var text = document.createTextNode(currentSong);
      var link = document.createElement('a');
      link.appendChild(document.createTextNode(currentSong));
      link.setAttribute('href', 'http://www.sonicomp3.com/music/' + encodeURIComponent(currentSong) + '.html');
      link.setAttribute('target', '_blank');

      prova.appendChild(link);
      document.getElementById('currentlyPlaying').appendChild(link);
    }
    else {
      var noSong = document.createElement('span');
      noSong.appendChild(document.createTextNode("No Song - " + currentSong));
      document.getElementById('currentlyPlaying').appendChild(noSong);
    }
  },

  getSonicmp3_: function (e) {
    document.body.appendChild(document.createTextNode(e.target.response));
    var results = e.target.responseXML.getElementById('table-result');
    document.body.appendChild(results);
  }
};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  rockFM.getCurrentSong();
});
