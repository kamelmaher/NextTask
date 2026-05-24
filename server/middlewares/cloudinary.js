const cloudinary = require("../config/cloudinary");
const fs = require("fs");

const uploadToCloudinary = async (
    req,
    res,
    next
) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                message: "No file uploaded",
            });
        }

        const result = await cloudinary.uploader.upload(
            req.file.path,
            {
                folder: "products",
            }
        );

        fs.unlinkSync(req.file.path);

        req.body.image = result.secure_url;

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = uploadToCloudinary