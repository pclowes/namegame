class Image < ActiveRecord::Base
  mount_uploader :image, ImageUploader
  has_many :subimages
end
