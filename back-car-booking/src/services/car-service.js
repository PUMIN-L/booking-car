const prisma = require("../models/prisma")

const carService = {}

carService.createCar = data => prisma.cars.create({ data })
carService.getAllCar = () => prisma.cars.findMany()
carService.getCarById = (id) => prisma.cars.findUnique({ where: { id } })

carService.getAvailableCar = (pickUp, dropOff) => prisma.$queryRaw`
select c.id, c.type_id, c.brand, c.model, c.transmission, c.color, c.license_plate, c.img_car from cars as c left join 
( select car_id,id from reservations where date_pick_up <= ${pickUp}  and date_drop_off > ${pickUp} 
 and date_pick_up < ${dropOff}  and date_drop_off <= ${dropOff} ) as t1 on t1.car_id = c.id
left join (select car_id from reservations where date_pick_up <= ${pickUp}   and date_drop_off >= ${dropOff} 
and date_pick_up < ${dropOff}   and date_drop_off > ${pickUp} ) as t2 on t2.car_id = c.id
left join (select car_id from reservations where date_pick_up >= ${pickUp}  and date_drop_off < ${dropOff}
 and date_drop_off > ${pickUp}  and date_pick_up < ${dropOff} ) as t3 on t3.car_id = c.id
 left join (select car_id from reservations where date_pick_up >= ${pickUp} and date_drop_off > ${dropOff} 
 and date_pick_up <= ${dropOff} and date_drop_off > ${pickUp} ) as t4 on t4.car_id = c.id
 left join (select car_id,id from reservations where date_pick_up = ${pickUp} and date_drop_off = ${dropOff})
 as t5 on t4.car_id = c.id where t1.car_id is null and t2.car_id is null and t3.car_id is null and t4.car_id is null and t5.car_id is null  `

module.exports = carService

