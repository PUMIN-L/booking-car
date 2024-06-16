const { validateCarSchema } = require("../validators/car-validator")


exports.registerCarValidator = (req, res, next) => {
    const { value, err } = validateCarSchema.validate(req.body)
    if (err) {
        return res.status(400).json({ message: err.details[0].message })
    }
    req.input = value
    next()
}