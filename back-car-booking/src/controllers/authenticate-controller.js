const hashService = require("../services/hash-service")
const jwtService = require("../services/jwt-service")
const userService = require("../services/user-service")
const createError = require("../utils/create-error")

const authenticateController = {}

authenticateController.createUser = async (req, res, next) => {
    try {
        const plainText = req.input.password
        const hashPassword = hashService.hash(plainText)
        const input = req.input

        input.password = await hashPassword

        await userService.createUser(req.input)

        res.status(200).json({ message: "create user is success" })

    } catch (error) {
        console.log(error)
        next(error)
    }
}

authenticateController.login = async (req, res, next) => {
    try {
        const { emailOrMobile, password } = req.input
        const user = await userService.findUserbyMobileOrEmail(emailOrMobile)

        if (!user) {
            createError(400, "Have some value is invalid")
        }

        const hashPassword = user.password

        const isCorrectPassword = await hashService.compare(password, hashPassword)
        if (!isCorrectPassword) {
            createError(400, "Have some value is invalid")
        }

        const payload = { id: user.id }

        const token = jwtService.sing(payload)

        res.status(200).json({ message: "login is success", token })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

authenticateController.getMe = async (req, res, next) => {
    try {
        res.status(200).json({ user: req.user })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = authenticateController