const express = require("express")
const userController = require("../controllers/user-controller")
const authenticate = require("../middleware/authenticate-user")

const userRouter = express.Router()

userRouter.get("/allUser", authenticate, userController.getAllUser)

module.exports = userRouter