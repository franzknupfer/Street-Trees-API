module Api::V1
  class TreesController < ApplicationController

    def index
      trees = Tree.dynamic_scope(params)
      # trees = Tree.dynamic_scope(params)
      # trees = Tree.scope_by_params(params)
      # if params[:common] & params [:neighborhood]
      #
      # if params[:neighborhood]
      #   trees = Tree.search_by_neighborhood(params[:neighborhood]).page(1)
      # elsif params[:edible]
      # else
      #   trees = Tree.page(1)
      # end
      json_response(trees)
    end

    def show
      tree = Tree.find(params[:id])
      json_response(tree)
    end

    private
    def json_response(object, status = :ok)
      render json: { trees: object, meta: { total_trees: Tree.count }}, status: status
    end

  end
end
