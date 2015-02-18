CarrierWave.configure do |config|
  # config.fog_credentials = {
  #   provider: 'AWS',
  #   aws_access_key_id: ENV['S3_KEY'],
  #   aws_secret_access_key: ENV['S3_SECRET'],
  # }

  #for testing, upload files to local 'tmp' folder.
  if Rails.env.test? || Rails.env.cucumber?
    config.storage = :file
    config.enable_processing = false
    config.reboot = "#{Rails.root}/tmp"
  else
    config.storage = :fog
  end
  #to let carrierwave work on heroku
  config.cache_dir = "#{Rails.root}/tmp/uploads"
  config.fog_directory = ENV['S3_BUCKET_NAME']
end

#
# # resetup carrierwave
# # see if we can get it to work with s3
