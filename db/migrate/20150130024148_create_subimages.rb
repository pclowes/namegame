class CreateSubimages < ActiveRecord::Migration
  def change
    create_table :subimages do |t|
      t.string :name
      t.string :subimage
    end
  end
end
