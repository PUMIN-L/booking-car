import axios from "axios"


const bookingApi = {}

bookingApi.getBookingBiUserId = (data) => axios.post("/booking/getMyBooking", data)

export default bookingApi