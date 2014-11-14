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

function renderVideoPlayer() {
  timeUpdateVideoPlayer();
  seekableVideoPlayer();
  fullScreenModeVideoPlayer();
  volumeVideoPlayer();
  // loadVideoPlayer();
}


function timeUpdateVideoPlayer() {
  var playlistContainer = document.getElementById('playlists-container');
  var trackContainer = $('div.playlist-container');
  var video = document.getElementById('video');
  var videoPlayer = document.getElementById('video-player');
  var playHead = document.getElementById('playhead');
  var playButton = document.getElementById('play-button');
  var volumeControl = document.getElementById('volume-box');

  if (video != null) {
    i = 0
    video.addEventListener("timeupdate", function(){
      var playPercent = 100 * (video.currentTime / video.duration);
      if(playPercent <= 96){
        playHead.style.marginLeft = playPercent + "%";    
      } else if (playPercent >= 96) {
        playHead.style.marginLeft = 96 + "%";
      }
      
      if(video.currentTime === video.duration){
          var videoSources = $('source');
          if(i < videoSources.length) {
            i += 1
            video.src = videoSources[i].src;
            var sourcePath = video.src;
            if(sourcePath != undefined){
              var fileExt = sourcePath.match(/.{3}$/);
            }
            if(fileExt != null && fileExt[0] === "mp4"){
              videoPlayer.style.left = '1%';
              videoPlayer.style.height = '55%';
              volumeControl.style.top = '5';
              video.style.width = '95%';
              playlistContainer.style.position = 'absolute';
              playlistContainer.style.left = '50%';
              playlistContainer.style.top = '25%';
              playlistContainer.style.width = '45%';
            
              playlistContainer.style.paddingLeft = '15px';
              trackContainer.css('width','30%');
            } else if(fileExt[0] === "wav" || fileExt[0] === "mp3"){
              videoPlayer.style.height = '2em';
              volumeControl.style.top = '5';
              video.style.width = '0%';
            }
            video.load();
            video.play();
          }
      }
    },false);
  }
}

function seekableVideoPlayer() {
  var video = document.getElementById('video');
  var playButton = document.getElementById('play-button');
  var playHead = document.getElementById('playhead');
  var seekableTimeline = document.getElementById('timeline');

  if (seekableTimeline != null) {
    seekableTimeline.addEventListener("mousedown", function(event){
      var playPercent = event.offsetX / event.currentTarget.clientWidth;
      playHead.style.marginLeft = 100 * playPercent + "%";
      video.currentTime = playPercent * video.duration;
    })
  }
}

