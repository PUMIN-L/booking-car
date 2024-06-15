const userService = require("../services/user-service")
const createError = require("../utils/create-error")


const userController = {}


userController.getAllUser = async (req, res, next) => {
    try {
        if (req.user.id !== 1) {
            createError(400, "You are not admin")
        }
        const allUser = await userService.getAllUser()
        res.status(200).json({ allUser })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = userController