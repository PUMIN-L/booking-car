import BookingCard from "./BookingCard"
import { useStore } from "../../store/useStore"
import { useEffect, useState } from "react"
import Spinner from "../../components/Spiner"

export default function MyBooking() {


    const fetchMybooking = useStore((state) => state.fetchMybooking)
    const myBookingLoading = useStore((state) => state.myBooking.myBookingLoading)
    const deleteBooking = useStore((state) => state.deleteBooking)
    const authUser = useStore((state) => state.authUser.data)

    const [myBooking, setMyBooking] = useState([])

    useEffect(() => {
        const featchBooking = async () => {
            const dataAllBooking = await fetchMybooking(authUser)
            setMyBooking(dataAllBooking)
        }
        featchBooking()
    }, [authUser])

    const handleClikeDelete = async (bookingId) => {
        deleteBooking(bookingId)
        setMyBooking(myBooking.filter(el => el.id !== bookingId))
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