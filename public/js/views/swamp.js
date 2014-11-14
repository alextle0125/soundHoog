$(document).ready(function(){

	if(window.location.pathname === "/theswamp"){
		var sideBarNav = document.getElementsByClassName('side-bar-options');
		for(i=0; i < sideBarNav.length; i++){
			if(sideBarNav[i].innerText === "the swamp"){
				sideBarNav[i].style.color = "#FE7B13";
			}
		}
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
		    playlistContainer.style.top = '25%';
		    playlistContainer.style.width = '45%';
		    playlistContainer.style.height = '70%';
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
		    playlistContainer.style.top = '25%';
		    playlistContainer.style.width = '45%';
		    playlistContainer.style.height = '70%';
		    playlistContainer.style.paddingLeft = '15px';
		    trackContainer.css('width','30%');
		  } else {
		    videoPlayer.style.height = '2em';
		    volumeControl.style.top = '5';
		    video.style.width = '0%';
		  }
		  video.play();
		})
	}
})