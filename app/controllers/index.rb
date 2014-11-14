get '/' do
  if current_user
    redirect "/users/#{current_user.id}"
  else
    erb :'users/signin'
  end
end

post '/login' do
  @user = User.find_by_email(params[:email])
  if @user && @user.authenticate(params[:password])
    @pass = {}
    # @top_playlists = Playlist.all.order(share_count: :desc)
    @pass[0] = { "key" => true, "user" => @user.id }#, tracks: @top_playlists }
    # username = @user.email.scan(/(.*)@.*/)
    session[:user] = @user.id
    @pass.to_json
    # erb :'tracks/index'
  else
    @pass = {}
    if @user
      @pass[0] = { "key" => false, "user" => true }
      @pass.to_json
    else
      @pass[0] = { "key" => false, "user" => false }
      @pass.to_json
    end
    # erb :'tracks/index'
  end
end

post '/signup' do
  @user = User.new(email: params[:email], password: params[:password])
  if @user.save
    @username = @user.email.scan(/(.*)@.*/)[0][0]
    Pony.mail({
      :to => @user.email, :from => "no-reply@thehoog.com", :subject => 'Welcome to thehoog!', :html_body => "<html><body style='color: #000'><br/><h3 style='color: #FE7B13;'>Welcome to <span style='color: #bcbcbc; font-size: 14px'>the</span><span style='color: #FE7B13; font-size: 22px'>hoog</span><span style='color: #000; font-size: 9px'>(dot)com</span></h3><br/>Hi #{@username},<br/><br/><br/>We're glad to have you as a new member. thehoog is an online hub for new music and videos - a meeting place for artists, fans, and music enthusiasts and officianados.<br/><br/>If you're an artist: <ul><li>upload an audio file or video file</li><li>contribute your work to the swamp</li><li>let your work rise to the top of the Hoog board (your fans need you)</li></ul><br/>If you're a fan: <ul><li>listen and discover new music</li><li>create multiple playlists</li><li>discover other user's playlists</li><li>up-vote or down-vote tracks in order to determine who is thehoog's top 250</li></ul><br/><br/>Best,<p><span style='color: #bcbcbc; font-size: 14px'>the</span><span style='color: #FE7B13; font-size: 22px'>hoog</span><span style='color: #000; font-size: 9px'>(dot)com!</span></p></body></html>", :via => :smtp, :via_options => { :address => 'smtp.gmail.com', :port => '587', :enable_starttls_auto => true, :user_name => 'thehoogdotcom.team@gmail.com', :password => 'segagenesis', :authentication => :plain, :domain => "localhost", :arguments => ''
        }
      })
    @pass = {}
    # @top_playlists = Playlist.all.order(share_count: :desc)
    @pass[0] = { "key" => true, "user" => @user.id }#, tracks: @top_playlists }
    # username = @user.email.scan(/(.*)@.*/)
    session[:user] = @user.id
    @pass.to_json
  else
    @pass = {}
    invalid_user = User.find_by_email(params[:email])
    if invalid_user
      @pass[0] = { "key" => false, "user" => true, "password" => false }
      @pass.to_json
    elsif params[:password].length >= 8
      @pass[0] = { "key" => false, "user" => false, "password" => true }
      @pass.to_json
    elsif params[:password].length < 8
      @pass[0] = { "key" => false, "user" => false, "password" => false }
      @pass.to_json
    end
  end
end

get '/users/:id' do
  params_to_i = params[:id].to_i
  if params_to_i != 0 && current_user.id == params_to_i
    @playlists = Playlist.where(user_id: params[:id])
    @playlists = @playlists + current_user.added_playlists
    erb :'users/show'
  else
    erb :'users/signin'
  end
end

get '/users/:id/inbox' do
  if current_user.id == params[:id].to_i
    shared_tracks = Sharedtrack.where(user_id: current_user.id)
    shared_playlists = Sharedplaylist.where(user_id: current_user.id)
    @tracks = []
    @playlist = current_user.playlists + current_user.added_playlists
    @shared_playlists = []
    shared_tracks.each{ |shared| @tracks << Track.find(shared.track_id) }
    shared_playlists.each{ |shared| @shared_playlists << Playlist.find(shared.playlist_id) }
    erb :'users/inbox'
  else
    redirect "/theswamp"
  end
end

get '/users/:id/inbox/tracks/:track_id/delete' do if current_user.id == params[:id].to_i
    user = User.find(params[:id])
    inbox_tracks = Sharedtrack.where(user_id: current_user.id)
    inbox_tracks.destroy_all(track_id: params[:track_id])
    redirect "/users/#{current_user.id}/inbox"
  else
    redirect "/theswamp"
  end
