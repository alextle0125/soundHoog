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

  var playTrackUserButton = $('a.play-track');

  playTrackUserButton.click(function(event){
    event.preventDefault();
    var playlistContainer = document.getElementById('playlists-container');
    var trackContainer = $('div.playlist-container');
    var videoPlayer = document.getElementById('video-player');
    var volumeControl = document.getElementById('volume-box');
    var video = $('video#video');
    var videoTag = document.getElementById('video');

    var fileExt = event.target.pathname.match(/.{3}$/);
    if(fileExt != null && fileExt[0] === "mp4"){
      playlistContainer.style.position = 'absolute';
      playlistContainer.style.left = '50%';
      playlistContainer.style.top = '25%';
      playlistContainer.style.width = '45%';    
      playlistContainer.style.paddingLeft = '15px';
      trackContainer.css('width','30%');
      videoPlayer.style.left = '1%';
      videoPlayer.style.height = '55%';
      volumeControl.style.top = '5';
      videoTag.style.width = '95%';
      videoTag.src = event.target.pathname;
      renderVideoPlayer();
    } else if(fileExt[0] === "wav" || fileExt[0] === "mp3"){
      videoPlayer.style.height = '2em';
      volumeControl.style.top = '5';
      videoTag.style.width = '0%';
      videoTag.src = event.target.pathname;
      renderVideoPlayer();
    }    
  })
})

$(document).ready(function(){
  var playListUserButton = $('a.play-playlist');

  playListUserButton.click(function(event){
    event.preventDefault();
    var playlistContainer = document.getElementById('playlists-container');
    var trackContainer = $('div.playlist-container');
    var videoPlayer = document.getElementById('video-player');
    var volumeControl = document.getElementById('volume-box');
    var video = $('video#video');
    var videoTag = document.getElementById('video');
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
      if(fileExt != null && fileExt[0] === "mp4"){            playlistContainer.style.position = 'absolute';
        playlistContainer.style.left = '50%';
        playlistContainer.style.top = '25%';
        playlistContainer.style.width = '45%';    
        playlistContainer.style.paddingLeft = '15px';
        trackContainer.css('width','30%');
        videoPlayer.style.left = '1%';
        videoPlayer.style.height = '55%';
        volumeControl.style.top = '5';
        videoTag.style.width = '95%';
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
  if(window.location.pathname === "/playlists/new"){
    renderVideoPlayer();
  }
})

// $(document).ready(function(){
//   var displayPlaylist = document.getElementById('playlist-button');
//   var list = $('div#list-of-tracks');
//   var video = $('video#video');
//   if(displayPlaylist != null) {
//     displayPlaylist.addEventListener("click", function(event){
//       list.empty();
//       list.css('top',event.pageY);
//       list.css('left',event.pageX);
//       list.css('visibility', 'visible');
//       var video = $('video#video');
//       var listOfTracks = video.children();
//       for(i = 0; i < listOfTracks.length; i++){
//         $('div#list-of-tracks').append("<h3 style='height 12px; margin: 0; border-bottom: 1px solid #999;'>" + listOfTracks[i].src.match(/videos\/(.*)\./) + "</h3>");
//       }
//       list.click(function(e){
//         console.log(e)
//         list.css('visibility', 'hidden');
//       })
//     })
//   }
// })


