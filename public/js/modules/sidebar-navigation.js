$(document).ready(function(){

  var matchUserPath = window.location.pathname.match(/\/users\//);
  var matchInboxPath = window.location.pathname.match(/\/inbox/);
  var matchSwampPath = window.location.pathname.match(/\/theswamp/);
  var matchHoogPath = window.location.pathname.match(/\/thehoog/);
  var matchCommunityPath = window.location.pathname.match(/\/community/);
  var sideBarNav = document.getElementsByClassName('side-bar-options');
  var body = $('body');

  if(matchSwampPath != null){
    for(i=0; i < sideBarNav.length; i++){
      if(sideBarNav[i].innerText === "the swamp"){
        sideBarNav[i].style.color = "#FE7B13";
      }
    }
  }

  if(matchUserPath != null){
    var sideBarNav = document.getElementsByClassName('side-bar-options');
    for(i=0; i < sideBarNav.length; i++){
      if(sideBarNav[i].innerText === "user"){
        sideBarNav[i].style.color = "#FE7B13";
      }
    }
  }

  if(matchInboxPath != null){
    for(i=0; i < sideBarNav.length; i++){
      if(sideBarNav[i].innerText === "user"){
        sideBarNav[i].style.color = "#999";
      }

      if(sideBarNav[i].innerText === "inbox"){
        sideBarNav[i].style.color = "#FE7B13";
      }
    }
  }

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