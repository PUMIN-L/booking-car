import { createContext, useEffect, useState } from "react";
import { STATUS } from "../constants";
import useAuth from "../hooks/useAuth";



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

    }, [authUser])

    useEffect(() => {
        console.log(dataCreateBooking)
    }, [dataCreateBooking])

    // useEffect(() => {
    //     console.log(dataCreateBooking)
    // }, [dataCreateBooking])


    return <BookingContext.Provider value={{ dataCreateBookingLoading, setDataCreateBooking, dataCreateBooking }}>  {children}</BookingContext.Provider>



}
