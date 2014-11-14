class Sharedplaylist < ActiveRecord::Base
	validates :to, :from, presence: true

	belongs_to :playlist
	belongs_to :user
end
