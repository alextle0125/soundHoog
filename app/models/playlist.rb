class Playlist < ActiveRecord::Base
  belongs_to :user
  has_many :playlist_users
  has_many :synced_users, through: :playlist_users, source: :user
  has_many :playlist_tracks
  has_many :tracks, through: :playlist_tracks
end
