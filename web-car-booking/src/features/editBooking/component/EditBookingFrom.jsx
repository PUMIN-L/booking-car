import { useEffect, useState } from "react"
import bookingApi from "../../../apis/booking-api"
import Button from "../../../components/Button"
import { useNavigate, useParams } from "react-router-dom"
import useCar from "../../../hooks/useCar"
import TimeForm from "../../createBooking/components/TimeForm"
import { DAY, MONTHNUM, TIME } from "../../../constants"
import dayjs from 'dayjs'
import useBooking from "../../../hooks/useBooking"

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

export default function EditBookingFrom() {

    const navigate = useNavigate()

    const { bookingId } = useParams()
    const { allCarData } = useCar()
    const { myBooking, setMyBooking } = useBooking()

    const [currentCar, setCurrentCar] = useState([])
    const [currentBooking, setCurrentBooking] = useState({})
    const [newBooking, setNewBooking] = useState({})
    const [dateTimeShow, setDateTimeShow] = useState(init)
    const [valueInputTime, setValueInputTime] = useState({})
    const [newArr, SetNewArr] = useState([])

    useEffect(() => {
        const getBooking = async () => {
            const booking = await bookingApi.getBookingById(bookingId)
            setCurrentBooking(booking.data)
            setNewBooking(booking.data)
            SetNewArr([...myBooking])
        }
        getBooking()



    }, [])

    useEffect(() => {
        console.log("booking", currentBooking)
        const car = allCarData.filter(item => item.id === currentBooking.car_id)
        setCurrentCar(car[0])

        const timeP = dayjs(`${currentBooking.date_pick_up}`).get('hour')
        const dayP = dayjs(`${currentBooking.date_pick_up}`).get("date")
        const monthP = dayjs(`${currentBooking.date_pick_up}`).get("month")
        const yearP = dayjs(`${currentBooking.date_pick_up}`).get("year")

        const timeD = dayjs(`${currentBooking.date_drop_off}`).get('hour')
        const dayD = dayjs(`${currentBooking.date_drop_off}`).get("date")
        const monthD = dayjs(`${currentBooking.date_drop_off}`).get("month")
        const yearD = dayjs(`${currentBooking.date_drop_off}`).get("year")

        setDateTimeShow(prev => ({ ...prev, timePickUp: timeP }))
        setDateTimeShow(prev => ({ ...prev, dayPickUp: dayP }))
        setDateTimeShow(prev => ({ ...prev, monthPickUp: monthP }))
        setDateTimeShow(prev => ({ ...prev, yearPickUp: yearP }))
        setDateTimeShow(prev => ({ ...prev, timeDropOff: timeD }))
        setDateTimeShow(prev => ({ ...prev, dayDropOff: dayD }))
        setDateTimeShow(prev => ({ ...prev, monthDropOff: monthD }))
        setDateTimeShow(prev => ({ ...prev, yearDropOff: yearD }))

        const valueTimeInit = {
            datePickUpInput: `${dateTimeShow.yearPickUp}-${MONTHNUM[dateTimeShow.monthPickUp]}-${DAY[dateTimeShow.dayPickUp]}`,
            dateDropOffInput: `${dateTimeShow.yearDropOff}-${MONTHNUM[dateTimeShow.monthDropOff]}-${DAY[dateTimeShow.dayDropOff]}`,
            timePickUpInput: `${TIME[dateTimeShow.timePickUp]}`,
            timeDropOffInput: `${TIME[dateTimeShow.timeDropOff]}`
        }
        setValueInputTime(valueTimeInit)


    }, [currentBooking])

    useEffect(() => {
        console.log("car", currentCar)
        console.log("Value-input", valueInputTime)
        // console.log("currentBooking", currentBooking)
    }, [currentCar, valueInputTime, currentBooking])

    const onChangeDatePickUpFunction = (e) => {
        setValueInputTime({ ...valueInputTime, datePickUpInput: e.target.value })
    }

    const onChangeTimePickUpFunction = (e) => {
        setValueInputTime({ ...valueInputTime, timePickUpInput: e.target.value })
    }

    const onChangeDateDropOffFunction = (e) => {
        setValueInputTime({ ...valueInputTime, dateDropOffInput: e.target.value })
    }

    const onChangeTimeDropOffFunction = (e) => {
        setValueInputTime({ ...valueInputTime, timeDropOffInput: e.target.value })
    }


    const handleClickEditNow = async () => {
        if (!valueInputTime.datePickUpInput || !valueInputTime.timePickUpInput || !valueInputTime.dateDropOffInput || !valueInputTime.timeDropOffInput) {
            return alert("ERROR !! You have to select Date-Time PickUp and Date-Time Drop off")
        }
        const newDatePickUp = dayjs(`${valueInputTime.datePickUpInput} ${valueInputTime.timePickUpInput}`).toISOString()
        const newDateDropOff = dayjs(`${valueInputTime.dateDropOffInput} ${valueInputTime.timeDropOffInput}`).toISOString()
        console.log("newDatePickUp", newDatePickUp)
        console.log("newDateDropOff", newDateDropOff)

        setNewBooking(prev => ({ ...prev, date_pick_up: newDatePickUp }))
        setNewBooking(prev => ({ ...prev, date_drop_off: newDateDropOff }))

        console.log("AfterClickEditNow", { ...newBooking, date_pick_up: newDatePickUp, date_drop_off: newDateDropOff })
        const result = await bookingApi.updateBooking({ ...newBooking, date_pick_up: newDatePickUp, date_drop_off: newDateDropOff })
        console.log("result", result)
        const number = myBooking.findIndex(el => el.id === result.data.result.id)
        console.log("numberrr", number)
        newArr[number] = result.data.result
        setMyBooking([...newArr])
        navigate("/mybooking")
    }


    return (
        <section className="flex gap-16 p-8 m-auto mt-10 border-4 rounded-3xl max-w-[57rem]">
            <div>
                <h1
                    className=" font-bold text-5xl m-2"
                >
                    {`${currentCar?.brand} ${currentCar?.model}`}
                </h1>
                <h2
                    className="font-bold text-4xl m-2"
                >
                    {`${currentCar?.license_plate}`}
                </h2>
                <div className="m-2 mt-5 w-[25rem] h-[20rem]  rounded-2xl">

                    <img

                        src={`http://localhost:8288/${currentCar?.img_car}`}
                        className="max-w-[30rem] max-h-[20rem] w-full object-cover rounded-2xl"
                    />
                </div>

            </div>

            {/* TEXT */}
            <div className="mt-4">
                <h3
                    className=" font-bold text-3xl"
                >
                    Edit Booking
                </h3>
                <div className="flex gap-5 items-center mt-5">

                    <div className="bg-pink font-semibold text-xl mt-[-2rem] ">

                        <TimeForm
                            title="Pick up (month-date-year)"
                            onChangeDate={(e) => onChangeDatePickUpFunction(e)}
                            onChangeTime={(e) => onChangeTimePickUpFunction(e)}
                            valueDay={valueInputTime.datePickUpInput}
                            valueTime={valueInputTime.timePickUpInput}
                        />

                    </div>
                </div>

                <div className="flex gap-5 items-center mt-[2rem]">
                    <div className="bg-pink font-semibold text-xl mt-[-2rem] ">
                        <TimeForm
                            title="Drop off (month-date-year)"
                            onChangeDate={(e) => onChangeDateDropOffFunction(e)}
                            onChangeTime={(e) => onChangeTimeDropOffFunction(e)}
                            valueDay={valueInputTime.dateDropOffInput}
                            valueTime={valueInputTime.timeDropOffInput}
                        />
                    </div>
                </div>
                {/* Button */}
                <div className="flex flex-col gap-5 mt-8 ">
                    <Button text="EDIT NOW" color="green" onClick={handleClickEditNow} />
                    <Button text="CANCEL" color="red" onClick={() => navigate("/myBooking")} />
                </div>
            </div>

        </section>
    )
}