function volumeVideoPlayer() {
    var volumeControl = document.getElementById('volume-box');
    var fullScreen = document.getElementById('fullscreen-button');
    var volumeBar1 = document.getElementById('eight');
    var volumeBar2 = document.getElementById('seven');
    var volumeBar3 = document.getElementById('six');
    var volumeBar4 = document.getElementById('five');
    var volumeBar5 = document.getElementById('four');
    var volumeBar6 = document.getElementById('three');
    var volumeBar7 = document.getElementById('two');
    var volumeBar8 = document.getElementById('one');

    if (volumeControl != null) {
      volumeControl.addEventListener("mouseup", function(event){
      if (event.layerX >= 5 && event.layerX < 10) {
        volumeBar8.style.visibility = "hidden";
        volumeBar7.style.visibility = "hidden";
        volumeBar6.style.visibility = "hidden";
        volumeBar5.style.visibility = "hidden";
        volumeBar4.style.visibility = "hidden";
        volumeBar3.style.visibility = "hidden";
        volumeBar2.style.visibility = "hidden";
        volumeBar1.style.visibility = "hidden";
        video.volume = 0;     
      } else if (event.layerX >= 10 && event.layerX < 15) {
        volumeBar8.style.visibility = "hidden";
        volumeBar7.style.visibility = "hidden";
        volumeBar6.style.visibility = "hidden";
        volumeBar5.style.visibility = "hidden";
        volumeBar4.style.visibility = "hidden";
        volumeBar3.style.visibility = "hidden";
        volumeBar2.style.visibility = "hidden";
        volumeBar1.style.visibility = "visible";
        video.volume = 0.125;
      } else if (event.layerX >= 15 && event.layerX < 20) {
        volumeBar8.style.visibility = "hidden";
        volumeBar7.style.visibility = "hidden";
        volumeBar6.style.visibility = "hidden";
        volumeBar5.style.visibility = "hidden";
        volumeBar4.style.visibility = "hidden";
        volumeBar3.style.visibility = "hidden";
        volumeBar2.style.visibility = "visible";
        volumeBar1.style.visibility = "visible";
        video.volume = 0.250;
      } else if (event.layerX >= 20 && event.layerX < 25) {
        volumeBar8.style.visibility = "hidden";
        volumeBar7.style.visibility = "hidden";
        volumeBar6.style.visibility = "hidden";
        volumeBar5.style.visibility = "hidden";
        volumeBar4.style.visibility = "hidden";
        volumeBar3.style.visibility = "visible";
        volumeBar2.style.visibility = "visible";
        volumeBar1.style.visibility = "visible";
        video.volume = 0.375;
      } else if (event.layerX >= 25 && event.layerX < 30) {
        volumeBar8.style.visibility = "hidden";
        volumeBar7.style.visibility = "hidden";
        volumeBar6.style.visibility = "hidden";
        volumeBar5.style.visibility = "hidden";
        volumeBar4.style.visibility = "visible";
        volumeBar3.style.visibility = "visible";
        volumeBar2.style.visibility = "visible";
        volumeBar1.style.visibility = "visible";
        video.volume = 0.5;
      } else if (event.layerX >= 30 && event.layerX < 35) {
        volumeBar8.style.visibility = "hidden";
        volumeBar7.style.visibility = "hidden";
        volumeBar6.style.visibility = "hidden";
        volumeBar5.style.visibility = "visible";
        volumeBar4.style.visibility = "visible";
        volumeBar3.style.visibility = "visible";
        volumeBar2.style.visibility = "visible";
        volumeBar1.style.visibility = "visible";
        video.volume = 0.625;
      } else if (event.layerX >= 35 && event.layerX < 40) {
        volumeBar8.style.visibility = "hidden";
        volumeBar7.style.visibility = "hidden";
        volumeBar6.style.visibility = "visible";
        volumeBar5.style.visibility = "visible";
        volumeBar4.style.visibility = "visible";
        volumeBar3.style.visibility = "visible";
        volumeBar2.style.visibility = "visible";
        volumeBar1.style.visibility = "visible";
        video.volume = 0.75;
      } else if (event.layerX >= 40 && event.layerX < 45) {
        volumeBar8.style.visibility = "hidden";
        volumeBar7.style.visibility = "visible";
        volumeBar6.style.visibility = "visible";
        volumeBar5.style.visibility = "visible";
        volumeBar4.style.visibility = "visible";
        volumeBar3.style.visibility = "visible";
        volumeBar2.style.visibility = "visible";
        volumeBar1.style.visibility = "visible";
        video.volume = 0.875;
      } else if (event.layerX >= 45) {
        volumeBar8.style.visibility = "visible";
        volumeBar7.style.visibility = "visible";
        volumeBar6.style.visibility = "visible";
        volumeBar5.style.visibility = "visible";
        volumeBar4.style.visibility = "visible";
        volumeBar3.style.visibility = "visible";
        volumeBar2.style.visibility = "visible";
        volumeBar1.style.visibility = "visible";
        video.volume = 1;
      } 
    })
  }
}

