const express = require("express")
const upload = require("../middleware/upload")
const carController = require("../controllers/car-controller")
const { registerCarValidator } = require("../middleware/validator-car-middleware")
const authenticate = require("../middleware/authenticate-user")


const carRouter = express.Router()

carRouter.post(
    "/registerCar", authenticate,
    registerCarValidator,
    upload.single("img_car"),
    carController.registerCar
)

carRouter.get("/", authenticate, carController.getAllcar)
carRouter.post("/:carId", authenticate, carController.getCarById)
carRouter.get("/getAvailableCar", authenticate, carController.getAvailableCar)

module.exports = carRouter