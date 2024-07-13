import BookingCard from "./BookingCard"
import bookingApi from "../../apis/booking-api"
import { useStore } from "../../store/useStore"
import { useEffect } from "react"
import useAuth from "../../hooks/useAuth"
import Spinner from "../../components/Spiner"

export default function MyBooking() {

    const { authUser } = useAuth()

    const myBooking = useStore((state) => state.myBooking.data)
    const setMyBooking = useStore((state) => state.setMyBooking)
    const fetchMybooking = useStore((state) => state.fetchMybooking)
    const myBookingLoading = useStore((state) => state.myBooking.myBookingLoading)

    useEffect(() => {
        fetchMybooking(authUser)
    }, [authUser])

    const handleClikeDelete = async (bookingId) => {
        const result = await bookingApi.deleteBookingById(bookingId)
        setMyBooking(myBooking.filter(el => el.id !== result.data.result.id))
    }

    if (myBookingLoading) {
        return <Spinner />
    }

    return (
        <>
            <h1 className=" w-[57.8rem]  m-auto mt-10 mb-2 font-semibold text-4xl">My Booking Information</h1>
            <div className="  max-w-[65rem] m-auto flex flex-col gap-3 p-5 pb-10 ">
                {myBooking?.toReversed().map(el => <BookingCard key={el.id} el={el} handleClikeDelete={handleClikeDelete} path="/myBooking" />)}
            </div>
        </>
    )
}