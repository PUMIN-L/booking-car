import { useEffect, useState } from "react"
import bookingApi from "../../../apis/booking-api"
import Button from "../../../components/Button"
import { useNavigate, useParams } from "react-router-dom"
import useCar from "../../../hooks/useCar"
import TimeForm from "../../createBooking/components/TimeForm"




export default function EditBookingFrom() {


    const navigate = useNavigate()

    const { bookingId } = useParams()
    const { allCarData } = useCar()

    const [currentCar, setCurrentCar] = useState([])
    const [currentBooking, setCurrentBooking] = useState({})
    const [dataDateAndTime, setDataDateAndTime] = useState({})


    useEffect(() => {
        const getBooking = async () => {
            const booking = await bookingApi.getBookingById(bookingId)
            setCurrentBooking(booking.data)

        }
        getBooking()

    }, [])

    useEffect(() => {
        console.log("booking", currentBooking)
        const car = allCarData.filter(item => item.id === currentBooking.car_id)
        setCurrentCar(car[0])

        const dataDateAndTimeInit = {
            datePickUp: currentBooking?.date_pick_up?.split("").slice(0, 10).join(""),
            timePickUp: currentBooking?.time_pick_up?.split("").slice(11, 16).join(""),
            dateDropOff: currentBooking?.date_drop_off?.split("").slice(0, 10).join(""),
            timeDropOff: currentBooking?.time_drop_off?.split("").slice(11, 16).join("")
        }
        setDataDateAndTime(dataDateAndTimeInit)
    }, [currentBooking])

    useEffect(() => {
        console.log("car", currentCar)

    }, [currentCar])



    const handleClickEditNow = () => {
        if (!dataDateAndTime.datePickUp || !dataDateAndTime.timePickUp || !dataDateAndTime.dateDropOff || !dataDateAndTime.timeDropOff) {
            return alert("ERROR !! You have to select Date-Time PickUp and Date-Time Drop off")
        }
        // const dateTimePickUp = `${dataDateAndTime.datePickUp} ${dataDateAndTime.timePickUp}`
        // const dateTimePickUpDayJs = dayjs(dateTimePickUp).toISOString()

        // const dateTimeDropOff = `${dataDateAndTime.dateDropOff} ${dataDateAndTime.timeDropOff}`
        // const dateTimeDropOffDayJs = dayjs(dateTimeDropOff).toISOString()

        // console.log(dataDateAndTime)

        // setDataCreateBooking(prev => ({ ...prev, "date_pick_up": dateTimePickUpDayJs }))
        // setDataCreateBooking(prev => ({ ...prev, "time_pick_up": dateTimePickUpDayJs }))
        // setDataCreateBooking(prev => ({ ...prev, "date_drop_off": dateTimeDropOffDayJs }))
        // setDataCreateBooking(prev => ({ ...prev, "time_drop_off": dateTimeDropOffDayJs }))
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
                            title="Pick up"
                            onChangeDate={(e) => setDataDateAndTime({ ...dataDateAndTime, datePickUp: e.target.value })}
                            onChangeTime={(e) => setDataDateAndTime({ ...dataDateAndTime, timePickUp: e.target.value })}
                            valueDay={dataDateAndTime.datePickUp}
                            valueTime={dataDateAndTime.timePickUp}

                        />

                    </div>
                </div>

                <div className="flex gap-5 items-center mt-[2rem]">
                    <div className="bg-pink font-semibold text-xl mt-[-2rem] ">
                        <TimeForm
                            title="Drop off"
                            onChangeDate={(e) => setDataDateAndTime({ ...dataDateAndTime, dateDropOff: e.target.value })}
                            onChangeTime={(e) => setDataDateAndTime({ ...dataDateAndTime, timeDropOff: e.target.value })}
                            valueDay={dataDateAndTime.dateDropOff}
                            valueTime={dataDateAndTime.timeDropOff}

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





