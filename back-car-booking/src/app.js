require("dotenv").config()

const express = require("express")
const cors = require("cors")
const errorMiddleware = require("./middleware/error-middleware")
const notFoundMiddleware = require("./middleware/not-found")
const authenticateRoute = require("./routes/authenticate-route")
const carRouter = require("./routes/car-route")
const bookingRoute = require("./routes/booking-route")
const userRouter = require("./routes/user-route")
const departmentRouter = require("./routes/department-route")
const stripeRouter = require("./routes/stripe-route")


const app = express()
app.use(cors())

app.use(express.json())
app.use("/public", express.static('public'))

app.use("/auth", authenticateRoute)
app.use("/cars", carRouter)
app.use("/booking", bookingRoute)
app.use("/user", userRouter)
app.use("/department", departmentRouter)
app.use("/", stripeRouter)

app.use(notFoundMiddleware)
app.use(errorMiddleware)

app.use(express.static("public"));
app.use(express.json());



const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Server ${PORT} is running`))



//////////////////////////////////////////
// const nodemailer = require("nodemailer");
// const transporter = nodemailer.createTransport({
//     host: 'smtp.ethereal.email',
//     port: 587,
//     auth: {
//         user: 'colby10@ethereal.email',
//         pass: '8Uw878DAsQQHj21e8N'
//     }
// });

// async..await is not allowed in global scope, must use a wrapper
// async function main() {
//     // send mail with defined transport object
//     const info = await transporter.sendMail({
//         from: 'colby10@ethereal.email', // sender address
//         to: "puminbg@gmail.com", // list of receivers
//         subject: "Hello ✔", // Subject line
//         text: "Hello world?", // plain text body
//         html: "<b>Hello world?</b>", // html body
//     });

//     console.log("Message sent: %s", info.messageId);
//     // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
// }



////////////////////////////////////////////