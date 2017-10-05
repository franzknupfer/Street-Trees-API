module Api::V1
  class TreesController < ApplicationController

    def index
      trees = Tree.dynamic_scope(params)
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
