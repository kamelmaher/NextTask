const { roles } = require("../utils/index");

const {
    getPortfolioItems,
    getPortfolioItem,
    createPortfolioItem,
    updatePortfolioItem,
    deletePortfolioItem,
} = require("../controllers/portfolio.controller");
const upload = require("../middlewares/upload");
const uploadToCloudinary = require("../middlewares/cloudinary");

const router = require("express").Router();

const verifyToken = require("../middlewares/verifyToken");
const allowedTo = require("../middlewares/allowedTo");

// public routes
router.get("/item/:id", getPortfolioItem);
router.get("/:id", getPortfolioItems);

// employer only
router.post(
    "/",
    verifyToken,
    allowedTo(roles.USER),
    upload.fields([
        { name: "cover", maxCount: 1 },
        { name: "images", maxCount: 10 },
    ]),
    uploadToCloudinary({ coverRequired: true }),
    createPortfolioItem
);
router.put(
    "/:id",
    verifyToken,
    allowedTo(roles.USER),
    upload.fields([
        { name: "cover", maxCount: 1 },
        { name: "images", maxCount: 10 },
    ]),
    uploadToCloudinary({ coverRequired: false }),
    updatePortfolioItem
);

router.delete("/:id", verifyToken, allowedTo(roles.USER), deletePortfolioItem)

module.exports = router;