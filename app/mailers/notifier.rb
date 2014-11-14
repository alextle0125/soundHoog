class Notifier < ActionMailer::Base
  default from: "no-reply@thehoog.com"

  def welcome(recipient)
  	@account = recipient
  	mail(to: recipient) do |format|
  		format.text(content_transfer_encoding: "base64")
  	end
  end

end
