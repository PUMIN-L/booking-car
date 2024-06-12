const prisma = require("../models/prisma")

const bookingService = {}

bookingService.createBooking = (data) => prisma.reservations.create({ data })
bookingService.getBookingByUserId = (userId) => prisma.reservations.findMany({ where: { user_id: userId } })

module.exports = bookingService