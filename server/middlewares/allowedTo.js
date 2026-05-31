const { error } = require("../utils/responses");

module.exports = (...roles) => {
    return (req, res, next) => {
        const userRoles = req.user.roles || []
        const hasAccess = userRoles.some(role =>
            roles.includes(role)
        );

        if (!hasAccess) {
            return error(res, 403, "Access Denied");
        }

        next();
    };
}
