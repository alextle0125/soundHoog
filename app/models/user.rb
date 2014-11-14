class User < ActiveRecord::Base
  has_secure_password

  validates :email, uniqueness: true, format: { with: /[a-zA-Z\d._%+-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,4}/ }
  validates :password, length: { minimum: 8 }

  has_many :tracks
  has_many :playlists
  has_many :added_playlists, through: :playlist_users, source: :playlist
  has_many :playlist_users
end
