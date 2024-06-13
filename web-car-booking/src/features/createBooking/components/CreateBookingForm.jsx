
import Button from "../../../components/Button";
import CarCard from "./CarCard";
import TimeForm from "./TimeForm";
import useBooking from "../../../hooks/useBooking"
import useCar from "../../../hooks/useCar";
import dayjs from 'dayjs'
import { useState } from "react";

const dataDateAndTimeInit = {
    datePickUp: "",
    timePickUp: "",
    dateDropOff: "",
    timeDropOff: ""
}

export default function CreateBookingForm() {

    const { dataCreateBooking, setDataCreateBooking } = useBooking()
    const { allCarData } = useCar()

    const car = allCarData

    const [dataDateAndTime, setDataDateAndTime] = useState(dataDateAndTimeInit)

    const handleOnSubmit = (e) => {
        e.preventDefault()
        // console.log(dataCreateBooking)
        // console.log("dateJSP", dataCreateBooking.date_pick_up)
        // console.log("timeJSP", dataCreateBooking.time_pick_up)
        // console.log("ConTimeP", dayjs(`${dataCreateBooking.time_pick_up}`))
        // console.log("dateJSD", dataCreateBooking.date_drop_off)
        // console.log("timeJSD", dataCreateBooking.time_drop_off)
        // console.log("ConTimeD", dayjs(`${dataCreateBooking.time_drop_off}`))
    }


    const handleClickSearch = () => {
        if (!dataDateAndTime.datePickUp || !dataDateAndTime.timePickUp || !dataDateAndTime.dateDropOff || !dataDateAndTime.timeDropOff) {
            return alert("ERROR !! You have to select Date-Time PickUp and Date-Time Drop off")
        }
        const dateTimePickUp = `${dataDateAndTime.datePickUp} ${dataDateAndTime.timePickUp}`
        const dateTimePickUpDayJs = dayjs(dateTimePickUp).toISOString()

        const dateTimeDropOff = `${dataDateAndTime.dateDropOff} ${dataDateAndTime.timeDropOff}`
        const dateTimeDropOffDayJs = dayjs(dateTimeDropOff).toISOString()

        console.log(dataDateAndTime)

        setDataCreateBooking(prev => ({ ...prev, "date_pick_up": dateTimePickUpDayJs }))
        setDataCreateBooking(prev => ({ ...prev, "time_pick_up": dateTimePickUpDayJs }))
        setDataCreateBooking(prev => ({ ...prev, "date_drop_off": dateTimeDropOffDayJs }))
        setDataCreateBooking(prev => ({ ...prev, "time_drop_off": dateTimeDropOffDayJs }))
    }




    return (
        <>
            <div className="max-w-[60rem] min-w-[30rem] bg-neutral text-slate-300 p-12 rounded-xl m-auto border-4 ">
                <form
                    onSubmit={handleOnSubmit}
                    className="m-auto  w-[20rem]"
                >
                    <h1 className="text-x font-bold text-4xl ">Create booking</h1>
                    <TimeForm
                        title="Pick-up (date and time)"
                        onChangeDate={e => setDataDateAndTime({ ...dataDateAndTime, datePickUp: e.target.value })}
                        onChangeTime={(e) => setDataDateAndTime({ ...dataDateAndTime, timePickUp: e.target.value })}
                        valueDay={dataDateAndTime.datePickUp}
                        valueTime={dataDateAndTime.timePickUp}

                    />
                    <TimeForm
                        title="Return (date and time)"
                        onChangeDate={(e) => setDataDateAndTime({ ...dataDateAndTime, dateDropOff: e.target.value })}
                        onChangeTime={(e) => setDataDateAndTime({ ...dataDateAndTime, timeDropOff: e.target.value })}
                        valueDay={dataDateAndTime.dateDropOff}
                        valueTime={dataDateAndTime.timeDropOff}

                    />
                    <div className="mt-8">
                        <Button type="submit" text="Search" color="green" onClick={handleClickSearch} />
                    </div>

                </form>
            </div>
            <div className="max-w-[30rem] min-w-[30rem] h-[30rem] p-4 rounded-xl m-auto overflow-auto">
                {
                    car.map(el => {
                        return <CarCard
                            key={el.id}
                            el={el}
                            img_car={`http://localhost:8288/${el.img_car}`}
                        />

                    })
                }
            </div>
        </>
    )
}


// const
// var d = new Date(e.target.value)
// var day = dayjs(d)
// console.log(day.$d)
// const test = dayjs('2018-04-04T16:00:00.000Z')
// console.log("test", test)

// const handleDatePickUp = (e) => {
//     // console.log(e.target.value)
//     const datePickUp = dayjs(e.target.value).toISOString()
//     // console.log(datePickUp)
//     setDataCreateBooking({ ...dataCreateBooking, "date_pick_up": datePickUp })
// }

// const handleTimePickUp = (e) => {
//     console.log(e.target.value)
//     const timePickUp = dayjs(`2018-08-22T${e.target.value}`).toISOString()
//     console.log(timePickUp)
//     // setDataCreateBooking({ ...dataCreateBooking, "time_pick_up": e.target.value })
// }