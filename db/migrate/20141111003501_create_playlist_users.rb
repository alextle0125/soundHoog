class CreatePlaylistUsers < ActiveRecord::Migration
  def change
    create_table :playlist_users do |t|
      t.belongs_to :playlist
      t.belongs_to :user
      t.timestamps
    end
  end
end
