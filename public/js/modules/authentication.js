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