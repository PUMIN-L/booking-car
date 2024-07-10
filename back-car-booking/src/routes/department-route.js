const express = require("express")
const departmentController = require("../controllers/department-controller")

const departmentRouter = express.Router()

departmentRouter.get("/", departmentController.getMoney)
departmentRouter.patch("/updateMoney", departmentController.updateMoney)

module.exports = departmentRouter