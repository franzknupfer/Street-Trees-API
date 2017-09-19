class ChangeEdibleColumn < ActiveRecord::Migration[5.1]
  def change
    remove_column :trees, :edible
    add_column :trees, :edible, :string
  end
end
