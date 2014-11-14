$(document).ready(function(){

  container = $('div#container');
  searchForm = $('form#search');
  playList = $('div#playlist');


  authHog = $('#auth-hog');
  introduction = $('#intro')
  fogScreen = $('.fog');
  formHeader = $('.form-header');
  authFormContainer = $('.form');

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

  searchForm.submit(function(event){
    event.preventDefault();
    container.children().remove();
    container.append("<div id='playlist'></div>");
    playList.children().remove();

    $.ajax('/hoog', {
      type: 'POST',
      data: searchForm.serialize(),
      dataType: "json"
    }).done(function(data){
      firstTrack = data[0].permalink_url.replace(":", "%3A");
      firstTrack = data[0].permalink_url.replace("/", "%2F");
      trackDuration = data[0].duration;
      for(i=0; i < data.length; i++){
        trackUrl = data[i].permalink_url.replace(":", "%3A");
        trackUrl = data[i].permalink_url.replace("/", "%2F");
        $('div#playlist').append("<div id='" + trackUrl + "' class='track' style='width: 300px; height: 525px; border: 1px solid #d5d5d5; background: #fff; cursor: pointer; margin-bottom: 20px; margin-right: 10px; padding: 15px; display: inline-block; vertical-align: top;'><img id='" + trackUrl + "' class='track' width='300px' style='display: inline-block;' src='" + data[i].artwork_url + "'><h2 id='" + trackUrl + "' class='track' style='display: inline-block; position: relative;'>" + data[i].user.username + "</h2><div style='height: 55px'><h4 id='" + trackUrl + "' class='track' style='display: block; position: relative; line-height: 20px; margin-top: 0px; margin-bottom: 15px;'>" + data[i].title + "</h4></div><img id='" + trackUrl + "' class='waveform' height='18%' width='100%' src='" + data[i].waveform_url + "'></img></div>")
      }
      var videoPlayer = $('div#player');
      videoPlayer.empty();
      videoPlayer.append("<object id='sc-player' height='100%' width='100%'><param id='load-player' name='movie' value='http://player.soundcloud.com/player.swf?url=" + firstTrack + "&enable_api=true&object_id=yourPlayerId&auto_play=true'></param><param name='allowscriptaccess' value='always'></param><embed src='http://player.soundcloud.com/player.swf?{ ADD YOUR PARAMETERS HERE }&url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F293' allowscriptaccess='always' height='81'  type='application/x-shockwave-flash' width='100%'></embed></object>");
    })
  })

});

$(document).click(function(event){
  if(event.toElement.className === "track"){
    trackUrl = event.toElement.id;
    var videoPlayer = $('div#player');
    videoPlayer.empty();
    videoPlayer.append("<object id='sc-player' height='100%' width='100%'><param id='load-player' name='movie' value='http://player.soundcloud.com/player.swf?url=" + trackUrl + "&enable_api=true&object_id=yourPlayerId&auto_play=true&enable_api=true'></param><param name='allowscriptaccess' value='always'></param><embed src='http://player.soundcloud.com/player.swf?{ ADD YOUR PARAMETERS HERE }&url=http%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F293' allowscriptaccess='always' height='81'  type='application/x-shockwave-flash' width='100%'></embed></object>");
  } else if (event.toElement.className === "sound_login_button"){
    var loginForm = $('form#login');
    loginForm.submit(function(event){
      event.preventDefault();
      
      $.ajax('/login', {
        type: 'POST',
        data: loginForm.serialize(),
        dataType: "JSON"
      }).done(function(data){
        if(data[0]["key"] === false){
          authFormContainer.animate({
            'left': 15,
          }, 5 ).animate({
            'left': -15,
          }, 5).animate({
            'left': 15,
          }, 5).animate({
            'left': 0,
          }, 5)
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
    signupForm.submit(function(event){
      event.preventDefault();

      $.ajax('/signup', {
        type: 'POST',
        data: signupForm.serialize(),
        dataType: "JSON"
      }).done(function(data){
        if(data[0]["key"] === false){
          authFormContainer.animate({
            'left': 15,
          }, 5 ).animate({
            'left': -15,
          }, 5 ).animate({
            'left': 15,
          }, 5 ).animate({
            'left': 0
          }, 5 )
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