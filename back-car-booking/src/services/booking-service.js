const prisma = require("../models/prisma")

const bookingService = {}

bookingService.createBooking = (data) => prisma.reservations.create({ data })
bookingService.getBookingByUserId = (userId) => prisma.reservations.findMany({ where: { user_id: userId } })
bookingService.deleteBookingById = (bookingId) => prisma.reservations.delete({ where: { id: bookingId } })
bookingService.getBookingById = (bookingId) => prisma.reservations.findUnique({ where: { id: bookingId } })
bookingService.updateBooking = (bookingId, data) => prisma.reservations.update({ where: { id: bookingId }, data })

module.exports = bookingService