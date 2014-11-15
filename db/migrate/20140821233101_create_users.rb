class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email
      t.string :password_digest
      t.text :followings
      t.text :followers
      t.integer :followers_count, :default => 0
      t.integer :followings_count, :default => 0
      t.timestamps
    end
  end
end
