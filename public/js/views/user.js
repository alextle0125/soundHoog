$(document).ready(function(){

	// Render Video Player
	var pathName = window.location.pathname.match(/.*(\d)/);
	if(pathName != null){
		var matchPathName = pathName[1];
		var userPath = parseInt(matchPathName);
		if(Number.isInteger(userPath) === true ){
		  renderVideoPlayer();
		}
	}

	var matchUserPath = window.location.pathname.match(/\/users\//)
	if(window.location.pathname[0] === "/users/"){

		// var sideBarNav = document.getElementsByClassName('side-bar-options');
		// for(i=0; i < sideBarNav.length; i++){
		// 	if(sideBarNav[i].innerText === "user"){
		// 		sideBarNav[i].style.color = "#FE7B13";
		// 	}
		// }

		renderVideoPlayer();
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
		    videoPlayer.style.left = '1%';
		    videoPlayer.style.height = '55%';
		    volumeControl.style.top = '5';
		    video.style.width = '95%';
		    playlistContainer.style.position = 'absolute';
		    playlistContainer.style.left = '50%';
		    playlistContainer.style.top = '20%';
		    playlistContainer.style.width = '45%';
		    playlistContainer.style.height = '75%';
		    playlistContainer.style.paddingLeft = '15px';
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
		  var fileExt = trackPath.match(/\.(.*)/)[0];
		  video.src = trackPath;
		  video.load();
		  if(fileExt === ".mp4"){
		    videoPlayer.style.height = '55%';
		    volumeControl.style.top = '5';
		    video.style.width = '95%';
		  } else if(fileExt === ".wav" || fileExt === ".mp3"){
		    videoPlayer.style.height = '2em';
		    volumeControl.style.top = '5';
		    video.style.width = '0%';
		  }
		  video.play();
		})
	}

})