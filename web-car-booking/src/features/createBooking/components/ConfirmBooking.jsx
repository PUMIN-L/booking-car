import { useNavigate } from "react-router-dom"
import Button from "../../../components/Button";
import useCar from "../../../hooks/useCar";
import { useEffect, useState } from "react";
import useBooking from "../../../hooks/useBooking";
import Footer from "./Footer";
import { MONTH, TIME } from "../../../constants";
import bookingApi from "../../../apis/booking-api";
import dayjs from 'dayjs'


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

export default function ConfirmBooking() {

    const navigate = useNavigate()

    const { getCatById, currentCar, saveCarToBooking } = useCar()
    const { dataCreateBooking, setMyBooking, myBooking } = useBooking()

    const [dateTimeShowConfirm, setDateTimeShowConfirm] = useState(init)

    useEffect(() => {
        getCatById()
        saveCarToBooking()

        const timeP = dayjs(`${dataCreateBooking.date_pick_up}`).get('hour')
        const dayP = dayjs(`${dataCreateBooking.date_pick_up}`).get("date") // 6 //06
        const monthP = dayjs(`${dataCreateBooking.date_pick_up}`).get("month") // 5 //June
        const yearP = dayjs(`${dataCreateBooking.date_pick_up}`).get("year") // 2024

        const timeD = dayjs(`${dataCreateBooking.date_drop_off}`).get('hour')
        const dayD = dayjs(`${dataCreateBooking.date_drop_off}`).get("date") // 6 //06
        const monthD = dayjs(`${dataCreateBooking.date_drop_off}`).get("month") // 5 //June
        const yearD = dayjs(`${dataCreateBooking.date_drop_off}`).get("year") // 2024

        setDateTimeShowConfirm(prev => ({ ...prev, timePickUp: timeP }))
        setDateTimeShowConfirm(prev => ({ ...prev, dayPickUp: dayP }))
        setDateTimeShowConfirm(prev => ({ ...prev, monthPickUp: monthP }))
        setDateTimeShowConfirm(prev => ({ ...prev, yearPickUp: yearP }))
        setDateTimeShowConfirm(prev => ({ ...prev, timeDropOff: timeD }))
        setDateTimeShowConfirm(prev => ({ ...prev, dayDropOff: dayD }))
        setDateTimeShowConfirm(prev => ({ ...prev, monthDropOff: monthD }))
        setDateTimeShowConfirm(prev => ({ ...prev, yearDropOff: yearD }))

        console.log("show", dateTimeShowConfirm)
    }, [])

    const handleClickBookNow = async () => {
        const result = await bookingApi.createBooking(dataCreateBooking)
        console.log(result)
        navigate("/myBooking")
        setMyBooking([result.data.result, ...myBooking])
    }

    return (
        <>
            <section className="flex gap-16 p-8 m-auto mt-10 border-4 rounded-3xl max-w-[57rem]">
                <div>
                    <h1
                        className=" font-bold text-5xl m-2"
                    >{`${currentCar.brand} ${currentCar.model}`}
                    </h1>
                    <h2
                        className="font-bold text-4xl m-2"
                    >
                        {`${currentCar.license_plate}`}
                    </h2>
                    <div className="m-2 mt-5 w-[25rem] h-[20rem]  rounded-2xl">
                        <img
                            src={`http://localhost:8288/${currentCar.img_car}`}
                            className="max-w-[30rem] max-h-[20rem] w-full object-cover rounded-2xl"
                        />
                    </div>

                </div>

                {/* TEXT */}
                <div className="mt-28">
                    <h3
                        className=" font-bold text-3xl"
                    >
                        Pick-up and Drop-off
                    </h3>
                    <div className="flex gap-5 items-center mt-5">
                        <p className="mt-[-0.2rem] text-2xl">o</p>
                        <h2 className="bg-pink font-semibold text-2xl">
                            {` ${MONTH[dateTimeShowConfirm.monthPickUp] || "--"} ${dateTimeShowConfirm.dayPickUp || "--"}, ${dateTimeShowConfirm.yearPickUp || "----"} - Time ${TIME[dateTimeShowConfirm.timePickUp] || "--:--"} `}
                        </h2>
                    </div>

                    <div className=" border-l-2 ml-[0.35rem] h-16 border-neutral-400"></div>


                    <div className="flex gap-5 items-center mt-[-0.1rem]">
                        <p className="mt-[-0.2rem] text-2xl">o</p>
                        <h2 className="bg-pink font-semibold text-2xl ">
                            {` ${MONTH[dateTimeShowConfirm.monthDropOff] || "--"} ${dateTimeShowConfirm.dayDropOff || "--"}, ${dateTimeShowConfirm.yearDropOff || "----"} - Time ${TIME[dateTimeShowConfirm.timeDropOff] || "--:--"} `}
                        </h2>
                    </div>
                    {/* Button */}
                    <div className="flex flex-col gap-5 mt-8 ">
                        <Button text="BOOK NOW" color="green" onClick={handleClickBookNow} />
                        <Button text="CANCEL" color="red" onClick={() => navigate("/")} />
                    </div>
                </div>

            </section>
            <Footer />
        </>
    )
}
