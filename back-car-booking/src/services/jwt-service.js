const jwt = require("jsonwebtoken")

const jwtService = {}

jwtService.sing = (payload) => jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "20d" })

jwtService.verify = (token) => jwt.verify(token, process.env.JWT_SECRET)

module.exports = jwtService