end

get '/users/:id/inbox/playlists/:playlist_id/delete' do if current_user.id == params[:id].to_i
    user = User.find(params[:id])
    inbox_playlists = Sharedplaylist.where(user_id: current_user.id)
    inbox_playlists.destroy_all(playlist_id: params[:playlist_id])
    redirect "/users/#{current_user.id}/inbox"
  else
    redirect "/theswamp"
  end
end

get '/theswamp' do 
  @search_tracks = Track.search(params[:q])
  @results = @search_tracks.result(distinct: true).shuffle
  if current_user
    @playlists = current_user.playlists
  end
  erb :'tracks/index'
end

post '/upload' do
  @username = current_user.email.scan(/(.*)@.*/)[0][0]
  @file = params[:filename][:filename]
  if params[:artwork] != nil
    @artwork = params[:artwork][:filename]
    @artwork_path = "/uploads/images/" + @artwork
    @play = "/uploads/videos/" + @file
    @video = true if @file.match(/.mp4/)

    @track = Track.new(title: params[:title], genre: params[:genre], artist: @username, artwork_url: @artwork_path, permalink_url: @play, user_id: current_user.id)
    if @track.save
      File.open("public/uploads/images/" + params[:artwork][:filename], "w") do |f|
        f.write(params[:artwork][:tempfile].read)
      end
      File.open("public/uploads/videos/" + params[:filename][:filename], "w") do |f|
        f.write(params[:filename][:tempfile].read)
      end
      @playlists = Playlist.where(user_id: current_user.id)
      erb :'tracks/show'
    else
      @error = "Track failed to upload"
      @playlists = Playlist.where(user_id: params[:id])
      @playlists = @playlists + current_user.added_playlists
      erb :'users/show'
    end
  else
    @play = "/uploads/videos/" + @file
    @video = true if @file.match(/.mp4/)

    @track = Track.new(title: params[:title], genre: params[:genre], artist: @username, permalink_url: @play, user_id: current_user.id)
    if @track.save
      File.open("public/uploads/videos/" + params[:filename][:filename], "w") do |f|
        f.write(params[:filename][:tempfile].read)
      end
      @playlists = Playlist.where(user_id: current_user.id)
      erb :'tracks/show'
    else
      @error = "Track failed to upload"
      @playlists = Playlist.where(user_id: params[:id])
      @playlists = @playlists + current_user.added_playlists
      erb :'users/show'
    end
  end
end

get '/tracks/:id' do
  @track = Track.find(params[:id])
  if current_user
    @playlists = current_user.playlists
  end
  @play = @track.permalink_url
  @video = true if @play.match(/.mp4/)
  if current_user
    @playlists = Playlist.where(user_id: current_user.id)
  end
  erb :'tracks/show'
end

get '/tracks/:id/upvote' do
  user = User.find(current_user.id)
  track = Track.find(params[:id])
  total_votes = []
  if track.voters != nil
    voters = track.voters.split(";").map!{ |voter| total_votes << eval(voter) }
  end
  total_points = track.points
  total_voters = total_votes.map{ |vote| vote[0]}
  if track.voters == nil
    track.update(voters: "[#{user.id},1];", points: 1)
  elsif track.voters != nil && total_voters.include?(current_user.id)
    voters_update = ""
    curr_voter = total_votes.select{ |vote| vote[0] == current_user.id }.flatten
    index_user_vote = total_votes.index(curr_voter)
    total_votes[index_user_vote] = [current_user.id,1]
    total_votes.each{ |vote| voters_update += vote.to_s + ";" }
    track.update(voters: voters_update, points: total_points += 2)
  else
    unless total_voters.include?(current_user.id)
      voters_update = track.voters += "[#{user.id},1];"
      track.update(voters: voters_update, points: total_points += 1)
    end
  end
  redirect '/theswamp'
end

get '/tracks/:id/downvote' do
  user = User.find(current_user.id)
  track = Track.find(params[:id])
  total_votes = []
  if track.voters != nil
    track.voters.split(";").map!{ |voter| total_votes << eval(voter) }
  end
  total_points = track.points
  total_voters = total_votes.map{ |vote| vote[0]}

  if track.voters == nil
    track.update(voters: "[#{user.id},0];", points: -1)
  elsif track.voters != nil && total_voters.include?(current_user.id)
    voters_update = ""
    curr_voter = total_votes.select{ |vote| vote[0] == current_user.id }.flatten
    index_user_vote = total_votes.index(curr_voter)
    total_votes[index_user_vote] = [current_user.id,0]
    total_votes.each{ |vote| voters_update += vote.to_s + ";" }
    track.update(voters: voters_update, points: total_points -= 2)
  else
    unless total_voters.include?(current_user.id)
      voters_update = track.voters += "[#{user.id},0];"
      track.update(voters: voters_update, points: total_points -= 1)
    end
  end
  redirect '/theswamp'
