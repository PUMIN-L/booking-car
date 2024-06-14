const express = require("express");
const bookingController = require("../controllers/booking-controller");
const authenticate = require("../middleware/authenticate-user");

const bookingRoute = express.Router()


bookingRoute.post("/createBooking", authenticate, bookingController.createBooking)
bookingRoute.post("/getMyBooking", authenticate, bookingController.getBookingByUserId)
bookingRoute.delete("/delete/:idBooking", authenticate, bookingController.deleteBooking)
bookingRoute.get("/myBooking/:bookingId", authenticate, bookingController.getBookingById)
bookingRoute.patch("/myBooking/updateBooking", authenticate, bookingController.updateBooking)


module.exports = bookingRoute