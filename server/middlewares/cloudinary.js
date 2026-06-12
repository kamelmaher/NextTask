const multer = require("multer");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});


// ============================
// MULTER CONFIG
// ============================

const upload = multer({

    storage: multer.memoryStorage(),

    fileFilter: (req, file, cb) => {

        if (file.mimetype.startsWith("image/")) {
            return cb(null, true);
        }

        cb(new Error("Only image files allowed"), false);
    },

    limits: {
        fileSize: 5 * 1024 * 1024
    }
});


// ============================
// CLOUDINARY BUFFER UPLOAD
// ============================

const uploadBuffer = (buffer, folder) => {

    return new Promise((resolve, reject) => {

        const stream = cloudinary.uploader.upload_stream(
            {
                folder,
                resource_type: "image"
            },

            (error, result) => {

                if (error) return reject(error);

                resolve(result);
            }
        );

        stream.end(buffer);
    });
};


// ============================
// MAIN MIDDLEWARE
// ============================

const uploadToCloudinary = ({
    coverRequired = false
} = {}) => {

    return [

        // multer middleware
        upload.fields([
            { name: "cover", maxCount: 1 },
            { name: "images", maxCount: 10 },
        ]),

        // cloudinary middleware
        async (req, res, next) => {

            try {

                if (
                    !req.files ||
                    Object.keys(req.files).length === 0
                ) {

                    if (coverRequired) {
                        return res.status(400).json({
                            message: "Cover image is required"
                        });
                    }

                    return next();
                }

                // =========================
                // COVER
                // =========================

                if (req.files.cover?.[0]) {

                    const coverFile =
                        req.files.cover[0];

                    const coverResult =
                        await uploadBuffer(
                            coverFile.buffer,
                            "portfolio/covers"
                        );

                    req.body.cover =
                        coverResult.secure_url;

                } else if (coverRequired) {

                    return res.status(400).json({
                        message: "Cover image is required"
                    });
                }


                // =========================
                // IMAGES
                // =========================

                if (req.files.images?.length) {

                    const imageResults =
                        await Promise.all(

                            req.files.images.map(file =>
                                uploadBuffer(
                                    file.buffer,
                                    "portfolio/images"
                                )
                            )
                        );

                    req.body.images =
                        imageResults.map(
                            item => item.secure_url
                        );
                }

                next();

            } catch (err) {

                console.error(
                    "Cloudinary Upload Error:",
                    err
                );

                return res.status(500).json({
                    message: "Image upload failed",
                    error: err.message
                });
            }
        }
    ];
};

module.exports = uploadToCloudinary;