import { useNavigate, useParams, useSearchParams } from "react-router-dom"
import Button from "../../../components/Button";
import { useEffect, useState } from "react";
import { MONTH, TIME } from "../../../constants";
import bookingApi from "../../../apis/booking-api";
import dayjs from 'dayjs'
import { useStore } from "../../../store/useStore";

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
    let { carId } = useParams()
    const [searchParams] = useSearchParams()

    const pickUp = searchParams.get("pickUp")
    const dropOff = searchParams.get("dropOff")

    const currentCarStore = useStore((store) => store.currentCar)
    const setDataDateAndTime = useStore((state) => state.setDataDateAndTime)
    const dataCreateBooking = useStore((state) => state.dataCreateBooking)
    const setDataCreateBooking = useStore((state) => state.setDataCreateBooking)
    const myBooking = useStore((state) => state.myBooking.data)
    const setMyBooking = useStore((state) => state.setMyBooking)
    const setIsShowText = useStore((state) => state.setIsShowText)

    const [dateTimeShowConfirm, setDateTimeShowConfirm] = useState(init)

    useEffect(() => {
        setDataCreateBooking({ ...dataCreateBooking, car_id: +carId })
        const timeP = dayjs(`${pickUp}`).get('hour')
        const dayP = dayjs(`${pickUp}`).get("date")
        const monthP = dayjs(`${pickUp}`).get("month")
        const yearP = dayjs(`${pickUp}`).get("year")

        const timeD = dayjs(`${dropOff}`).get('hour')
        const dayD = dayjs(`${dropOff}`).get("date")
        const monthD = dayjs(`${dropOff}`).get("month")
        const yearD = dayjs(`${dropOff}`).get("year")

        setDataCreateBooking(prev => ({ ...prev, "date_drop_off": dropOff, "date_pick_up": pickUp }))

        setDateTimeShowConfirm(prev => ({
            ...prev, yearDropOff: yearD, timePickUp: timeP
            , dayPickUp: dayP, monthPickUp: monthP, yearPickUp: yearP, timeDropOff: timeD,
            dayDropOff: dayD, monthDropOff: monthD
        }))

    }, [])

    const handleClickBookNow = async () => {
        const result = await bookingApi.createBooking(dataCreateBooking)
        //
        setMyBooking(result.data.result)
        setDataDateAndTime({
            timeDropOff: "", date_pick_up: "",
            date_drop_off: "", datePickUp: "", timePickUp: "", dateDropOff: ""
        })
        setIsShowText(false)
        setDataCreateBooking({ ...dataCreateBooking, date_pick_up: "", date_drop_off: "" })
        navigate("/myBooking")
    }

    return (
        <>
            <section className="flex gap-16 p-8 m-auto mt-10 border-4 rounded-3xl max-w-[57rem]">
                <div>
                    <h1
                        className=" font-bold text-5xl m-2"
                    >{`${currentCarStore.brand} ${currentCarStore.model}`}
                    </h1>
                    <h2
                        className="font-bold text-4xl m-2"
                    >
                        {`${currentCarStore.license_plate}`}
                    </h2>
                    <div className="m-2 mt-5 w-[25rem] h-[20rem]  rounded-2xl">
                        <img
                            src={`http://localhost:8288/${currentCarStore.img_car}`}
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

        </>
    )
}
