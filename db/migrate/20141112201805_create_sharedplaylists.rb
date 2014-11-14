class CreateSharedplaylists < ActiveRecord::Migration
  def change
    create_table :sharedplaylists do |t|
      t.string :from
      t.string :to
      t.belongs_to :playlist
      t.belongs_to :user
      t.timestamps
    end
  end
end
