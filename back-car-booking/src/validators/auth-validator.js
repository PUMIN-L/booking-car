const Joi = require("joi")

exports.registerSchema = Joi.object({
    first_name: Joi.string().required().trim(),
    last_name: Joi.string().required().trim(),
    department_id: Joi.number().integer().required(),
    password: Joi.string().required().min(6),
    confirm_password: Joi.string().required().valid(Joi.ref("password")).strip(),
    employee_id: Joi.alternatives([Joi.string().min(3), Joi.string().valid("").empty("").default(null)]),
    mobile_phone: Joi.string().required().min(10).max(10),
    email: Joi.alternatives([Joi.string().email({ tlds: false }), Joi.string().trim().valid("").empty("").default(null)]),
    img_user: Joi.alternatives("").strip()
})

exports.loginSchema = Joi.object({
    emailOrMobile: Joi.alternatives([Joi.string().required().min(10).max(10), Joi.string().email({ tlds: false })]),
    password: Joi.string().required().min(6)
})