import Joi from "joi"

const registerSchema = Joi.object(
    {
        first_name: Joi.string().required().trim().messages({ "string.empty": "First name is require" }),
        last_name: Joi.string().required().trim().messages({ "string.empty": "Last name is require" }),
        department_id: Joi.number().integer().required().messages({ "number.base": "Department is require" }),
        password: Joi.string().required().min(6).messages({ "string.empty": "Password is require" }),
        confirm_password: Joi.string().required().valid(Joi.ref("password")).messages({ "any.only": "Confiem is invalid" }).messages({ "string.empty": "Confirm password is require" }),
        employee_id: Joi.alternatives([Joi.string().min(3), ""]),
        mobile_phone: Joi.string().required().min(10).max(10).messages({ "string.empty": "Mobile is require" }).messages({ "string.min": "Mobile is invalid" }),
        email: Joi.alternatives([Joi.string().email({ tlds: false }), Joi.string().trim().valid("").empty("")]),
        img_user: Joi.string().valid("").empty("").default(null)
    }
)


const validatorRegister = (input) => {
    const { error } = registerSchema.validate(input, { abortEarly: false })
    console.dir(error)
    if (error) {
        const result = error.details.reduce((acc, el) => {
            acc[el.path[0]] = el.message
            return acc
        }, {})

        if (result["password"]) {
            result.confirm_password = "Confirm password is invalid"
        }
        if (!result) {
            result.confirm_password = undefined
        }
        return result
    }
}

export default validatorRegister