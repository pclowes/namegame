class SubimagesController < ApplicationController
  require 'base64'

  def create
    # subimage_params = params.require(:subimage).permit(:subimage, :name)

    @subimage = Subimage.new(subimage: params[:subimage])
    @subimage.save
    redirect_to root_path
  end

  def index
    @theimage = Subimage.find(1)
  end
end
