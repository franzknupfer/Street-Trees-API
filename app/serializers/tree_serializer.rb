class TreeSerializer < ActiveModel::Serializer
  attributes :id, :lat, :long, :species, :address, :neighborhood, :scientific_name, :family_name, :genus, :common_name, :edible
end
