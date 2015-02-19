class ImagesController < ApplicationController
  require 'base64'
  def index
    @images = Image.all
  end

  def new
    @image = Image.new
  end

  def create
    image = Image.create(params.require(:image).permit(:image, :description))

    render json: {location: image_path(image)}
  end

  def show
    @image = Image.find(params[:id])
  end

  def edit
    @image = Image.find(params[:id])
  end

  def update
    @image = Image.find(params[:id])
    image_params = params.require(:image).permit(:image, :description)
    @image.update(image_params)
    redirect_to images_path, notice: "Image was updated successfully"
  end

  def destroy
    Image.find(params[:id]).destroy
    redirect_to images_path, notice: "Image was deleted successfully"
  end
end
