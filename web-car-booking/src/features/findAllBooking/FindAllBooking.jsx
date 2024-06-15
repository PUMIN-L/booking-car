import bookingApi from "../../apis/booking-api"
import useBooking from "../../hooks/useBooking"
import BookingCard from "../findBooking/BookingCard"



export default function FindAllBooking() {


    const { setAllBooking, allBooking } = useBooking()

    const handleClikeDelete = async (bookingId) => {
        const result = await bookingApi.deleteBookingById(bookingId)
        setAllBooking(allBooking.filter(el => el.id !== result.data.result.id))
    }

    return (
        <>
            <h1 className=" w-[57.8rem]  m-auto mt-10 mb-2 font-semibold text-4xl">All Booking Information <small className="text-xl">(Admin only)</small></h1>
            <div className="  max-w-[65rem] m-auto flex flex-col gap-3 p-5 pb-10 ">
                {allBooking.toReversed().map(el => <BookingCard key={el.id} el={el} handleClikeDelete={handleClikeDelete} user="PUMIN" />)}
            </div>
        </>
    )
}



