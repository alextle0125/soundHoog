helpers do
  def em(text)
    "<em>#{text}</em>"
  end

  def current_user
    @user ||= User.find(session[:user]) if session[:user]
  end
end
