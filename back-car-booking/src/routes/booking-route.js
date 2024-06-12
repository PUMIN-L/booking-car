const express = require("express");
const bookingController = require("../controllers/booking-controller");

const bookingRoute = express.Router()


bookingRoute.post("/createBooking", bookingController.createBooking)
bookingRoute.post("/getMyBooking", bookingController.getBookingById)


module.exports = bookingRoute