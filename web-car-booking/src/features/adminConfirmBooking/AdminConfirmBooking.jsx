import { useEffect, useState } from "react"
import useBooking from "../../hooks/useBooking"
import bookingApi from "../../apis/booking-api"
import BookingCard from "../findBooking/BookingCard"

export default function AdminConfirmBooking() {


    const { setAllBooking, allBooking, bookingFromSelect, getAllBookingFunctionOutUseEffect } = useBooking()


    useEffect(() => {
        getAllBookingFunctionOutUseEffect()
    }, [])

    const handleClikeDelete = async (bookingId) => {
        const result = await bookingApi.deleteBookingById(bookingId)
        setAllBooking(allBooking.filter(el => el.id !== result.data.result.id))
    }

    return (
        <>
            <h1 className=" w-[57.8rem]  m-auto mt-10 mb-2 font-semibold text-4xl">Confirm Booking
                <small className="text-xl ml-2">(Admin only)</small></h1>


            <div className="  max-w-[65rem] m-auto flex flex-col gap-3 p-5 pb-10 ">
                {bookingFromSelect.toReversed().map(el => {
                    console.log(el.status)
                    if (el.status === "PANDING") {
                        return <BookingCard key={el.id} el={el} handleClikeDelete={handleClikeDelete}
                            path="/adminConfirmBooking" />
                    }
                })}
            </div>
        </>
    )
}