// function loadVideoPlayer() {
//   var video = document.getElementById('video');
//   var source = $('source');
//   var videoPlayer = document.getElementById('video-player');
//   var playButton = document.getElementById('play-button');
//   var volumeControl = document.getElementById('volume-box');
//   var sourcePath = source.attr('src');
//   if(sourcePath != undefined){
//     var fileExt = sourcePath.match(/.{3}$/);
//   }
//   if (playButton != null) {
//     playButton.className = ""
//     playButton.className = "pause"
//     video.className = ""
//     video.className = "off"
//     if(fileExt === "mp4" && fileExt != null){
//       videoPlayer.style.height = '55%';
//       volumeControl.style.top = '5';
//       video.style.width = '95%';
//     } else if((fileExt === "wav" && fileExt != null) || (fileExt === "mp3" && fileExt != null)) {
//       videoPlayer.style.height = '2em';
//       volumeControl.style.top = '5';
//       video.style.width = '0%';
//     }
//   }
// }

function fullScreenModeVideoPlayer() {
  var video = document.getElementById('video');
  var fullScreenButton = document.getElementById('fullscreen-button');

  if (fullScreenButton != null) {
    fullScreenButton.addEventListener("click", function(event){
      if(video.webkitRequestFullscreen) {
        video.webkitRequestFullscreen()
      }
      // if(video.requestFullscreen) {
      //   video.requestFullscreen();
      // } else if (video.msRequestFullscreen) {
      //   video.msRequestFullscreen();
      // } else if (video.mozRequestFullscreen) {
      //   video.mozRequestFullscreen();
      // } else if (video.webkitRequestFullscreen) {
      //   video.webkitRequestFullscreen();
      // }
    })
  }
}

$(document).ready(function(){

  if(window.location.pathname === "/"){
    body = $('body');
    container = $('div#container');
    searchForm = $('form#search');
    playList = $('div#playlist');
    sideBarNav = $('div#side-bar-nav a');

    authHog = $('#auth-hog');
    introduction = $('#intro')
    fogScreen = $('.fog');
    formHeader = $('.form-header');
    authFormContainer = $('.form');

    body.css('background', '#fff');
    container.css('background', '#fff');
    sideBarNav.css('background', '#666');
    sideBarNav.css('color', '#FE7B13');
    sideBarNav.css('border', '1px solid #999');

    authHog.click(function(event){
      fogScreen.css('visibility', 'visible');
      formHeader.css('visibility', 'visible');
      authFormContainer.css('visibility', 'visible');
    })

    fogScreen.click(function(event){
      fogScreen.css('visibility', 'hidden');
      formHeader.css('visibility', 'hidden');
      authFormContainer.css('visibility', 'hidden');   
    })
  }
});

