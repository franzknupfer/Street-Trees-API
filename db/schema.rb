# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20170914235717) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "trees", force: :cascade do |t|
    t.decimal "lat", precision: 10, scale: 6
    t.decimal "long", precision: 10, scale: 6
    t.integer "objectid"
    t.date "survey_date"
    t.string "species"
    t.decimal "dbh", precision: 10, scale: 8
    t.string "condition"
    t.string "site_type"
    t.integer "site_width"
    t.string "wires"
    t.string "site_development"
    t.string "site_size"
    t.string "notes"
    t.string "address"
    t.string "neighborhood"
    t.string "data_collected_by"
    t.string "planted_by"
    t.date "planted_date"
    t.string "scientific_name"
    t.string "family_name"
    t.string "genus"
    t.string "common_name"
    t.string "tree_type"
    t.string "tree_size"
    t.string "species_description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "edible"
  end

end
