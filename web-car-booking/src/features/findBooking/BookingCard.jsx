
import { useEffect, useState } from "react"
import Button from "../../components/Button"
import useCar from "../../hooks/useCar"
import { MONTH } from "../../constants"

function BookingCard({ el, handleClikeDelete, handleClickEdit }) {


    const { allCarData } = useCar()

    const [carInformation, setCarInformation] = useState([])

    const datePickUp = el.date_pick_up.split("").slice(8, 10).join("")
    const dateDropOff = el.date_drop_off.split("").slice(8, 10).join("")
    const monthPickUp = el.date_pick_up.split("").slice(5, 7).join("")
    const monthDropOff = el.date_drop_off.split("").slice(5, 7).join("")
    const timePickUp = el.time_pick_up.split("").slice(11, 16).join("")
    const timeDropOff = el.time_drop_off.split("").slice(11, 16).join("")
    const yearPickUp = el.date_pick_up.split("").slice(0, 4).join("")
    const yearDropOff = el.date_drop_off.split("").slice(0, 4).join("")

    useEffect(() => {
        setCarInformation(allCarData.filter(item => item.id === el.car_id))
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
                        <h2 className="pl-[1.85rem] text-xl font-semibold">{`${MONTH[monthPickUp]} ${datePickUp}, ${yearPickUp} Time ${timePickUp}`}</h2>
                    </div>

                    <div className="flex gap-6 justify-start items-center">
                        <h3 className="text-2xl font-bold">Droup-off</h3>
                        <h2 className="text-xl font-semibold">{`${MONTH[monthDropOff]} ${dateDropOff}, ${yearDropOff} Time ${timeDropOff}`}</h2>
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