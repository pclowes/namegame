class ImagesController < ApplicationController
  def index
    @images = Image.all
  end

  def new
    @image = Image.new
  end

  def create
    image_params = params.require(:image).permit(:image, :description)
    @image = Image.new(image_params)
    @image.save
    redirect_to image_path(@image), notice: "Image was uploaded successfully"
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
