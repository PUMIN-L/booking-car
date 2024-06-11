import { createContext, useEffect, useState } from "react";
import { STATUS } from "../constants";
import useAuth from "../hooks/useAuth";



export const BookingContext = createContext()

export default function BookingContextProvider({ children }) {

    const { authUser, setIsAuthUserLoading } = useAuth()


    const [dataCreateBookingLoading, setDataCreateBookingLoading] = useState(false)

    const dataCreateBookingInit = {
        user_id: authUser?.id,
        car_id: "",
        status: STATUS.PANDING,
        time_pick_up: "",
        time_drop_off: ""
    }

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
        console.log(dataCreateBooking.time_pick_up)
        console.log(dataCreateBooking.time_drop_off)
    }, [dataCreateBooking])

    // useEffect(() => {
    //     console.log(dataCreateBooking)
    // }, [dataCreateBooking])


    return <BookingContext.Provider value={{ dataCreateBookingLoading, setDataCreateBooking, dataCreateBooking }}>  {children}</BookingContext.Provider>



}
