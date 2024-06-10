const Joi = require("joi")

exports.validateCarSchema = Joi.object({
    img_car: Joi.alternatives([Joi.string(), Joi.string().trim().valid("").empty("").default(null)]),
    type_id: Joi.number().integer().required(),
    brand: Joi.string().required(),
    model: Joi.string().required(),
    transmission: Joi.string().required(),
    color: Joi.string().required(),
    license_plate: Joi.string().required()
})