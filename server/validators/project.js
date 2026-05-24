const { body } = require("express-validator");

exports.createProjectValidator = [
    body("title")
        .notEmpty().withMessage("Title is required")
        .isString().withMessage("Title must be a string")
        .isLength({ min: 3, max: 100 }),

    body("desc")
        .notEmpty().withMessage("Description is required")
        .isString()
        .isLength({ min: 10, max: 1000 }),

    body("minPrice")
        .notEmpty().withMessage("minPrice is required")
        .isNumeric().withMessage("minPrice must be a number")
        .toFloat(),

    body("maxPrice")
        .notEmpty().withMessage("maxPrice is required")
        .isNumeric().withMessage("maxPrice must be a number")
        .toFloat(),

    body("categoryId")
        .notEmpty().withMessage("categoryId is required")
        .isMongoId().withMessage("Invalid categoryId"),

    body("deliveryDuration")
        .notEmpty().withMessage("deliveryDuration is required")
        .isNumeric().withMessage("deliveryDuration must be a number")
        .toInt(),

];


exports.updateProjectValidator = [
    body("title")
        .optional()
        .isString().withMessage("Title must be a string")
        .isLength({ min: 3, max: 100 }),

    body("desc")
        .optional()
        .isString()
        .isLength({ min: 10, max: 1000 }),

    body("minPrice")
        .optional()
        .isNumeric().withMessage("minPrice must be a number")
        .toFloat(),

    body("maxPrice")
        .optional()
        .isNumeric().withMessage("maxPrice must be a number")
        .toFloat(),

    body("categoryId")
        .optional()
        .isMongoId().withMessage("Invalid categoryId"),

    body("deliveryDuration")
        .optional()
        .isNumeric().withMessage("deliveryDuration must be a number")
        .toInt(),

    body().custom((_, { req }) => {
        const { minPrice, maxPrice } = req.body;

        if (minPrice && maxPrice && Number(minPrice) > Number(maxPrice)) {
            throw new Error("minPrice cannot be greater than maxPrice");
        }

        return true;
    })
];