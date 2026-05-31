const roles = {
    ADMIN: "admin",
    MODERATOR: "moderator",
    USER: "user",
    MANAGER: "manager"
}

const mainPriceRange = {
    MIN_PRICE_RANGE: 50,
    MAX_PRICE_RANGE: 10000
}

const MAIN_LIMIT = 15

const userAllowedFields = ["firstName", "lastName", "userName", "email", "password", "about", "title", "profileImage", "categoryId"]

module.exports = {
    roles,
    mainPriceRange,
    MAIN_LIMIT,
    userAllowedFields
}