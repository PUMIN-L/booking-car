const departmentService = require("../services/department-service")

const departmentController = {}

departmentController.getMoney = async (req, res, next) => {
    try {
        const result = await departmentService.getMoney()
        res.status(200).json({ result: result.name })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

departmentController.updateMoney = async (req, res, next) => {
    try {
        const reqc = req.body
        const response = await departmentService.updateMoney(req.body)
        res.status(200).json({ response })
    } catch (error) {
        console.log(error)
        next(error)
    }
}

module.exports = departmentController