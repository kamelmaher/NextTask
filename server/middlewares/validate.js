const { validationResult } = require("express-validator");
const { error } = require("../utils/responses")
module.exports = (schema) => {
    return (req, res, next) => {
        const errors = validationResult(schema);
        if (!errors.isEmpty()) {
            return error(res, 400, {
                errors: errors.array().map(err => ({
                    field: err.path,
                    message: err.msg
                }))
            });
        }
        next();
    }
}
