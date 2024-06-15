require("dotenv").config()
const express = require("express")
const cors = require("cors")
const errorMiddleware = require("./middleware/error-middleware")
const notFoundMiddleware = require("./middleware/not-found")
const authenticateRoute = require("./routes/authenticate-route")
const carRouter = require("./routes/car-route")
const bookingRoute = require("./routes/booking-route")
const userRouter = require("./routes/user-route")

const app = express()
app.use(cors())

app.use(express.json())
app.use("/public", express.static('public'))

app.use("/auth", authenticateRoute)
app.use("/cars", carRouter)
app.use("/booking", bookingRoute)
app.use("/user", userRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Server ${PORT} is running`))