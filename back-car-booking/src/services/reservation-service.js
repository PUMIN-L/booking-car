const prisma = require("../models/prisma")

const reservationService = {}

reservationService.findAvailableCar = () => prisma.cars.findMany({
    // where: {

    // }
})

module.exports = reservationService