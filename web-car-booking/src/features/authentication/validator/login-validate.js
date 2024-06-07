import Joi from "joi"

const loginSchema = Joi.object({
    emailOrMobile: Joi.alternatives([Joi.string().required().min(10).max(10), Joi.string().email({ tlds: false })])
        .messages({ "alternatives.match": "Mobile phone number or Email is invalid" }),
    password: Joi.string().required().min(6).messages({ "string.min": "Password length must be at least 6 characters long" })
})

const validateLogin = (input) => {
    const { error } = loginSchema.validate(input, { abortEarly: false })
    // console.dir(error)
    if (error) {
        const result = error.details.reduce((acc, el) => {
            acc[el.path[0]] = el.message
            return acc
        }, {})
        return result
    }
}

export default validateLogin