import { useEffect, useState } from "react"
import bookingApi from "../../../apis/booking-api"
import Button from "../../../components/Button"
import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import useCar from "../../../hooks/useCar"
import TimeForm from "../../createBooking/components/TimeForm"
import { DAY, MONTHNUM, TIME } from "../../../constants"
import dayjs from 'dayjs'
import useBooking from "../../../hooks/useBooking"
import carApi from "../../../apis/car-api"

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
    const [searchParams] = useSearchParams()

    const pickUp = searchParams.get("pickUp")
    const dropOff = searchParams.get("dropOff")
    const carId = searchParams.get("carId")
    const path = searchParams.get("path")


    const { allCarData } = useCar()
    const { myBooking, setMyBooking, getAllBookingFunctionOutUseEffect } = useBooking()

    const [currentCar, setCurrentCar] = useState([])
    const [newBooking, setNewBooking] = useState({})
    const [dateTimeShow, setDateTimeShow] = useState(init)
    const [valueInputTime, setValueInputTime] = useState({})
    const [newArr, SetNewArr] = useState([])

    const date = Date()
    const currentTime = dayjs(date).toISOString()

    useEffect(() => {
        const getBooking = async () => {
            const booking = await bookingApi.getBookingById(bookingId)
            setNewBooking(booking.data)
            SetNewArr([...myBooking])
        }
        getBooking()

    }, [])

    useEffect(() => {

        const car = allCarData.filter(item => item.id === +carId)
        setCurrentCar(car[0])

        const timeP = dayjs(`${pickUp}`).get('hour')
        const dayP = dayjs(`${pickUp}`).get("date")
        const monthP = dayjs(`${pickUp}`).get("month")
        const yearP = dayjs(`${pickUp}`).get("year")

        const timeD = dayjs(`${dropOff}`).get('hour')
        const dayD = dayjs(`${dropOff}`).get("date")
        const monthD = dayjs(`${dropOff}`).get("month")
        const yearD = dayjs(`${dropOff}`).get("year")




        setDateTimeShow({
            ...dateTimeShow, yearDropOff: yearD, monthDropOff: monthD,
            dayDropOff: dayD, timeDropOff: timeD, yearPickUp: yearP, monthPickUp: monthP,
            dayPickUp: dayP, timePickUp: timeP
        })

        const valueTimeInit = {
            datePickUpInput: `${dateTimeShow.yearPickUp}-${MONTHNUM[dateTimeShow.monthPickUp]}-${DAY[dateTimeShow.dayPickUp]}`,
            dateDropOffInput: `${dateTimeShow.yearDropOff}-${MONTHNUM[dateTimeShow.monthDropOff]}-${DAY[dateTimeShow.dayDropOff]}`,
            timePickUpInput: `${TIME[dateTimeShow.timePickUp]}`,
            timeDropOffInput: `${TIME[dateTimeShow.timeDropOff]}`
        }
        setValueInputTime(valueTimeInit)

    }, [newBooking])


    const handleClickEditNow = async () => {
        if (!valueInputTime.datePickUpInput || !valueInputTime.timePickUpInput || !valueInputTime.dateDropOffInput || !valueInputTime.timeDropOffInput) {
            return alert("ERROR !! You have to select Date-Time PickUp and Date-Time Drop off")
        }

        const newDatePickUp = dayjs(`${valueInputTime.datePickUpInput} ${valueInputTime.timePickUpInput}`).toISOString()
        const newDateDropOff = dayjs(`${valueInputTime.dateDropOffInput} ${valueInputTime.timeDropOffInput}`).toISOString()
        // Check time update brfore 5 houes or not

        const limitTimeForUpdate = dayjs(currentTime).add(5, 'hour').toISOString()

        if (newDatePickUp < limitTimeForUpdate) {
            return alert("Reservations must be made 5 hours before pick-up time")
        }

        if (newDateDropOff <= newDatePickUp) {
            return alert("Time drop off must be more than time pick up")
        }

        if (newBooking.date_pick_up !== newDatePickUp || newBooking.date_drop_off !== newDateDropOff) {
            const resAvailableCar = await carApi.getAvailableCar(newDatePickUp, newDateDropOff)
            const availableCar = resAvailableCar.data.result
            const isThisCarIsAvailable = availableCar.findIndex(el => el.id === +carId)

            if (isThisCarIsAvailable < 0) {
                return alert("This car is'n available at this time, You have to change the time")
            }
        }

        // setNewBooking(prev => ({ ...prev, date_pick_up: newDatePickUp }))
        // setNewBooking(prev => ({ ...prev, date_drop_off: newDateDropOff }))
        const result = await bookingApi.updateBooking({ ...newBooking, date_pick_up: newDatePickUp, date_drop_off: newDateDropOff })

        if (path === "/myBooking") {
            const numberListOfArrInMyBooking = myBooking.findIndex(el => el.id === result.data.result.id)
            newArr[numberListOfArrInMyBooking] = result.data.result
            setMyBooking([...newArr])
        }

        if (path === "/allBooking") {
            getAllBookingFunctionOutUseEffect()
        }

        navigate(`${path}`)
    }

    console.log("newBooking.date_drop_off: ", newBooking.date_drop_off)
    console.log("currentTime: ", currentTime)
    console.log("true or false", newBooking.date_drop_off > currentTime)
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

                        {valueInputTime.datePickUpInput && valueInputTime.timePickUpInput &&
                            <TimeForm
                                title="Pick up (month-date-year)"
                                onChangeDate={(e) => setValueInputTime({ ...valueInputTime, datePickUpInput: e.target.value })}
                                onChangeTime={(e) => setValueInputTime({ ...valueInputTime, timePickUpInput: e.target.value })}
                                valueDay={valueInputTime.datePickUpInput}
                                valueTime={valueInputTime.timePickUpInput}
                            />
                        }

                    </div>
                </div>

                <div className="flex gap-5 items-center mt-[2rem]">
                    <div className="bg-pink font-semibold text-xl mt-[-2rem] ">
                        {valueInputTime.dateDropOffInput && valueInputTime.timeDropOffInput &&
                            <TimeForm
                                title="Drop off (month-date-year)"
                                onChangeDate={(e) => setValueInputTime({ ...valueInputTime, dateDropOffInput: e.target.value })}
                                onChangeTime={(e) => setValueInputTime({ ...valueInputTime, timeDropOffInput: e.target.value })}
                                valueDay={valueInputTime.dateDropOffInput}
                                valueTime={valueInputTime.timeDropOffInput}
                            />
                        }
                    </div>
                </div>
                {/* Button */}
                <div className="flex flex-col gap-5 mt-8 ">

                    {newBooking.date_drop_off > currentTime ? <Button text="EDIT NOW" color="green" onClick={handleClickEditNow} /> : null}
                    <Button text="CANCEL" color="red" onClick={() => navigate(`${path}`)} />
                </div>
            </div>

        </section>
    )
}