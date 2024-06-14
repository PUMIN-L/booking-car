const express = require("express")
const authenticateController = require("../controllers/authenticate-controller")
const { registerValidator, loginValidation } = require("../middleware/validator-middleware")
const authenticate = require("../middleware/authenticate-user")

const authenticateRoute = express.Router()

authenticateRoute.post("/register", registerValidator, authenticateController.createUser)
authenticateRoute.post("/login", loginValidation, authenticateController.login)
authenticateRoute.get("/me", authenticate, authenticateController.getMe)

module.exports = authenticateRoute