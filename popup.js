// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

/**
 * Global variable containing the query we'd like to pass to Flickr. In this
 * case, kittens!
 *
 * @type {string}
 */
var query = 'kittens';

var kittenGenerator = {
  /**
   * RockFM URL that will give us the current song playing.
   *
   * @type {string}
   * @private
   */
  searchOnRockFM_: 'http://player.rockfm.fm/rdsrock.php',
  searchOnSonicmp3_: 'http://www.sonicomp3.com/music/' + encodeURIComponent(query) + '.html',

  /**
   * Sends an XHR GET request to grab photos of lots and lots of kittens. The
   * XHR's 'onload' event is hooks up to the 'showPhotos_' method.
   *
   * @public
   */
  requestKittens: function() {
    var req = new XMLHttpRequest();
    req.open("GET", this.searchOnRockFM_, true);
    req.onload = this.showPhotos_.bind(this);
    req.send(null);
  },
  requestSonicmp3: function(query) {
    var req = new XMLHttpRequest();
    var searchon = 'http://www.sonicomp3.com/music/' + encodeURIComponent(query) + '.html';
    document.body.appendChild(document.createTextNode(searchon));
    req.open("GET", searchon, true);
    req.onload = this.showPhotos2_.bind(this);
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
  showPhotos_: function (e) {
    var currentSong = e.target.response;
    currentSong = currentSong.split("@")[0];
    currentSong = currentSong.replace(/:/g, "");
    currentSong = currentSong.replace(/"/g, '');
    window.query = currentSong;

    var prova = document.createElement('div');
    if(currentSong.indexOf("RockFM") == -1) {
      var text = document.createTextNode(currentSong);
      var link = document.createElement('a');
      link.appendChild(document.createTextNode(currentSong));
      link.setAttribute('href', 'http://www.sonicomp3.com/music/' + encodeURIComponent(currentSong) + '.html');
      link.setAttribute('target', '_blank');

      prova.appendChild(link);
      document.body.appendChild(prova);
    }
    else {
      document.body.appendChild(document.createTextNode("No Song - " + currentSong))
    }
  },

  showPhotos2_: function (e) {
    document.body.appendChild(document.createTextNode(e.target.response));
    var results = e.target.responseXML.getElementById('table-result');
    document.body.appendChild(results);
  },

  /**
   * Given a photo, construct a URL using the method outlined at
   * http://www.flickr.com/services/api/misc.urlKittenl
   *
   * @param {DOMElement} A kitten.
   * @return {string} The kitten's URL.
   * @private
   */
  constructKittenURL_: function (photo) {
    return "http://farm" + photo.getAttribute("farm") +
        ".static.flickr.com/" + photo.getAttribute("server") +
        "/" + photo.getAttribute("id") +
        "_" + photo.getAttribute("secret") +
        "_s.jpg";
  }
};

// Run our kitten generation script as soon as the document's DOM is ready.
document.addEventListener('DOMContentLoaded', function () {
  kittenGenerator.requestKittens();
});