$(document).click(function(event){
  if(event.toElement.className === "track"){
    trackUrl = event.toElement.id;
    var videoPlayer = $('div#player');
    videoPlayer.empty();
    videoPlayer.append("<object id='sc-player' height='100%' width='100%'><param id='load-player' name='movie' value='http://player.soundcloud.com/player.swf?url=" + trackUrl + "&enable_api=true&object_id=yourPlayerId&auto_play=true&enable_api=true'></param><param name='allowscriptaccess' value='always'></param><embed src='http://player.soundcloud.com/player.swf?{ ADD YOUR PARAMETERS HERE }&url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F293' allowscriptaccess='always' height='81'  type='application/x-shockwave-flash' width='100%'></embed></object>");
  } else if (event.toElement.className === "sound_login_button"){
    var loginForm = $('form#login');
    var errorMessage = $('p#login');
    loginForm.submit(function(event){
      event.preventDefault();
      errorMessage.css('opacity', '1');
      
      $.ajax('/login', {
        type: 'POST',
        data: loginForm.serialize(),
        dataType: "JSON"
      }).done(function(data){
        if(data[0]["key"] === false && data[0]["user"] === false){
          authFormContainer.animate({
            'left': 15,
          }, 5 ).animate({
            'left': -15,
          }, 5).animate({
            'left': 15,
          }, 5).animate({
            'left': 0,
          }, 5)
          errorMessage[0].innerText = "Invalid e-mail address"
          errorMessage.animate({'opacity': '0.5'}, 700);
        } else if (data[0]["key"] === false && data[0]["user"] === true){
          authFormContainer.animate({
            'left': 15,
          }, 5 ).animate({
            'left': -15,
          }, 5).animate({
            'left': 15,
          }, 5).animate({
            'left': 0,
          }, 5)
          errorMessage[0].innerText = "Invalid password" 
          errorMessage.animate({'opacity': '0.5'}, 700);         
        } else if (data[0]["key"] === true){
          // fogScreen.css('visibility', 'hidden');
          // authFormContainer.css('visibility', 'hidden');
          // formHeader.css('visibility', 'hidden');
          // introduction.css('margin', '0');
          // authHog.css('height', '0');
          // authHog.css('margin', '0');
          // authHog.css('visibility', 'hidden');
          window.location.replace("/");
        }
      })
    });   
  } else if (event.toElement.className == "sound_signup_button"){
    var signupForm = $('form#signup');
    var errorMessage = $('p#signup');
    signupForm.submit(function(event){
      event.preventDefault();
      errorMessage.css('opacity', '1');

      $.ajax('/signup', {
        type: 'POST',
        data: signupForm.serialize(),
        dataType: "JSON"
      }).done(function(data){
        if(data[0]["key"] === false && data[0]["user"] === true){
          authFormContainer.animate({
            'left': 15,
          }, 5 ).animate({
            'left': -15,
          }, 5).animate({
            'left': 15,
          }, 5).animate({
            'left': 0,
          }, 5)
          errorMessage[0].innerText = "E-mail account already taken";
          errorMessage.animate({'opacity': '0.5'}, 700);
        } else if (data[0]["key"] === false && data[0]["user"] === false && data[0]["password"] === true){
          authFormContainer.animate({
            'left': 15,
          }, 5 ).animate({
            'left': -15,
          }, 5).animate({
            'left': 15,
          }, 5).animate({
            'left': 0,
          }, 5)
          errorMessage[0].innerText = "Invalid e-mail address"
          errorMessage.animate({'opacity': '0.5'}, 700);
        } else if (data[0]["key"] === false && data[0]["user"] === false && data[0]["password"] === false){
          authFormContainer.animate({
            'left': 15,
          }, 5 ).animate({
            'left': -15,
          }, 5).animate({
            'left': 15,
          }, 5).animate({
            'left': 0,
          }, 5)
          errorMessage[0].innerText = "Password must be at least 8 characters"
          errorMessage.animate({'opacity': '0.5'}, 700);
        } else if(data[0]["key"] === true){
          // fogScreen.css('visibility', 'hidden');
          // authFormContainer.css('visibility', 'hidden');
          // formHeader.css('visibility', 'hidden');
          // introduction.css('margin', '0');
          // authHog.css('height', '0');
          // authHog.css('margin', '0');
          // authHog.css('visibility', 'hidden');
          window.location.replace("/");
        }
      })
    })
  }
})

