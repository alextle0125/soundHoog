class Sharedtrack < ActiveRecord::Base
	validates :to, :from, presence: true

	belongs_to :track
	belongs_to :user
end
