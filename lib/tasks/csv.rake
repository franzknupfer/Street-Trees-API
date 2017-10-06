namespace :csv do
  desc "it takes street trees csv file and pushes its data to the database"
  task convert: :environment do
    require 'csv'

    CSV.foreach('../street_trees.csv', :headers => true) do |row|
      t = Tree.new()
      # Task is not properly picking up value at row['X'].
      # t.lat = row['X']. Lat and long are also reversed in CSV.
      t.long = row[0]
      t.lat = row['Y']
      t.objectid = row['OBJECTID']
      t.survey_date = row['Date_Inventoried']
      t.species = row['Species']
      t.dbh = row['DBH']
      t.condition = row['Condition']
      t.site_type = row['Site_Type']
      t.site_width = row['Site_Width']
      t.wires = row['Wires']
      t.site_development = row['Site_development']
      t.site_size = row['Site_Size']
      t.notes = row['Notes']
      t.address = row['Address']
      t.neighborhood = row['Neighborhood']
      t.data_collected_by = row['Collected_By']
      t.planted_by = row['Planted_By']
      t.planted_date = row['Plant_Date']
      t.scientific_name = row['Scientific']
      t.family_name = row['Family']
      t.genus = row['Genus']
      t.common_name = row['Common']
      t.tree_type = row['FunctionalType']
      t.tree_size = row['Size']
      t.edible = row['Edible']
      t.species_description = row['Species_Description']
      t.save!
      puts "#{t} saved!"
    end
  end
end
