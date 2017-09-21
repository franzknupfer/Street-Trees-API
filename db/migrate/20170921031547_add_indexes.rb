class AddIndexes < ActiveRecord::Migration[5.1]
  def change
    add_index :trees, :edible
    add_index :trees, :common_name
    add_index :trees, :neighborhood
  end
end
