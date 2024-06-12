const prisma = require("../models/prisma")

const bookingService = {}

bookingService.createBooking = (data) => prisma.reservations.create({ data })

module.exports = bookingService