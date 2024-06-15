import { createContext, useEffect, useState } from "react";
import { STATUS } from "../constants";
import useAuth from "../hooks/useAuth";
import bookingApi from "../apis/booking-api";

export const BookingContext = createContext()

export default function BookingContextProvider({ children }) {

    const { authUser } = useAuth()

    const dataCreateBookingInit = {
        car_id: 0,
        user_id: authUser?.id,
        status: STATUS.RESERVED,
        date_pick_up: "",
        date_drop_off: "",
    }

    const dataDateAndTimeInit = {
        datePickUp: "",
        timePickUp: "",
        dateDropOff: "",
        timeDropOff: ""
    }


    const [dataCreateBookingLoading, setDataCreateBookingLoading] = useState(false)
    const [dataCreateBooking, setDataCreateBooking] = useState(dataCreateBookingInit)
    const [myBooking, setMyBooking] = useState([])
    const [dataDateAndTime, setDataDateAndTime] = useState(dataDateAndTimeInit)
    const [allBooking, setAllBooking] = useState([])
    const [isLoadingBooking, setIsLoadingBooking] = useState(true)

    useEffect(() => {
        const saveUserDatatoBooking = async () => {
            try {
                if (authUser?.id) {
                    setDataCreateBooking({ ...dataCreateBooking, "user_id": authUser.id })
                }

            } catch (error) {
                console.log(error)
            } finally {
                setDataCreateBookingLoading(false)
            }
        }
        saveUserDatatoBooking()

        const getBookingByUserId = async () => {
            if (authUser?.id) {
                const objId = { id: authUser?.id }
                const myBooking = await bookingApi.getBookingByUserId(objId)
                setMyBooking(myBooking.data.myBooking)
            }
        }

        getBookingByUserId()

    }, [authUser])

    useEffect(() => {
        const getAllBookingFunction = async () => {
            try {
                const dataAllBooking = await bookingApi.getAllBooking()
                setAllBooking(dataAllBooking.data.allBooking)
            } catch (error) {
                console.log(error)
                next(error)
            } finally {
                setIsLoadingBooking(false)
            }
        }
        getAllBookingFunction()
    }, [])



    return <BookingContext.Provider value={{
        dataCreateBookingLoading,
        setDataCreateBooking,
        dataCreateBooking,
        myBooking,
        setMyBooking,
        dataDateAndTime, setDataDateAndTime,
        allBooking, setAllBooking,
        isLoadingBooking
    }} >

        {children}
    </BookingContext.Provider>



}
