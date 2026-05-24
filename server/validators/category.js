const { body } = require("express-validator");

exports.createCategoryValidator = [
    body("title")
        .notEmpty().withMessage("Title is required")
        .isString().withMessage("Title must be a string")
        .isLength({ min: 2, max: 50 })
        .withMessage("Title must be between 2 and 50 characters")
        .trim(),

    body("icon")
        .notEmpty().withMessage("Icon is required")
        .isString().withMessage("Icon must be a string")
        .isLength({ min: 1, max: 100 })
        .withMessage("Icon is too long")
        .trim()
];

exports.updateCategoryValidator = [
    body("title")
        .optional()
        .isString().withMessage("Title must be a string")
        .isLength({ min: 2, max: 50 })
        .withMessage("Title must be between 2 and 50 characters")
        .trim(),

    body("icon")
        .optional()
        .isString().withMessage("Icon must be a string")
        .isLength({ min: 1, max: 100 })
        .withMessage("Icon is too long")
        .trim()
];