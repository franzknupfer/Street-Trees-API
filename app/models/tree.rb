class Tree < ApplicationRecord

  scope :fruit_trees, -> { where ({:edible => "fruit"}) }
  scope :nut_trees, -> { where ({:edible => "nut"}) }
  scope :search_by_common_name, -> (common_name) { where("lower(common_name) like ?", (common_name).downcase)}
  scope :search_by_neighborhood, -> (neighborhood) { where("lower(neighborhood) like ?", (neighborhood).downcase) }
  scope :fruit_or_nut, -> { where ({:edible => ["fruit", "nut"]})}

  def self.edible_by_neighborhood(neighborhood)
    search_by_neighborhood(neighborhood).fruit_or_nut
  end

  def self.common_tree_by_neighborhood(neighborhood, common_name)
    search_by_neighborhood(neighborhood).search_by_common_name(common_name)
  end

end
