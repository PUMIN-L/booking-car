const express = require("express")
const upload = require("../middleware/upload")
const carController = require("../controllers/car-controller")
const { registerCarValidator } = require("../middleware/validator-car-middleware")

const carRouter = express.Router()

carRouter.post(
    "/registerCar",
    registerCarValidator,
    upload.single("img_car"),
    carController.registerCar
)

carRouter.get("/", carController.getAllcar)

module.exports = carRouter