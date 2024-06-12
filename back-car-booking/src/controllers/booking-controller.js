const bookingService = require("../services/booking-service")

const bookingController = {}


bookingController.createBooking = async (req, res, next) => {
    try {
        const result = await bookingService.createBooking(req.body)
        res.status(200).json({ message: "create booking is OK", result })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

bookingController.getBookingById = async (req, res, next) => {
    try {
        const myBooking = await bookingService.getBookingByUserId(req.body.id)
        res.status(200).json({ message: "get Bookin By Id id ok", myBooking })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = bookingController