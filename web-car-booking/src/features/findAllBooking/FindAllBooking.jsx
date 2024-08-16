import { useEffect, useState } from "react"
import BookingCard from "../findBooking/BookingCard"
import SelectForFindBooking from "./SelectForFindBooking"
import { useStore } from "../../store/useStore"


const selectValueInit = {
    "valueSelectByUser": -1,
    "valueSelectByCar": -1,
    "valueSelectByStatus": ""
}

export default function FindAllBooking() {


    const deleteBooking = useStore((state) => state.deleteBooking)
    const fetchAllBooking = useStore((state) => state.fetchAllBooking)
    const allBookingStore = useStore((state) => state.allBooking.data)
    const myBooking = useStore((state) => state.myBooking.data)
    const setMyBookingAfterDeleteBookingAndUpdate = useStore((state) => state.setMyBookingAfterDeleteBookingAndUpdate)

    const [allBooking, setAllBooking] = useState([])
    const [bookingFromSelect, setBookingFromSelect] = useState([])

    useEffect(() => {
        setBookingFromSelect(allBookingStore)
        setAllBooking(allBookingStore)
        setBookingFromSelect(allBookingStore)
        fetchAllBooking()
    }, [allBookingStore])

    const [selectValue, setSelectValue] = useState(selectValueInit)

    useEffect(() => {

        if (selectValue.valueSelectByUser > -1
            && selectValue.valueSelectByCar > -1 && selectValue.valueSelectByStatus !== "") {

            const selectBooking = allBooking.filter(el => el.user_id === selectValue.valueSelectByUser &&
                el.car_id === selectValue.valueSelectByCar && el.status === selectValue.valueSelectByStatus)
            setBookingFromSelect(selectBooking)
            return
        }

        if (selectValue.valueSelectByUser > -1 && selectValue.valueSelectByCar > -1) {

            const selectBooking = allBooking.filter(el => el.user_id === selectValue.valueSelectByUser &&
                el.car_id === selectValue.valueSelectByCar)
            setBookingFromSelect(selectBooking)
            return
        }

        if (selectValue.valueSelectByUser > -1 && selectValue.valueSelectByStatus !== "") {

            const selectBooking = allBooking.filter(el => el.user_id === selectValue.valueSelectByUser &&
                el.status === selectValue.valueSelectByStatus)
            setBookingFromSelect(selectBooking)
            return
        }

        if (selectValue.valueSelectByCar > -1 && selectValue.valueSelectByStatus !== "") {

            const selectBooking = allBooking.filter(el => el.car_id === selectValue.valueSelectByCar &&
                el.status === selectValue.valueSelectByStatus)
            setBookingFromSelect(selectBooking)
            return
        }

        //  ----------------------------------------------------------- // 

        if (selectValue.valueSelectByUser > -1) {
            const selectBookingByUser = allBooking.filter(el => el.user_id === selectValue.valueSelectByUser)
            setBookingFromSelect(selectBookingByUser)
            return
        }

        if (selectValue.valueSelectByCar > -1) {
            const selectBookingByCar = allBooking.filter(el => el.car_id === selectValue.valueSelectByCar)
            setBookingFromSelect(selectBookingByCar)
            return
        }

        if (selectValue.valueSelectByStatus !== "") {
            const selectBookingByStatus = allBooking.filter(el => el.status === selectValue.valueSelectByStatus)
            setBookingFromSelect(selectBookingByStatus)
            return
        }

    }, [selectValue])


    const handleClikeDelete = async (bookingId) => {
        deleteBooking(bookingId)
        setBookingFromSelect(allBooking.filter(el => el.id !== bookingId))
        setMyBookingAfterDeleteBookingAndUpdate(myBooking.filter(el => el.id !== bookingId))
    }

    const handelChangeSelectByUserId = (e) => {

        setBookingFromSelect(allBooking)

        if (e.target.value) {
            return setSelectValue({ ...selectValue, valueSelectByUser: +e.target.value })
        }

        setSelectValue({ ...selectValue, valueSelectByUser: -1 })
    }

    const handelChangeSelectByCar = (e) => {

        setBookingFromSelect(allBooking)

        if (e.target.value) {
            return setSelectValue({ ...selectValue, valueSelectByCar: +e.target.value })
        }
        setSelectValue({ ...selectValue, valueSelectByCar: -1 })
    }

    const handekChangeSelectByStatus = (e) => {

        setBookingFromSelect(allBooking)

        if (e.target.value) {
            return setSelectValue({ ...selectValue, valueSelectByStatus: e.target.value })
        }

        setSelectValue({ ...selectValue, valueSelectByStatus: "" })
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



