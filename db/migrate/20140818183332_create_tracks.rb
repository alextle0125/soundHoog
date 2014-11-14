class CreateTracks < ActiveRecord::Migration
  def change
    create_table :tracks do |t|
      t.string :title, :genre, :artist, :permalink_url
      t.string :artwork_url, :default => "/images/no-image-provided.png"
      t.integer :download_count, :default => 0
      t.integer :comment_count, :default => 0
      t.integer :points, :default => 0
      t.text :voters
      t.datetime :created_at
      t.belongs_to :user
      t.timestamps
    end
  end
end
