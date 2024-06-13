import axios from "axios"


const bookingApi = {}

bookingApi.getBookingByUserId = (data) => axios.post("/booking/getMyBooking", data)
bookingApi.createBooking = (data) => axios.post("booking/createBooking", data)
bookingApi.deleteBookingById = (bookingId) => axios.delete(`/booking/delete/${bookingId}`)
bookingApi.getBookingById = (bookingId) => axios.get(`/booking/myBooking/${bookingId}`)


export default bookingApi 