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
        time_pick_up: "",
        date_drop_off: "",
        time_drop_off: ""
    }

    const showDataBookingInit = {
        monthPickUp: "",
        monthDropOff: "",
        dayPickUp: "",
        dayDropOff: "",
    }

    const [dataCreateBookingLoading, setDataCreateBookingLoading] = useState(false)
    const [dataCreateBooking, setDataCreateBooking] = useState(dataCreateBookingInit)
    const [showDataBooking, setShowDataBooking] = useState(showDataBookingInit)
    const [myBooking, setMyBooking] = useState([])

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
        console.log(dataCreateBooking)
        setShowDataBooking(prev => ({ ...prev, monthPickUp: dataCreateBooking.date_pick_up.split("").slice(5, 7).join("") }))
        setShowDataBooking(prev => ({ ...prev, monthDropOff: dataCreateBooking.date_drop_off.split("").slice(5, 7).join("") }))
        setShowDataBooking(prev => ({ ...prev, dayPickUp: dataCreateBooking.date_pick_up.split("").slice(8, 10).join("") }))
        setShowDataBooking(prev => ({ ...prev, dayDropOff: dataCreateBooking.date_drop_off.split("").slice(8, 10).join("") }))
    }, [dataCreateBooking])



    return <BookingContext.Provider value={{
        dataCreateBookingLoading,
        setDataCreateBooking,
        dataCreateBooking,
        myBooking,
        showDataBooking,
        setMyBooking,


    }} >

        {children}
    </BookingContext.Provider>



}