end

post '/tracks/:id/share' do
  to_user = User.find_by_email(params[:email])
  from_user = current_user
  track = Track.find(params[:id])
  message = params[:message]
  if to_user
    to_username = to_user.email.scan(/(.*)@.*/)[0][0]
    from_username = from_user.email.scan(/(.*)@.*/)[0][0]
    Sharedtrack.create(to: params[:email], from: current_user.email, user_id: to_user.id, track_id: track.id)
      Pony.mail({
      :to => params[:email], :from => "no-reply@thehoog.com", :subject => 'You\'ve got a track!', :html_body => "<html><body style='color: #000'><br/>Hi #{to_username},<br/><br/><br/>We're excited to let you know that <span style='font-size: 18px; color: #FE7B13'>#{from_username}</span> thinks your awesome! So awesome that they decided to share a track that they've discovered on thehoog with you.<br><a href='thehoog.herokuapp.com'><div style='position: relative; display: block; width: 250px; height: 350px; border: 1px solid #bcbcbc; background: #fff;'><img src='thehoog.herokuapp.com/#{track.artwork_url}></img><h1 style='text-align: left; font-size: 125%; line-height: 1; padding-left: 5px; color: #FE7B13'>#{track.artist}</h1><h2 style='text-align: left; font-size: 100%; line-height: 1; padding-left: 10px; color: #999'>#{track.title}</h2><h1 style='text-align: right; margin-top: 5px; margin-bottom: 15px; color: #000'>#{track.points}</h1></div></a><br/><h5>#{from_username} says:</h5><br/><p>\"#{message}\"</p><br/><br/>Best,<p><span style='color: #bcbcbc; font-size: 14px'>the</span><span style='color: #FE7B13; font-size: 22px'>hoog</span><span style='color: #000; font-size: 9px'>(dot)com!</span></p></body></html>", :via => :smtp, :via_options => { :address => 'smtp.gmail.com', :port => '587', :enable_starttls_auto => true, :user_name => 'thehoogdotcom.team@gmail.com', :password => 'segagenesis', :authentication => :plain, :domain => "localhost", :arguments => ''
      }
    })
  else
    to_user = params[:email]
    to_username = to_user.scan(/(.*)@.*/)[0][0]
    from_username = from_user.email.scan(/(.*)@.*/)[0][0]
      Pony.mail({
      :to => params[:email], :from => "no-reply@thehoog.com", :subject => 'You\'ve got a track!', :html_body => "<html><body style='color: #000'><br/>Hi #{to_username},<br/><br/>We're excited to let you know that <span style='font-size: 14px; color: #FE7B13'>#{from_username}</span> thinks your awesome! So awesome that they decided to share a track that they've discovered on thehoog with you.<br><br><a href='https://thehoog.herokuapp.com'><div style='position: relative; display: block; width: 200px; height: 250px; border: 1px solid #bcbcbc; background: #fff;'><img src='thehoog.herokuapp.com/#{track.artwork_url}></img><h1 style='text-align: left; font-size: 3em; line-height: 1; padding-left: 5px; color: #FE7B13'>#{track.artist}</h1><h2 style='text-align: left; font-size: 2em; line-height: 1; padding-left: 10px; color: #999'>#{track.title}</h2><h1 style='text-align: right; margin-top: 5px; margin-bottom: 15px; font-size: 2em; color: #000'>#{track.points}</h1></div></a><br/><h3 style='color: #FE7B13'>#{from_username} says:</h3><br/><p>\"#{message}\"</p><br/><br/>Best,<p><span style='color: #bcbcbc; font-size: 14px'>the</span><span style='color: #FE7B13; font-size: 22px'>hoog</span><span style='color: #000; font-size: 9px'>(dot)com!</span></p></body></html>", :via => :smtp, :via_options => { :address => 'smtp.gmail.com', :port => '587', :enable_starttls_auto => true, :user_name => 'thehoogdotcom.team@gmail.com', :password => 'segagenesis', :authentication => :plain, :domain => "localhost", :arguments => ''
      }
    })
  end
  @error = "Message was sent successfully!"
  redirect "/theswamp"
