class SubimagesController < ApplicationController
  require 'base64'

  before_action do
    @image = Image.find(params[:image_id])
  end

  def create
    @subimage = @image.subimages.new(subimage_params)
    @subimage.save
    redirect_to root_path
  end

  def index
    @theimage = Subimage.order(:id).last
  end

  def show
    @subimage = Subimage.find(params[:id])
  end

  def subimage_params
    params.require(:subimage).permit(:subimage, :name)
  end
end
