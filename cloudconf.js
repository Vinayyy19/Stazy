const cloudinary = require('cloudinary').v2;
const { closeDelimiter } = require('ejs');
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name : process.env.fileName,
    api_key : process.env.api_key,
    api_secret : process.env.api_secret
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'Wonderlust_dev',
      allowedformat: ["png","jpg","jpeg"]
    },
  });

module.exports = {
    cloudinary,
    storage
}