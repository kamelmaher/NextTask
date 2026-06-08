const { v2 } = require("cloudinary");
require("dotenv").config()
v2.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const cloudinary = v2;
console.log(cloudinary.config())
module.exports = cloudinary;