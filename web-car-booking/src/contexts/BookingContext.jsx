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
        status: STATUS.PANDING,
        date_pick_up: "",
        time_pick_up: "",
        date_drop_off: "",
        time_drop_off: ""
    }

    const [dataCreateBookingLoading, setDataCreateBookingLoading] = useState(false)
    const [dataCreateBooking, setDataCreateBooking] = useState(dataCreateBookingInit)
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
                const myBooking = await bookingApi.getBookingBiUserId(objId)
                setMyBooking(myBooking.data.myBooking)
            }

        }

        getBookingByUserId()

    }, [authUser])

    useEffect(() => {
        console.log(dataCreateBooking)
    }, [dataCreateBooking])



    return <BookingContext.Provider value={{
        dataCreateBookingLoading,
        setDataCreateBooking,
        dataCreateBooking,
        myBooking
    }} >

        {children}
    </BookingContext.Provider>



}
