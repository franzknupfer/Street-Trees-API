class CreateTrees < ActiveRecord::Migration[5.1]
  def change
    create_table :trees do |t|
      t.column :lat, :decimal, {:precision=>10, :scale=>6}
      t.column :long, :decimal, {:precision=>10, :scale=>6}
      t.column :objectid, :integer
      t.column :survey_date, :date
      t.column :species, :string
      t.column :dbh, :decimal, {:precision=> 10, :scale=>8}
      t.column :condition, :string
      t.column :site_type, :string
      t.column :site_width, :integer
      t.column :wires, :string
      t.column :site_development, :string
      t.column :site_size, :string
      t.column :notes, :string
      t.column :address, :string
      t.column :neighborhood, :string
      t.column :data_collected_by, :string
      t.column :planted_by, :string
      t.column :planted_date, :date
      t.column :scientific_name, :string
      t.column :family_name, :string
      t.column :genus, :string
      t.column :common_name, :string
      t.column :tree_type, :string
      t.column :tree_size, :string
      t.column :edible, :boolean
      t.column :species_description, :string
      t.timestamps
    end
  end
end