end

get '/tracks/:id/delete' do
  Track.find(params[:id]).destroy
  redirect "/theswamp"
end

post '/add-to-playlist' do
  @track = Track.find(params[:track])
  @playlist = Playlist.find(params[:playlist])
  PlaylistTrack.create(playlist_id: @playlist.id, track_id: @track.id)
  @playlists = Playlist.where(user_id: current_user.id)
  @playlists = @playlists + current_user.added_playlists
  erb :'users/show'
end

post '/playlists/new' do
  @track = Track.find(params[:track])
  @play = @track.permalink_url
  @video = true if @play.match(/.mp4/)
  erb :'playlists/new'
end

post '/playlists/create' do
  new_playlist = Playlist.create(title: params[:title], description: params[:description], user_id: current_user.id)
  PlaylistTrack.create(track_id: params[:track], playlist_id: new_playlist.id)
  @playlists = Playlist.where(user_id: current_user.id)
  @playlists = @playlists + current_user.added_playlists
  erb :'users/show'
end

get '/playlists/:id' do
  @playlist = Playlist.find(params[:id])
  @playlist_tracks = ""
  @playlist.tracks.each{ |track| @playlist_tracks += track.permalink_url + "," }
  @playlist_tracks.to_s
end

get '/addplaylist/:id' do
  playlist = Playlist.find(params[:id]).id
  user = current_user.id
  PlaylistUser.create(user_id: user, playlist_id: playlist)
  redirect "/users/#{current_user.id}"
end

get '/playlists/:id/remove' do
  @user_playlists = current_user.playlists
  @added_playlists = current_user.added_playlists
  if @added_playlists.include?(Playlist.find(params[:id]))
    @added_playlists.destroy(params[:id])
  elsif @user_playlists.include?(Playlist.find(params[:id]))
    removed_playlist = Playlist.find(params[:id])
    removed_playlist.update(user_id: nil)
  end
  redirect "/users/#{current_user.id}"
end

get '/playlists/:id/upvote' do
  user = User.find(current_user.id)
  playlist = Playlist.find(params[:id])
  total_votes = []
  if playlist.voters != nil
    voters = playlist.voters.split(";").map!{ |voter| total_votes << eval(voter) }
  end
  total_points = playlist.points
  total_voters = total_votes.map{ |vote| vote[0]}
  if playlist.voters == nil
    playlist.update(voters: "[#{user.id},1];", points: 1)
  elsif playlist.voters != nil && total_voters.include?(current_user.id)
    voters_update = ""
    curr_voter = total_votes.select{ |vote| vote[0] == current_user.id }.flatten
    index_user_vote = total_votes.index(curr_voter)
    total_votes[index_user_vote] = [current_user.id,1]
    total_votes.each{ |vote| voters_update += vote.to_s + ";" }
    playlist.update(voters: voters_update, points: total_points += 2)
  else
    unless total_voters.include?(current_user.id)
      voters_update = playlist.voters += "[#{user.id},1];"
      playlist.update(voters: voters_update, points: total_points += 1)
    end
  end
  redirect '/community'
end

get '/playlists/:id/downvote' do
  user = User.find(current_user.id)
  playlist = Playlist.find(params[:id])
  total_votes = []
  if playlist.voters != nil
    playlist.voters.split(";").map!{ |voter| total_votes << eval(voter) }
  end
  total_points = playlist.points
  total_voters = total_votes.map{ |vote| vote[0]}

  if playlist.voters == nil
    playlist.update(voters: "[#{user.id},0];", points: -1)
  elsif playlist.voters != nil && total_voters.include?(current_user.id)
    voters_update = ""
    curr_voter = total_votes.select{ |vote| vote[0] == current_user.id }.flatten
    index_user_vote = total_votes.index(curr_voter)
    total_votes[index_user_vote] = [current_user.id,0]
    total_votes.each{ |vote| voters_update += vote.to_s + ";" }
    playlist.update(voters: voters_update, points: total_points -= 2)
  else
    unless total_voters.include?(current_user.id)
      voters_update = playlist.voters += "[#{user.id},0];"
      playlist.update(voters: voters_update, points: total_points -= 1)
    end
  end
  redirect '/community'
end

