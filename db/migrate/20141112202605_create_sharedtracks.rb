class CreateSharedtracks < ActiveRecord::Migration
  def change
    create_table :sharedtracks do |t|
      t.string :from
      t.string :to
      t.belongs_to :track
      t.belongs_to :user
      t.timestamps
    end
  end
end
