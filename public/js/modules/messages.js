function inboxDeleteTrack(path) {
  var message = confirm("Are you sure you want to remove this track? \n\nThis will remove every repeated occurance of this track from your inbox regardless of sender.");
  if(message === true) {
    window.location = path;
  }
}

function inboxDeletePlaylist(path) {
  var message = confirm("Are you sure you want to remove this playlist? \n\nThis will remove every repeated occurance of this playlist from your inbox regardless of sender.");
  if(message === true) {
    window.location = path;
  }
}

function removePlaylistMessage(path) {
  var message = confirm("Are you sure you want to remove this playlist? \n\nThis will remove every repeated occurance of this playlist unless you are the original author of the playlist. All other copies of this playlist aside from the original - regardless of song variety, will be removed. The original copy can be removed when commiting another removal of the playlist.");
  if(message === true) {
    window.location = path;
  }
}

function deletePlaylistMessage(path) {
  var message = confirm("Are you sure you want to delete this playlist from thehoog? \n\nThis will entirely delete the playlist from thehoog application.");
  if(message === true) {
    window.location = path;
  }
}

function deleteTrackMessage(path) {
  var message = confirm("Are you sure you want to delete this track from thehoog? \n\nThis will entirely delete the track from thehoog application.");
  if(message === true) {
    window.location = path;
  }
}

function shareForm(path) {
  var formContainer = $('div#playlist-selection-container');
  var fogScreen = $('.fog');
  formContainer.empty();
  fogScreen.css('visibility','visible');
  formContainer.css('visibility','visible');
  formContainer.append("<h1 style='color: #FE7B13; text-align: center'>Share this with a friend</h1><form name='share' action='" + path + 
    "' method='POST'><input class='form-field' type='text' name='email' placeholder='Your friends e-mail' required><br><textarea class='text-box' name='message' placeholder='Send it with a message' cols='50' rows='10'></textarea><br><input class='sound_button-nav' type='submit' value='Submit'></form>")
  fogScreen.click(function(event){
    location.reload();
  })
}