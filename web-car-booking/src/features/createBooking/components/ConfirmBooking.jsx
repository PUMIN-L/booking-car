import { useNavigate } from "react-router-dom"
import Button from "../../../components/Button";
import useCar from "../../../hooks/useCar";
import { useEffect } from "react";
import useBooking from "../../../hooks/useBooking";
import Footer from "./Footer";
import { MONTH, TIME } from "../../../constants";




export default function ConfirmBooking() {

    const navigate = useNavigate()

    const { getCatById, currentCar, saveCarToBooking } = useCar()
    const { dataCreateBooking } = useBooking()

    const monthPickUp = dataCreateBooking.date_pick_up.split("").slice(5, 7).join("")
    const monthDropOff = dataCreateBooking.date_drop_off.split("").slice(5, 7).join("")
    const dayPickUp = dataCreateBooking.date_pick_up.split("").slice(8, 10).join("")
    const dayDropOff = dataCreateBooking.date_drop_off.split("").slice(8, 10).join("")

    useEffect(() => {
        getCatById()
        saveCarToBooking()
        const date = new Date(2024 - 5 - 6)
        console.log(date)
    }, [])

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
                            {` ${MONTH[monthPickUp]} ${dayPickUp}, 2024 - Time ${TIME[dataCreateBooking.time_pick_up]} `}
                        </h2>
                    </div>

                    <div className=" border-l-2 ml-[0.35rem] h-16 border-neutral-400"></div>


                    <div className="flex gap-5 items-center mt-[-0.1rem]">
                        <p className="mt-[-0.2rem] text-2xl">o</p>
                        <h2 className="bg-pink font-semibold text-2xl ">
                            {` ${MONTH[monthDropOff]} ${dayDropOff}, 2024 - Time ${TIME[dataCreateBooking.time_drop_off]} `}
                        </h2>
                    </div>
                    {/* Button */}
                    <div className="flex flex-col gap-5 mt-8 ">
                        <Button text="BOOK NOW" color="green" type="submit" />
                        <Button text="CANCEL" color="red" onClick={() => navigate("/")} />
                    </div>
                </div>

            </section>
            <Footer />
        </>
    )
}
