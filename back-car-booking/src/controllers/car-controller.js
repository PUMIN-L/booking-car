
const carService = require("../services/car-service");
const createError = require("../utils/create-error");

const carController = {}

carController.registerCar = async (req, res, next) => {
    try {
        if (req.user.id !== 1) {
            createError(400, "User is Invalid, You are not admin")
        }
        let data = {}
        if (req.file) {
            data.img_car = req.file.path;
        }
        data = { ...data, ...req.body }
        data.type_id = +data.type_id
        console.log(data)
        const dataNewCar = await carService.createCar(data)
        res.status(200).json({ message: "test ok", dataNewCar })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

carController.getAllcar = async (req, res, next) => {
    try {
        const result = await carService.getAllCar()
        console.log(result)
        res.status(200).json({ message: "getAll car is ok", result })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

carController.getCarById = async (req, res, next) => {
    try {
        const currentCar = await carService.getCarById(+req.params.carId)
        console.log(currentCar)
        res.status(200).json({ message: "find car by Id is OK", currentCar })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

carController.getAvailableCar = async (req, res, next) => {
    try {
        console.log(req.query)
        const result = await carService.getAvailableCar(req.query.pickUp, req.query.dropOff)
        res.status(200).json({ result })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = carController 