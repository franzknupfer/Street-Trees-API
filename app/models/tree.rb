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

  def self.scope_by_params(params)
    if params[:edible] && params[:neighborhood]
      edible_by_neighborhood(params[:neighborhood])
    elsif params[:common_name] && params[:neighborhood]
      common_tree_by_neighborhood(params[:neighborhood], params[:common_name])
    elsif params[:common_name]
      search_by_common_name(params[:common_name])
    elsif params[:neighborhood]
      search_by_neighborhood(params[:neighborhood])
    end
  end

  def self.dynamic_scope(params)
    string = ""
    params.each do |key, value|
      if Tree.column_names.include?(key)
        string = string + ".where('lower(#{key}) like ?', ('#{value}').downcase)"
      end
    end
    if string != ""
      eval("Tree" + string)
    end
  end
end
