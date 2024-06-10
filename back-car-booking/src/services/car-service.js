const prisma = require("../models/prisma")

const carService = {}

carService.createCar = data => prisma.cars.create({ data })
carService.getAllCar = () => prisma.cars.findMany()

module.exports = carService