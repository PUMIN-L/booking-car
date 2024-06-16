import { useEffect, useState } from "react"
import bookingApi from "../../apis/booking-api"
import useBooking from "../../hooks/useBooking"
import useUser from "../../hooks/useUser"
import BookingCard from "../findBooking/BookingCard"
import SelectForFindBooking from "./SelectForFindBooking"

// const selectStateInit = {
//     "selectByUser": false,
//     "selectByCar": false,
//     "selectByStatus": false
// }

const selectValueInit = {
    "valueSelectByUser": -1,
    "valueSelectByCar": -1,
    "valueSelectByStatus": ""
}

export default function FindAllBooking() {


    const { setAllBooking, allBooking, bookingFromSelect, setBookingFromSelect, getAllBookingFunctionOutUseEffect } = useBooking()

    const [selectValue, setSelectValue] = useState(selectValueInit)

    useEffect(() => {
        getAllBookingFunctionOutUseEffect()
    }, [])

    useEffect(() => {
        setBookingFromSelect(allBooking)
    }, [allBooking])

    useEffect(() => {
        console.log(selectValue)
    }, [selectValue])


    const handleClikeDelete = async (bookingId) => {
        const result = await bookingApi.deleteBookingById(bookingId)
        setAllBooking(allBooking.filter(el => el.id !== result.data.result.id))
    }

    const handelChangeSelectByUserId = (e) => {
        setBookingFromSelect(allBooking)
        if (e.target.value) {
            // setSelectState({ ...selectState, selectByUser: true })
            const selectBookingByUser = allBooking.filter(el => el.user_id === +e.target.value)
            setBookingFromSelect(selectBookingByUser)
            setSelectValue({ ...selectValue, valueSelectByUser: +e.target.value })
        }

        // if (e.target.value && selectState.selectByCar) {
        //     const selectBookingByUser = allBooking.filter(el => el.user_id === +e.target.value && )
        //     setBookingFromSelect(selectBookingByUser)
        // }

        if (!e.target.value) {
            setSelectValue({ ...selectValue, valueSelectByUser: -1 })
        }
    }

    const handelChangeSelectByCar = (e) => {

        setBookingFromSelect(allBooking)
        if (e.target.value) {
            // setSelectState({ ...selectState, selectByCar: true })
            const selectBookingByUser = allBooking.filter(el => el.car_id === +e.target.value)
            setBookingFromSelect(selectBookingByUser)
            setSelectValue({ ...selectValue, valueSelectByCar: +e.target.value })
        }

        if (!e.target.value) {
            setSelectValue({ ...selectValue, valueSelectByCar: -1 })
        }

    }

    const handekChangeSelectByStatus = (e) => {
        setBookingFromSelect(allBooking)
        if (e.target.value) {
            // setSelectState({ ...selectState, selectByStatus: true })
            const selectBookingByStatus = allBooking.filter(el => el.status === e.target.value)
            setBookingFromSelect(selectBookingByStatus)
            setSelectValue({ ...selectValue, valueSelectByStatus: e.target.value })
        }

        if (!e.target.value) {
            setSelectValue({ ...selectValue, valueSelectByStatus: "" })
        }
    }

    return (
        <>
            <h1 className=" w-[57.8rem]  m-auto mt-10 mb-2 font-semibold text-4xl">All Booking Information
                <small className="text-xl ml-2">(Admin only)</small></h1>
            <div className=" flex gap-10 justify-center my-5 mt-8">

                <SelectForFindBooking nameSelect="Select By User" onChange={handelChangeSelectByUserId} />
                <SelectForFindBooking nameSelect="Select By Car" onChange={handelChangeSelectByCar} w="16rem" />
                <SelectForFindBooking nameSelect="Select by Status" onChange={handekChangeSelectByStatus} />
            </div>

            <div className="  max-w-[65rem] m-auto flex flex-col gap-3 p-5 pb-10 ">
                {bookingFromSelect.toReversed().map(el => {
                    return <BookingCard key={el.id} el={el} handleClikeDelete={handleClikeDelete}
                        path="/allBooking" />
                })}
            </div>
        </>
    )
}



