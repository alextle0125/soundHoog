$(document).ready(function(){
  var addButton = $('a.add-track');
  var playlistSelection = $('div#playlist-selection-container');
  var playlistSelectionForm = $('form#playlist-selection');
  var playlistSubmit = $('input.sound_button-nav');
  var fogScreen = $('div.fog');
  if(addButton[0] != undefined){
    addButton.click(function(event){
      event.preventDefault();
       var playlists = $('div.playlist-container-selection');
      trackID = parseInt(event.target.pathname.match(/(\d+)/)[0]);
      fogScreen.css('visibility', 'visible');
      fogScreen.css('z-index', '99');
      playlistSelection.css('visibility', 'visible');
      playlistSubmit.prepend("<input style='visibility: hidden' type='text' name='track' value=" + trackID + "><br>");
      var checkNewPlaylistForm = document.getElementById('new-playlist');
      if(checkNewPlaylistForm === null){
        playlistSelection.append("<form id='new-playlist' name='new-playlist' action='/playlists/new' method='POST'><input style='visibility: hidden' type='text' name='track' value=" + trackID + "><br><input class='sound_button-nav' style='width: 250px' type='submit' value='Create a new Playlist'></form>");
      }
      playlists.click(function(event){
        for(i=0; i < playlists.length; i++){
          playlists[i].style.boxShadow = "none";
        }
        event.currentTarget.style.boxShadow = "0 0 3px 3px #8dcbff";
        event.currentTarget.previousElementSibling.setAttribute("checked", "true");
      })
    });
  }

  fogScreen.click(function(event){
    fogScreen.css('visibility', 'hidden');
    playlistSelection.css('visibility', 'hidden');  
  })
})