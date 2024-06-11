import Joi from "joi";

const registerCarSchema = Joi.object({
    type_id: Joi.number().integer().required().messages({ "number.base": "Type car is require" }),
    brand: Joi.string().required().trim().messages({ "string.empty": "Brand of car is require" }),
    model: Joi.string().required().trim().messages({ "string.empty": "Model of car is require" }),
    transmission: Joi.string().required().trim().messages({ "string.empty": "Transmission of car is require" }),
    color: Joi.string().required().trim().messages({ "string.empty": "Color of car is require" }),
    license_plate: Joi.string().required().trim().messages({ "string.empty": "License plate of car is require" })
})

const validatorRegisterCar = (input) => {
    const { error } = registerCarSchema.validate(input, { abortEarly: false })
    console.dir(error)
    if (error) {
        const result = error.details.reduce((acc, el) => {
            acc[el.path[0]] = el.message
            return acc
        }, {})

        return result
    }
}

export default validatorRegisterCar