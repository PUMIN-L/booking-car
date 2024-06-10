
const carService = require("../services/car-service");

const carController = {}

carController.registerCar = async (req, res, next) => {
    try {
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

module.exports = carController