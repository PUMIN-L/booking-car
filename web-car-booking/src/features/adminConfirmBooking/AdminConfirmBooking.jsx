import { useEffect, useState } from "react"
import BookingCard from "../findBooking/BookingCard"
import { useStore } from "../../store/useStore"
import { STATUS } from "../../constants"

export default function AdminConfirmBooking() {

    const allBookingStore = useStore((state) => state.allBooking.data)
    const deleteBooking = useStore((state) => state.deleteBooking)
    const myBooking = useStore((state) => state.myBooking.data)
    const setMyBookingAfterDeleteBookingAndUpdate = useStore((state) => state.setMyBookingAfterDeleteBookingAndUpdate)
    const getBookingById = useStore((state) => state.getBookingById)
    const updateBooking = useStore((state) => state.updateBooking)
    const setMyBookingAfterConfirm = useStore((state) => state.setMyBookingAfterConfirm)
    const [allBooking, setAllBooking] = useState([])
    const [bookingStatusPanding, setBookingStatusPanding] = useState([])


    useEffect(() => {
        setAllBooking(allBookingStore)
        setBookingStatusPanding(allBookingStore.filter(el => el.status === "PANDING"))
    }, [allBookingStore])

    const handleClikeDelete = async (bookingId) => {
        deleteBooking(bookingId)
        setAllBooking(allBooking.filter(el => el.id !== bookingId))
        setMyBookingAfterDeleteBookingAndUpdate(myBooking.filter(el => el.id !== bookingId))
    }

    const handleClickConfirm = async (bookingId) => {
        const dataBooking = await getBookingById(bookingId)
        const data = { ...dataBooking, status: STATUS.RESERVED }
        await updateBooking(data)
        const bookingsStatusPandingAfterConfirm = bookingStatusPanding.filter(el => el.id !== data.id)
        setBookingStatusPanding(bookingsStatusPandingAfterConfirm)
        const index = myBooking.findIndex(el => el.id === data.id)
        setMyBookingAfterConfirm(index, data)
    }

    return (
        <>
            <h1 className=" w-[57.8rem]  m-auto mt-10 mb-2 font-semibold text-4xl">Confirm Booking
                <small className="text-xl ml-2">(Admin only)</small></h1>

            <div className="  max-w-[65rem] m-auto flex flex-col gap-3 p-5 pb-10 ">
                {bookingStatusPanding.toReversed().map(el => {
                    return <BookingCard
                        key={el.id} el={el}
                        confirmStatus={"yes"}
                        handleClikeDelete={handleClikeDelete}
                        handleClickConfirm={handleClickConfirm}
                    />
                })}
            </div>
        </>
    )
}



