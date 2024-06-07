const jwtService = require("../services/jwt-service")
const userService = require("../services/user-service")
const createError = require("../utils/create-error")



const authenticate = async (req, res, next) => {
    try {

        const authentication = req.headers.authorization
        console.log(authentication)
        if (!authentication || !authentication.startsWith(`Bearer `)) {
            return createError(401, "Unauthenticated")
        }

        const accessToken = authentication.split(" ")[1]
        const payload = jwtService.verify(accessToken)

        console.log(payload)

        const user = await userService.findUserById(payload.id)

        if (!user) {
            createError(400, "User was not found")
        }

        delete user.password
        req.user = user
        next()

    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = authenticate