class Track < ActiveRecord::Base

  validates :permalink_url, uniqueness: true

  belongs_to :user
  has_many :playlist_tracks
  has_many :playlists, through: :playlist_tracks
  
end
