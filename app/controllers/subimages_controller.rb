class SubimagesController < ApplicationController
  def create
    # subimage_params = params.require(:subimage).permit(:subimage, :name)
    @subimage = Subimage.new(subimage: params[:subimage])
    @subimage.save
    redirect_to root_path
  end
end
