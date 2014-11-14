class CreatePlaylists < ActiveRecord::Migration
  def change
    create_table :playlists do |t|
      t.string :title
      t.string :description
      t.integer :share_count
      t.integer :points, :default => 0
      t.text :voters
      t.belongs_to :user
      t.timestamps
    end
  end
end
