import { useEffect } from "react"
import useBooking from "../../hooks/useBooking"
import useCar from "../../hooks/useCar"

import BookingCard from "./BookingCard"
import Footer from "../createBooking/components/Footer"

export default function MyBooking() {

    const { myBooking } = useBooking()
    const { allCarData } = useCar()

    useEffect(() => {
        console.log(myBooking)
        console.log(allCarData.filter(el => el.id === 1))
    }, [])

    return (
        <>
            <h1 className=" w-[57.8rem]  m-auto mt-10 mb-2 font-semibold text-4xl">My Booking Information</h1>
            <div className="  max-w-[65rem] m-auto flex flex-col gap-3 p-5 pb-10 ">
                {myBooking.map(el => <BookingCard key={el.id} el={el} />)}
            </div>


        </>
    )
}