post '/playlists/:id/share' do
  to_user = User.find_by_email(params[:email])
  from_user = current_user
  playlist = Playlist.find(params[:id])
  message = params[:message]
  if to_user
    to_username = to_user.email.scan(/(.*)@.*/)[0][0]
    from_username = from_user.email.scan(/(.*)@.*/)[0][0]
    Sharedplaylist.create(to: params[:email], from: current_user.email, user_id: to_user.id, playlist_id: playlist.id)
      Pony.mail({
      :to => params[:email], :from => "no-reply@thehoog.com", :subject => 'You\'ve got a playlist!', :html_body => "<html><body style='color: #000'><br/>Hi #{to_username},<br/><br/><br/>We're excited to let you know that <span style='font-size: 18px; color: #FE7B13'>#{from_username}</span> thinks your awesome! So awesome that they decided to share a playlist that they've discovered on thehoog with you.<br><a href='thehoog.herokuapp.com'><div style='position: relative; display: block; width: 250px; height: 350px; border: 1px solid #bcbcbc; background: #fff;'><img src='thehoog.herokuapp.com/#{playlist.tracks.first.artwork_url}></img><h1 style='text-align: left; font-size: 125%; line-height: 1; padding-left: 5px; color: #FE7B13'>#{playlist.title}</h1><h2 style='text-align: left; font-size: 100%; line-height: 1; padding-left: 10px; color: #999'>#{playlist.description}</h2><h1 style='text-align: right; margin-top: 5px; margin-bottom: 15px; color: #000'>#{playlist.points}</h1></div></a><br/><h5>#{from_username} says:</h5><br/><p>\"#{message}\"</p><br/><br/>Best,<p><span style='color: #bcbcbc; font-size: 14px'>the</span><span style='color: #FE7B13; font-size: 22px'>hoog</span><span style='color: #000; font-size: 9px'>(dot)com!</span></p></body></html>", :via => :smtp, :via_options => { :address => 'smtp.gmail.com', :port => '587', :enable_starttls_auto => true, :user_name => 'thehoogdotcom.team@gmail.com', :password => 'segagenesis', :authentication => :plain, :domain => "localhost", :arguments => ''
      }
    })
  else
    to_user = params[:email]
    to_username = to_user.scan(/(.*)@.*/)[0][0]
    from_username = from_user.email.scan(/(.*)@.*/)[0][0]
      Pony.mail({
      :to => params[:email], :from => "no-reply@thehoog.com", :subject => 'You\'ve got a playlist!', :html_body => "<html><body style='color: #000'><br/>Hi #{to_username},<br/><br/>We're excited to let you know that <span style='font-size: 14px; color: #FE7B13'>#{from_username}</span> thinks your awesome! So awesome that they decided to share a playlist that they've discovered on thehoog with you.<br><br><a href='https://thehoog.herokuapp.com'><div style='position: relative; display: block; width: 200px; height: 250px; border: 1px solid #bcbcbc; background: #fff;'><img src='thehoog.herokuapp.com/#{playlist.tracks.first.artwork_url}></img><h1 style='text-align: left; font-size: 3em; line-height: 1; padding-left: 5px; color: #FE7B13'>#{playlist.title}</h1><h2 style='text-align: left; font-size: 2em; line-height: 1; padding-left: 10px; color: #999'>#{playlist.description}</h2><h1 style='text-align: right; margin-top: 5px; margin-bottom: 15px; font-size: 2em; color: #000'>#{playlist.points}</h1></div></a><br/><h3 style='color: #FE7B13'>#{from_username} says:</h3><br/><p>\"#{message}\"</p><br/><br/>Best,<p><span style='color: #bcbcbc; font-size: 14px'>the</span><span style='color: #FE7B13; font-size: 22px'>hoog</span><span style='color: #000; font-size: 9px'>(dot)com!</span></p></body></html>", :via => :smtp, :via_options => { :address => 'smtp.gmail.com', :port => '587', :enable_starttls_auto => true, :user_name => 'thehoogdotcom.team@gmail.com', :password => 'segagenesis', :authentication => :plain, :domain => "localhost", :arguments => ''
      }
    })
  end
  @error = "Message was sent successfully!"
  redirect "/community"
end

get '/playlists/:id/delete' do
  Playlist.find(params[:id]).destroy
  redirect "/community"
end

get '/community' do
  @playlists = Playlist.all
  @playlists = @playlists.shuffle
  erb :'playlists/index'
end

get '/thehoog' do
  @tracks = Track.all.order(points: :desc)
  erb :'thehoog/thehoog'
end

get '/thehoog/filter/tracks' do
  @tracks = Track.all.order(points: :desc)
  erb :'thehoog/tracks'
end

get '/thehoog/filter/playlists' do
  @playlists = Playlist.all.order(points: :desc)
  erb :'thehoog/playlists'
end

get '/logout' do
  session.clear
  redirect '/'
end


