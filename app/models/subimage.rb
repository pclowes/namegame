class Subimage < ActiveRecord::Base
  mount_uploader :subimage, SubimageUploader
  belongs_to :image
end