$(document).ready(function(){
  var matchTrackPath = window.location.pathname.match(/\/tracks\//);
  if(matchTrackPath != null){
    var playTrack = $('a.play-track');
    var video = document.getElementById('video');
    var playButton = document.getElementById('play-button');
    playTrack.click(function(event){
      event.preventDefault();
      video.currentTime = 0;
      video.play();
    })
  }
})

$(document).ready(function(){
  if(window.location.pathname === "/upload"){
    var playTrack = $('a.play-track');
    var video = document.getElementById('video');
    playTrack.click(function(event){
      event.preventDefault();
      video.currentTime = 0;
      video.play();
    })
  }
})

$(document).ready(function(){

  if(window.location.pathname === "/theswamp"){
    var sideBarNav = document.getElementsByClassName('side-bar-options');
    for(i=0; i < sideBarNav.length; i++){
      if(sideBarNav[i].innerText === "the swamp"){
        sideBarNav[i].style.color = "#FE7B13";
      }
    }

    var defaultPlayTrack = $('a.default-play-track');
    var playTrack = $('a.play-track');
    var video = document.getElementById('video');
    var videoPlayer = document.getElementById('video-player');
    var playButton = document.getElementById('play-button');
    var volumeControl = document.getElementById('volume-box');
    var playlistContainer = document.getElementById('playlists-container');
    var trackContainer = $('div.playlist-container');

    defaultPlayTrack.click(function(event){
      event.preventDefault();
      var trackPath = event.target.href;
      var mp4FileExt = trackPath.match(/.mp4/);
      video.src = trackPath;
      video.load();
      if(mp4FileExt != null && mp4FileExt[0] === ".mp4"){
        videoPlayer.style.height = '55%';
        volumeControl.style.top = '5';
        video.style.width = '95%';
        trackContainer.css('width','30%');
      } else {
        videoPlayer.style.height = '2em';
        volumeControl.style.top = '5';
        video.style.width = '0%';
      }
      video.play();
      playButton.className = "";
      playButton.className = "pause";
    })
    playTrack.click(function(event){
      event.preventDefault();
      var trackPath = event.target.href;
      var mp4FileExt = trackPath.match(/.mp4/);
      video.src = trackPath;
      video.load();
      if(mp4FileExt != null && mp4FileExt[0] === ".mp4"){
        videoPlayer.style.height = '55%';
        volumeControl.style.top = '5';
        video.style.width = '95%';
        trackContainer.css('width','30%');
      } else {
        videoPlayer.style.height = '2em';
        volumeControl.style.top = '5';
        video.style.width = '0%';
      }
      video.play();
      playButton.className = "";
      playButton.className = "pause";
    })
  }
})

$(document).ready(function(){

  var matchUserPath = window.location.pathname.match(/\/users\//);

  if(matchUserPath != null){
    renderVideoPlayer();

    var sideBarNav = document.getElementsByClassName('side-bar-options');
    for(i=0; i < sideBarNav.length; i++){
     if(sideBarNav[i].innerText === "user"){
       sideBarNav[i].style.color = "#FE7B13";
     }
    }
  }
})

$(document).ready(function(){

  var matchInboxPath = window.location.pathname.match(/\/inbox/);

  if(matchInboxPath != null){
    renderVideoPlayer();
    var playTrack = $('a.play-track');
    var video = document.getElementById('video');
    var videoPlayer = document.getElementById('video-player');
    var playButton = document.getElementById('play-button');
    var volumeControl = document.getElementById('volume-box');
    var playlistContainer = document.getElementById('playlists-container');
    var trackContainer = $('div.playlist-container');

    var sideBarNav = document.getElementsByClassName('side-bar-options');
    for(i=0; i < sideBarNav.length; i++){
      if(sideBarNav[i].innerText === "user"){
       sideBarNav[i].style.color = "#999";
      }

     if(sideBarNav[i].innerText === "inbox"){
       sideBarNav[i].style.color = "#FE7B13";
     }
    }

    playTrack.click(function(event){
      event.preventDefault();
      var trackPath = event.target.href;
      var mp4FileExt = trackPath.match(/.mp4/);
      video.src = trackPath;
      video.load();
      if(mp4FileExt != null && mp4FileExt[0] === ".mp4"){
        videoPlayer.style.height = '55%';
        volumeControl.style.top = '5';
        video.style.width = '95%';
        trackContainer.css('width','30%');
      } else {
        videoPlayer.style.height = '2em';
        volumeControl.style.top = '5';
        video.style.width = '0%';
      }
      video.play();
      playButton.className = "";
      playButton.className = "pause";
    })
  }
})


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

$(document).ready(function(){
  var playlistContainer = document.getElementById('playlists-container');
  var trackContainer = $('div.playlist-container');
  var playListUserButton = $('a.play-track');
  var playListDefaultButton = $('a.default-play-playlist');
  var videoPlayer = document.getElementById('video-player');
  var volumeControl = document.getElementById('volume-box');
  var video = $('video#video');
  var videoTag = document.getElementById('video');

  playListUserButton.click(function(event){
    event.preventDefault();
    video.empty();

    $.ajax(event.target.pathname, {
      type: 'GET',
    }).done(function(data){
      var playListTracks = data.split(",");
      for(i = 0; i < playListTracks.length; i++){
        video.append("<source id='" + (i + 1) + "' src='" + playListTracks[i] + "'>")
      }
      videoTag.src = playListTracks[0];
      var fileExt = playListTracks[0].match(/.{3}$/);
      if(fileExt != null && fileExt[0] === "mp4"){
        videoPlayer.style.left = '1%';
        videoPlayer.style.height = '55%';
        volumeControl.style.top = '5';
        videoTag.style.width = '95%';
        playlistContainer.style.position = 'absolute';
        playlistContainer.style.left = '50%';
        playlistContainer.style.top = '25%';
        playlistContainer.style.width = '45%';
        playlistContainer.style.paddingLeft = '15px';
        trackContainer.css('width','30%');
        renderVideoPlayer();
      } else if(fileExt[0] === "wav" || fileExt[0] === "mp3"){
        videoPlayer.style.height = '2em';
        volumeControl.style.top = '5';
        videoTag.style.width = '0%';
        renderVideoPlayer();
      }    
    })
  })

  playListDefaultButton.click(function(event){
    event.preventDefault();
    video.empty();

    $.ajax(event.target.pathname, {
      type: 'GET',
    }).done(function(data){
      var playListTracks = data.split(",");
      for(i = 0; i < playListTracks.length; i++){
        video.append("<source id='" + (i + 1) + "' src='" + playListTracks[i] + "'>")
      }
      videoTag.src = playListTracks[0];
      var fileExt = playListTracks[0].match(/.{3}$/);
      if(fileExt != null && fileExt[0] === "mp4"){
        videoPlayer.style.left = '1%';
        videoPlayer.style.height = '55%';
        volumeControl.style.top = '5';
        videoTag.style.width = '95%';
        playlistContainer.style.position = 'absolute';
        playlistContainer.style.left = '50%';
        playlistContainer.style.top = '25%';
        playlistContainer.style.width = '45%';
        playlistContainer.style.paddingLeft = '15px';
        trackContainer.css('width','30%');
        renderVideoPlayer(); 
      } else if(fileExt[0] === "wav" || fileExt[0] === "mp3"){
        videoPlayer.style.height = '2em';
        volumeControl.style.top = '5';
        videoTag.style.width = '0%';
        renderVideoPlayer(); 
      }    
    })  
  })
})

$(document).ready(function(){
  var displayPlaylist = document.getElementById('playlist-button');
  var list = $('div#list-of-tracks');
  var video = $('video#video');
  if(displayPlaylist != null) {
    displayPlaylist.addEventListener("click", function(event){
      list.empty();
      list.css('top',event.pageY);
      list.css('left',event.pageX);
      list.css('visibility', 'visible');
      var video = $('video#video');
      var listOfTracks = video.children();
      for(i = 0; i < listOfTracks.length; i++){
        $('div#list-of-tracks').append("<h3 style='height 12px; margin: 0; border-bottom: 1px solid #999;'>" + listOfTracks[i].src.match(/videos\/(.*)\./) + "</h3>");
      }
      list.click(function(e){
        console.log(e)
        list.css('visibility', 'hidden');
      })
    })
  }
})

$(document).ready(function(){ 
  var matchUserPath = window.location.pathname.match(/\/users\//);
  var matchInboxPath = window.location.pathname.match(/\/inbox/);
  var matchCommunityPath = window.location.pathname.match(/\/community/);

  if(matchUserPath != null || matchInboxPath != null || matchCommunityPath != null){
    var playlistContainer = document.getElementById('playlists-container');
    var trackContainer = $('div.playlist-container');
    var shuffleButton = document.getElementById('shuffle-button');
    var videoPlayer = document.getElementById('video-player');
    var volumeControl = document.getElementById('volume-box');
    var movie = document.getElementById('video');
    var video = $('video#video');
    if(shuffleButton != null) {
      shuffleButton.addEventListener("click", function(event){
        var listOfTracks = video.children();
        var list = []
        for(i = 0; i < listOfTracks.length; i++){
          if(listOfTracks[i].src.match(/.*(\/uploads\/.*)/) != null) {
            list.push(listOfTracks[i].src.match(/.*(\/uploads\/.*)/)[1]);
          }
        }
        list.sort(function(){ return 0.5 - Math.random() });
        video.empty()
        for(i = 0; i < list.length; i++){
          video.append("<source id='" + (i + 1) + "' src='" + list[i] + "'>")
        }
        movie.currentTime = 0;
        movie.load();
        var fileExt = movie.currentSrc.match(/.{3}$/);
        if(fileExt != null && fileExt[0] === "mp4"){
          videoPlayer.style.left = '1%';
          videoPlayer.style.height = '55%';
          volumeControl.style.top = '5';
          movie.style.width = '95%';
          playlistContainer.style.position = 'absolute';
          playlistContainer.style.left = '50%';
          playlistContainer.style.top = '25%';
          playlistContainer.style.width = '45%';
          playlistContainer.style.paddingLeft = '15px';
          trackContainer.css('width','30%');
        } else if(fileExt[0] === "wav" || fileExt[0] === "mp3"){
          videoPlayer.style.height = '2em';
          volumeControl.style.top = '5';
          movie.style.width = '0%';
        }
        movie.play();
        renderVideoPlayer();
      })
    }
  }
})

$(document).ready(function() {
  var matchHoogPath = window.location.pathname.match(/\/thehoog/);
  var matchCommunityPath = window.location.pathname.match(/\/community/);
  var body = $('body');
  var sideBarNav = document.getElementsByClassName('side-bar-options');

  if(matchHoogPath != null){    
    body.css('background', '#fff');
    for(i=0; i < sideBarNav.length; i++){
      sideBarNav[i].style.background = "#666";
      sideBarNav[i].style.color = "#fff";
      sideBarNav[i].style.border = "1px solid #999";
      if(sideBarNav[i].innerText === "the Hoog"){
        sideBarNav[i].style.color = "#FE7B13";
      }
    }
  }
  if(matchCommunityPath != null){
    for(i=0; i < sideBarNav.length; i++){
      if(sideBarNav[i].innerText === "community"){
        sideBarNav[i].style.color = "#FE7B13";
      }
    }
  }
})

$(document).ready(function() {
  var videoPlayer = document.getElementById('video-player');
  if(videoPlayer != null){
    renderVideoPlayer();
    var video = document.getElementById('video');
    var playButton = document.getElementById('play-button');

    if (playButton != null){
      playButton.addEventListener("click", function(){
      if (playButton.className === "play" && video.className === "on") {
          video.play();
          playButton.className = "";
          playButton.className = "pause";
          video.className = "";
          video.className = "off";
        } else if (playButton.className === "pause" && video.className === "off") {
          video.pause();
          playButton.className = "";
          playButton.className = "play";
          video.className = "";
          video.className = "on";
        } 
      });
    }
    var draggableTitle = document.getElementById('draggable');
    var videoPlayer = document.getElementById('video-player');
    if (draggableTitle != null) {
        draggableTitle.addEventListener("mousedown", function(event){
        videoPlayer.style.position = "absolute";
        $(document).mousemove(function(event){
          videoPlayer.style.left = event.pageX + "px";
          videoPlayer.style.top = event.pageY + "px";
        })
        $(document).click(function(e) {
          $(document).off("mousemove");
        })
      })
    }
  }
})
