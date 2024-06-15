const bookingService = require("../services/booking-service")
const createError = require("../utils/create-error")

const bookingController = {}


bookingController.createBooking = async (req, res, next) => {
    try {

        if (req.body.user_id !== req.user.id) {
            createError(400, "User is Invalid")
        }
        const result = await bookingService.createBooking(req.body)
        res.status(200).json({ result })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

bookingController.getBookingByUserId = async (req, res, next) => {
    try {
        if (req.user.id !== req.body.id) {
            createError(400, "User is Invalid")
        }
        const myBooking = await bookingService.getBookingByUserId(req.body.id)

        res.status(200).json({ myBooking })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

bookingController.deleteBooking = async (req, res, next) => {
    try {

        const getBookingById = await bookingService.getBookingById(+req.params.idBooking)
        if (req.user.id !== getBookingById.user_id) {
            createError(400, "User is Invalid")
        }
        const result = await bookingService.deleteBookingById(+req.params.idBooking)
        res.status(200).json({ result })

    } catch (error) {
        next(error)
    }
}

bookingController.getBookingById = async (req, res, next) => {
    try {
        const booking = await bookingService.getBookingById(+req.params.bookingId)
        res.status(200).json(booking)
    } catch (error) {
        console.log(error)
        next(error)
    }
}

bookingController.updateBooking = async (req, res, next) => {
    try {
        if (req.user.id !== req.body.user_id) {
            createError(400, "Invalid user")
        }
        result = await bookingService.updateBooking(+req.body.id, req.body)
        res.status(200).json({ result })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

bookingController.getAllBooking = async (req, res, next) => {
    try {
        if (req.user.id !== 1) {
            createError(400, "You are not admin")
        }
        const allBooking = await bookingService.getAllBooking()
        res.status(200).json({ allBooking })
    } catch (error) {
        console.log(error)
        next(error)
    }
}





module.exports = bookingController