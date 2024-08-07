const prisma = require("../models/prisma")


const userService = {}

userService.createUser = (data) => prisma.users.create({ data })
userService.findUserbyMobileOrEmail = (mobileOrEmail) => prisma.users.findFirst({
    where: {
        OR: [
            { email: mobileOrEmail },
            { mobile_phone: mobileOrEmail }
        ]
    }

})

userService.findUserById = (id) => prisma.users.findUnique({
    where: {
        id
    },
    include: {
        department: true
    }
})

userService.getAllUser = () => prisma.users.findMany()



module.exports = userService 