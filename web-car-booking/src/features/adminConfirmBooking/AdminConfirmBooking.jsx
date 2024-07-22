import { useEffect, useState } from "react"
import BookingCard from "../findBooking/BookingCard"
import { useStore } from "../../store/useStore"


export default function AdminConfirmBooking() {

    const allBookingStore = useStore((state) => state.allBooking.data)
    const deleteBooking = useStore((state) => state.deleteBooking)

    const [allBooking, setAllBooking] = useState([])
    const [bookingFromSelect, setBookingFromSelect] = useState([])

    useEffect(() => {
        setAllBooking(allBookingStore)
        setBookingFromSelect(allBookingStore.filter(el => el.status === "PANDING"))
    }, [allBookingStore])

    const handleClikeDelete = async (bookingId) => {
        deleteBooking(bookingId)
        setAllBooking(allBooking.filter(el => el.id !== bookingId))
    }

    return (
        <>
            <h1 className=" w-[57.8rem]  m-auto mt-10 mb-2 font-semibold text-4xl">Confirm Booking
                <small className="text-xl ml-2">(Admin only)</small></h1>

            <div className="  max-w-[65rem] m-auto flex flex-col gap-3 p-5 pb-10 ">
                {bookingFromSelect.toReversed().map(el => {
                    if (el.status === "PANDING") {
                        return <BookingCard key={el.id} el={el} handleClikeDelete={handleClikeDelete}
                            path="/adminConfirmBooking" />
                    }
                })}
            </div>
        </>
    )
}



