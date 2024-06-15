
import useBooking from "../../hooks/useBooking"
import BookingCard from "./BookingCard"
import bookingApi from "../../apis/booking-api"

export default function MyBooking() {

    const { myBooking, setMyBooking } = useBooking()

    const handleClikeDelete = async (bookingId) => {
        const result = await bookingApi.deleteBookingById(bookingId)
        setMyBooking(myBooking.filter(el => el.id !== result.data.result.id))
    }

    return (
        <>
            <h1 className=" w-[57.8rem]  m-auto mt-10 mb-2 font-semibold text-4xl">My Booking Information</h1>
            <div className="  max-w-[65rem] m-auto flex flex-col gap-3 p-5 pb-10 ">
                {myBooking.toReversed().map(el => <BookingCard key={el.id} el={el} handleClikeDelete={handleClikeDelete} />)}
            </div>
        </>
    )
}