const { body } = require("express-validator");
const { roles } = require("../constants/roles");

exports.userDetailsValidator = [
    body("firstName")
        .notEmpty().withMessage("First name is required")
        .isString().withMessage("First name must be a string")
        .isLength({ min: 2 }).withMessage("First name is too short")
        .isLength({ max: 50 }).withMessage("First name is too long"),

    body("lastName")
        .notEmpty().withMessage("Last name is required")
        .isString().withMessage("Last name must be a string")
        .isLength({ min: 2 }).withMessage("Last name is too short")
        .isLength({ max: 50 }).withMessage("Last name is too long"),

    body("userName")
        .notEmpty().withMessage("Username is required")
        .isString().withMessage("Username must be a string")
        .isLength({ min: 3 }).withMessage("Username must be at least 3 characters")
        .isLength({ max: 30 }).withMessage("Username is too long")
        .matches(/^[a-zA-Z0-9_]+$/)
        .withMessage("Username can only contain letters, numbers, and underscores"),

    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format")
        .normalizeEmail(),

    body("password")
        .trim()
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
        .isLength({ max: 30 }).withMessage("Password is too long"),

    body("about")
        .optional()
        .isString().withMessage("About must be a string")
        .isLength({ max: 500 }).withMessage("About is too long"),

    body("title")
        .optional()
        .isString().withMessage("Title must be a string")
        .isLength({ max: 100 }).withMessage("Title is too long")
];

exports.loginValidator = [
    body("email")
        .trim()
        .notEmpty().withMessage("Email is required")
        .isEmail().withMessage("Invalid email format")
        .normalizeEmail(),

    body("password")
        .trim()
        .notEmpty().withMessage("Password is required")
        .isLength({ min: 6 }).withMessage("Password must be at least 6 characters")
];

