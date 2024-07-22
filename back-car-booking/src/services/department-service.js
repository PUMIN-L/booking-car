const prisma = require("../models/prisma")

const departmentService = {}

departmentService.getMoney = () => prisma.departments.findUnique({
    where: { id: 9 }
})

departmentService.updateMoney = (data) => prisma.departments.update({ where: { id: 9 }, data })

module.exports = departmentService