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
    scope_hash = {}
    params.each do |key, value|
      if Tree.column_names.include?(key)
        scope_hash[key] = value
      end
    end
    if scope_hash.any?
      string = "Tree"
      scope_hash.each do |k, v|
        if v.class == String
          string = string + ".where('lower(#{k}) like ?', ('#{v}').downcase)"
        else
          string = string + ".where('(#{k}) like ?', ('#{v})')"
        end
      end
    end
    binding.pry
    eval(string)
  end

  # def self.scope_by_params(params)
  #   if params[:neighborhood]
  #     query = search_by_neighborhood(params[:neighborhood])
  #   end
  #   if params[:common_name]
  #
  #
  #
  # def self.send_chain(methods)
  #   methods.inject(self, :send)
  # end
end
