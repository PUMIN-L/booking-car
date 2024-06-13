
import { useEffect, useState } from "react"
import Button from "../../components/Button"
import useCar from "../../hooks/useCar"
import { MONTH, TIME } from "../../constants"
import dayjs from 'dayjs'
import MyBooking from "./MyBooking"

const init = {
    dayPickUp: "",
    monthPickUp: "",
    yearPickUp: "",
    timePickUp: "",
    dayDropOff: "",
    monthDropOff: "",
    yearDropOff: "",
    timeDropOff: "",
}

function BookingCard({ el, handleClikeDelete, handleClickEdit }) {


    const { allCarData } = useCar()

    const [carInformation, setCarInformation] = useState([])
    const [dateTimeShow, setDateTimeShow] = useState(init)

    const datePickUp = dayjs(el.date_pick_up).get('date')
    const dateDropOff = dayjs(el.date_drop_off).get('date')
    const monthPickUp = dayjs(el.date_pick_up).get('month')
    const monthDropOff = dayjs(el.date_drop_off).get('month')
    const timePickUp = dayjs(el.time_pick_up).get("hour")
    const timeDropOff = el.time_drop_off.split("").slice(11, 16).join("")
    const yearPickUp = el.date_pick_up.split("").slice(0, 4).join("")
    const yearDropOff = el.date_drop_off.split("").slice(0, 4).join("")
    // console.log("day-js-datePickUp", datePickUp)
    // console.log("ddddddddddd")
    // console.log(typeof (datePickUp))
    // const datePickUp = el.date_pick_up.split("").slice(8, 10).join("")
    // const dateDropOff = el.date_drop_off.split("").slice(8, 10).join("")
    // const monthPickUp = el.date_pick_up.split("").slice(5, 7).join("")
    // const monthDropOff = el.date_drop_off.split("").slice(5, 7).join("")
    // const timePickUp = el.time_pick_up.split("").slice(11, 16).join("")
    // const timeDropOff = el.time_drop_off.split("").slice(11, 16).join("")
    // const yearPickUp = el.date_pick_up.split("").slice(0, 4).join("")
    // const yearDropOff = el.date_drop_off.split("").slice(0, 4).join("")

    useEffect(() => {
        setCarInformation(allCarData.filter(item => item.id === el.car_id))
        console.log(el)
        const timeP = dayjs(`${el.date_pick_up}`).get('hour')
        const dayP = dayjs(`${el.date_pick_up}`).get("date") // 6 //06
        const monthP = dayjs(`${el.date_pick_up}`).get("month") // 5 //June
        const yearP = dayjs(`${el.date_pick_up}`).get("year") // 2024

        const timeD = dayjs(`${el.date_drop_off}`).get('hour')
        const dayD = dayjs(`${el.date_drop_off}`).get("date") // 6 //06
        const monthD = dayjs(`${el.date_drop_off}`).get("month") // 5 //June
        const yearD = dayjs(`${el.date_drop_off}`).get("year") // 2024

        setDateTimeShow(prev => ({ ...prev, timePickUp: timeP }))
        setDateTimeShow(prev => ({ ...prev, dayPickUp: dayP }))
        setDateTimeShow(prev => ({ ...prev, monthPickUp: monthP }))
        setDateTimeShow(prev => ({ ...prev, yearPickUp: yearP }))
        setDateTimeShow(prev => ({ ...prev, timeDropOff: timeD }))
        setDateTimeShow(prev => ({ ...prev, dayDropOff: dayD }))
        setDateTimeShow(prev => ({ ...prev, monthDropOff: monthD }))
        setDateTimeShow(prev => ({ ...prev, yearDropOff: yearD }))
        console.log("show", dateTimeShow)
    }, [])

    return (
        <div className="flex m-auto w-11/12 bg-neutral-950 rounded-2xl items-center justify-between shadow-[0_0_6px_rgb(0,0,0,0.2)]">
            <div className=" bg-neutral w-[14rem] h-[10rem] object-cover flex items-center justify-center rounded-l-2xl">
                <img
                    className="w-full h-full object-cover rounded-l-2xl"
                    src={`http://localhost:8288/${carInformation[0]?.img_car}`} />
            </div>

            <div>
                <div className=" p-2">
                    <div className="flex gap-6 justify-start items-center  mb-2">
                        <h3 className="text-2xl font-bold">Pick-up</h3>
                        <h2 className="pl-[1.85rem] text-xl font-semibold">
                            {` ${MONTH[dateTimeShow.monthPickUp] || "--"} ${dateTimeShow.dayPickUp || "--"}, ${dateTimeShow.yearPickUp || "----"} - Time ${TIME[dateTimeShow.timePickUp] || "--:--"} `}
                        </h2>
                    </div>

                    <div className="flex gap-6 justify-start items-center">
                        <h3 className="text-2xl font-bold">Droup-off</h3>
                        <h2 className="text-xl font-semibold">
                            {` ${MONTH[dateTimeShow.monthDropOff] || "--"} ${dateTimeShow.dayDropOff || "--"}, ${dateTimeShow.yearDropOff || "----"} - Time ${TIME[dateTimeShow.timeDropOff] || "--:--"} `}
                        </h2>
                    </div>
                </div>

            </div>
            {/* right */}
            <div className=" min-w-[12rem] p-2 mr-5 flex flex-col gap-2 my-2 ">
                <h2 className="text-2xl font-bold">Status</h2>
                <h2 className="text-2xl font-bold">RESERVED</h2>
                <div className="flex gap-2">
                    <Button text="Edit" color="green" onClick={() => handleClickEdit(el.id)} />
                    <Button text="Delete" color="red" onClick={() => handleClikeDelete(el.id)} />
                </div>
            </div>
        </div>
    )
}

export default BookingCard