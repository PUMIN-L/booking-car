const prisma = require("../models/prisma")

const carService = {}

carService.createCar = data => prisma.cars.create({ data })
carService.getAllCar = () => prisma.cars.findMany()
carService.getCarById = (id) => prisma.cars.findUnique({ where: { id } })

module.exports = carService