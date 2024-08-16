
import { useEffect, useState } from "react"
import Button from "../../components/Button"
import { MONTH, TIME } from "../../constants"
import dayjs from 'dayjs'
import { useNavigate } from "react-router-dom"
import { useStore } from "../../store/useStore"


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

function BookingCard({ el, handleClikeDelete, path, confirmStatus = "no", handleClickConfirm }) {

    const navigate = useNavigate()

    const allCarDataStore = useStore((state) => state.allCar.data)
    const allUserStore = useStore((state) => state.allUser.data)


    const [carInformation, setCarInformation] = useState([])
    const [dateTimeShow, setDateTimeShow] = useState(init)
    const [user, setUser] = useState("")

    const date = Date()
    const currentTime = dayjs(date).toISOString()

    useEffect(() => {
        setCarInformation(allCarDataStore.filter(item => item.id === el.car_id))

        const timeP = dayjs(`${el.date_pick_up}`).get('hour')
        const dayP = dayjs(`${el.date_pick_up}`).get("date")
        const monthP = dayjs(`${el.date_pick_up}`).get("month")
        const yearP = dayjs(`${el.date_pick_up}`).get("year")

        const timeD = dayjs(`${el.date_drop_off}`).get('hour')
        const dayD = dayjs(`${el.date_drop_off}`).get("date")
        const monthD = dayjs(`${el.date_drop_off}`).get("month")
        const yearD = dayjs(`${el.date_drop_off}`).get("year")

        setDateTimeShow({
            ...dateTimeShow, yearDropOff: yearD,
            dayPickUp: dayP, timePickUp: timeP, monthPickUp: monthP,
            yearPickUp: yearP, timeDropOff: timeD, dayDropOff: dayD, monthDropOff: monthD
        })
        const dataUser = allUserStore.filter(user => user.id === el.user_id)
        setUser(dataUser)

    }, [allUserStore])


    const handleClickEdit = (el) => {
        navigate(`/myBooking/editMyBooking/${el.id}?pickUp=${el.date_pick_up}&dropOff=${el.date_drop_off}&carId=${el.car_id}&path=${path}`)
    }

    return (
        <div
            className="flex m-auto w-11/12 bg-neutral-950 rounded-2xl 
        items-center justify-between shadow-[0_0_6px_rgb(0,0,0,0.2)]"
        >
            <div className=" bg-neutral w-[14rem] h-[10rem] object-cover flex items-center justify-center rounded-l-2xl">
                <img
                    className="w-full h-full object-cover rounded-l-2xl"
                    src={`http://localhost:8288/${carInformation[0]?.img_car}`} />
            </div>

            <div>
                <div className=" p-2">
                    {/* USER ***********************/}
                    <div className="flex gap-6 justify-start items-center mb-2 ">
                        {path === "/myBooking" ? null : user ? <h3 className="text-2xl font-bold text-neutral-content">{`USER : ${user[0]?.first_name}`}</h3> : null}
                    </div>


                    <div className="flex gap-6 justify-start items-center  mb-2">
                        <h3 className="text-2xl font-bold text-neutral-content">Pick-up</h3>
                        <h2 className="pl-[1.85rem] text-xl text-neutral-content font-semibold">
                            {` ${MONTH[dateTimeShow.monthPickUp] || "--"} ${dateTimeShow.dayPickUp || "--"},
                             ${dateTimeShow.yearPickUp || "----"} - Time ${TIME[dateTimeShow.timePickUp] || "--:--"} `}
                        </h2>
                    </div>

                    <div className="flex gap-6 justify-start items-center">
                        <h3 className="text-2xl font-bold text-neutral-content">Droup-off</h3>
                        <h2 className="text-xl font-semibold text-neutral-content">
                            {` ${MONTH[dateTimeShow.monthDropOff] || "--"} ${dateTimeShow.dayDropOff || "--"}, 
                            ${dateTimeShow.yearDropOff || "----"} - Time ${TIME[dateTimeShow.timeDropOff] || "--:--"} `}
                        </h2>
                    </div>
                </div>

            </div>
            {/* right */}
            <div className=" min-w-[12rem] p-2 mr-5 flex flex-col gap-2 my-2 ">
                <h2 className="text-2xl font-bold text-neutral-content">Status</h2>
                <h2 className="text-2xl font-bold text-neutral-content">{el.status}</h2>
                <div className="flex gap-2 ">

                    {el.date_drop_off < currentTime ? <Button text="View" color="green" onClick={() => handleClickEdit(el)} /> :
                        confirmStatus === "no" && <Button text="Edit" color="green" onClick={() => handleClickEdit(el)} />}

                    {confirmStatus === "yes" && <Button text="Confirm" color="green" onClick={() => handleClickConfirm(el.id)} />}

                    {path === "/myBooking" && el.date_drop_off < currentTime ? null :
                        <Button text="Delete" color="red" onClick={() => handleClikeDelete(el.id)} />}
                </div>
            </div>
        </div>
    )
}

export default BookingCard