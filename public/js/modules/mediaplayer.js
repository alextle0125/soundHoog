function renderVideoPlayer() {
  var playlistContainer = document.getElementById('playlists-container');
  var trackContainer = $('div.playlist-container');
  var video = document.getElementById('video');
  var videoPlayer = document.getElementById('video-player');
  var draggableTitle = document.getElementById('draggable');
  var playHead = document.getElementById('playhead');
  var playButton = document.getElementById('play-button');
  var seekableTimeline = document.getElementById('timeline');
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
  var shuffleButton = document.getElementById('shuffle-button');

  var sourcePath = video.currentSrc;
  if(sourcePath != undefined){
    var fileExt = sourcePath.match(/.{3}$/);
  }
  if (playButton != null) {
    playButton.className = ""
    playButton.className = "pause"
    video.className = ""
    video.className = "off"
    if(fileExt != null){
      if(fileExt[0] === "mp4"){
        videoPlayer.style.height = '55%';
        volumeControl.style.top = '5';
        video.style.width = '95%';
      } else if (fileExt[0] === "wav" || fileExt[0] === "mp3") {
        videoPlayer.style.height = '2em';
        volumeControl.style.top = '5';
        video.style.width = '0%';
      }
    }
  }

  fullScreen.addEventListener("click", function(event){
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

  seekableTimeline.addEventListener("mousedown", function(event){
    var playPercent = event.offsetX / event.currentTarget.clientWidth;
    playHead.style.marginLeft = 100 * playPercent + "%";
    video.currentTime = playPercent * video.duration;
  })

  var mediaPlayer = $('video#video');
  shuffleButton.addEventListener("click", function(event){
    var listOfTracks = mediaPlayer.children();
    var list = []
    for(i = 0; i < listOfTracks.length; i++){
      if(listOfTracks[i].src.match(/.*(\/uploads\/.*)/) != null) {
        list.push(listOfTracks[i].src.match(/.*(\/uploads\/.*)/)[1]);
      }
    }
    list.sort(function(){ return 0.5 - Math.random() });
    mediaPlayer.empty()
    for(i = 0; i < list.length; i++){
      mediaPlayer.append("<source id='" + (i + 1) + "' src='" + list[i] + "'>")
    }
    video.currentTime = 0;
    var fileExt = video.currentSrc.match(/.{3}$/);
    if(fileExt != null && fileExt[0] === "mp4"){
      videoPlayer.style.left = '1%';
      videoPlayer.style.height = '55%';
      volumeControl.style.top = '5';
      video.style.width = '95%';
    } else if(fileExt[0] === "wav" || fileExt[0] === "mp3"){
      videoPlayer.style.height = '2em';
      volumeControl.style.top = '5';
      video.style.width = '0%';
    }
    video.play();
    renderVideoPlayer();
  })

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
  playButton.addEventListener("click", function(){
    if(playButton.className === "play" && video.className === "on") {
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
  })

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