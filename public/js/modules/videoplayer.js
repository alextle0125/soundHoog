function renderVideoPlayer(){
  startVideoPlayer();
  draggableVideoPlayer();
  timeUpdateVideoPlayer();
  seekableVideoPlayer();
  fullScreenModeVideoPlayer();
  volumeVideoPlayer();
  loadVideoPlayer();
}

function draggableVideoPlayer() {
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

function startVideoPlayer() {
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
}

function timeUpdateVideoPlayer() {
  var video = document.getElementById('video');
  var playHead = document.getElementById('playhead');
  var playButton = document.getElementById('play-button');

  if (video != null) {
    video.addEventListener("timeupdate", function(){
      var playPercent = 100 * (video.currentTime / video.duration);
      if(playPercent <= 96){
        playHead.style.marginLeft = playPercent + "%";    
      } else if (playPercent >= 96) {
        playHead.style.marginLeft = 96 + "%";
      }
      if(video.currentTime === video.duration){
        video.className = ""
        video.className = "on"
        playButton.className = ""
        playButton.className = "play"
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

function loadVideoPlayer() {
  var video = document.getElementById('video');
  var source = $('source');
  var videoPlayer = document.getElementById('video-player');
  var playButton = document.getElementById('play-button');
  var volumeControl = document.getElementById('volume-box');
  // var loadVideo = $('form#upload');
  var sourcePath = source.attr('src');
  if(sourcePath != undefined){
    var fileExt = sourcePath.match(/\.(.*)/)[0];
  }
  // video.canPlayType('video/mp4');
  // video.canPlayType('video/mp3');
  // video.canPlayType('video/wav');
  // video.controls = false;
  // loadVideo.submit(function(event){
    // event.preventDefault();
    // var fileName = event.target[2].files[0].name
    // var fileExt = fileName.match(/\.(.*)/)[0]
    // video.src = "/uploads/" + fileName
    // video.load()
    if (playButton != null) {
      playButton.className = ""
      playButton.className = "play"
      video.className = ""
      video.className = "off"
      if(fileExt === ".mp4"){
        videoPlayer.style.height = '55%';
        volumeControl.style.top = '5';
        video.style.width = '95%';
      } else if(fileExt === ".wav" || fileExt === ".mp3"){
        videoPlayer.style.height = '2em';
        volumeControl.style.top = '5';
        video.style.width = '0%';
      }
    }
  // })
}

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