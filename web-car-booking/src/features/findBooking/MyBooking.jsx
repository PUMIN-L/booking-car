import BookingCard from "./BookingCard"
import { useStore } from "../../store/useStore"

export default function MyBooking() {

    const deleteBooking = useStore((state) => state.deleteBooking)
    const myBooking = useStore((state) => state.myBooking.data)
    const allBooking = useStore((state) => state.allBooking.data)
    const setMyBookingAfterDeleteBookingAndUpdate = useStore((state) => state.setMyBookingAfterDeleteBookingAndUpdate)
    const setAllBookingAfterDeleteBookingAndUpdate = useStore((state) => state.setAllBookingAfterDeleteBookingAndUpdate)
    const handleClikeDelete = async (bookingId) => {
        deleteBooking(bookingId)
        setMyBookingAfterDeleteBookingAndUpdate(myBooking.filter(el => el.id !== bookingId))
        setAllBookingAfterDeleteBookingAndUpdate(allBooking.filter(el => el.id !== bookingId))
    }

    return (
        <>
            <h1 className=" w-[57.8rem]  m-auto mt-10 mb-2 font-semibold text-4xl">My Booking Information</h1>
            <div className="  max-w-[65rem] m-auto flex flex-col gap-3 p-5 pb-10 ">
                {myBooking?.toReversed().map(el => {
                    return <BookingCard key={el.id} el={el} handleClikeDelete={handleClikeDelete} path="/myBooking" />
                }
                )}
            </div>
        </>
    )
}