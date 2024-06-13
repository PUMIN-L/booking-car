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
    }, [currentBooking])

    useEffect(() => {
        console.log("car", currentCar)
    }, [currentCar])



    const handleClickEditNow = () => {
        console.log("Click Edit Now")
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
                    {/* <p className="mt-[-0.2rem] text-2xl">o</p> */}
                    <div className="bg-pink font-semibold text-xl mt-[-2rem] ">

                        <TimeForm
                            title="Pick up"
                        // onChangeDate={(e) => setDataDateAndTime({ ...dataDateAndTime, dateDropOff: e.target.value })}
                        // onChangeTime={(e) => setDataDateAndTime({ ...dataDateAndTime, timeDropOff: e.target.value })}
                        // valueDay={dataDateAndTime.dateDropOff}
                        // valueTime={dataDateAndTime.timeDropOff}

                        />
                        {/* {` ${MONTH[showDataBooking.monthPickUp] || "--"} ${showDataBooking.dayPickUp || "--"}, 2024 - Time ${dataCreateBooking?.time_pick_up || "--:--"} `} */}
                    </div>
                </div>

                {/* <div className=" border-l-2 ml-[0.35rem] h-16 border-neutral-400"></div> */}


                <div className="flex gap-5 items-center mt-[2rem]">
                    {/* <p className="mt-[-0.2rem] text-2xl">o</p> */}
                    <div className="bg-pink font-semibold text-xl mt-[-2rem] ">
                        <TimeForm
                            title="Drop off"
                        // onChangeDate={(e) => setDataDateAndTime({ ...dataDateAndTime, dateDropOff: e.target.value })}
                        // onChangeTime={(e) => setDataDateAndTime({ ...dataDateAndTime, timeDropOff: e.target.value })}
                        // valueDay={dataDateAndTime.dateDropOff}
                        // valueTime={dataDateAndTime.timeDropOff}

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





