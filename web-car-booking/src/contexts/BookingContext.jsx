import { createContext, useEffect, useState } from "react";
import { STATUS } from "../constants";
import bookingApi from "../apis/booking-api";
import { useStore } from "../store/useStore";

export const BookingContext = createContext()

export default function BookingContextProvider({ children }) {

    const authUser = useStore(state => state.authUser.data)

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
    const [allBooking, setAllBooking] = useState([]) //
    const [isLoadingBooking, setIsLoadingBooking] = useState(true) // 2
    const [bookingFromSelect, setBookingFromSelect] = useState([])
    const [isShowText, setIsShowText] = useState()


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
                setBookingFromSelect(dataAllBooking.data.allBooking)
            } catch (error) {
                console.log(error)

            } finally {
                setIsLoadingBooking(false)
            }
        }
        getAllBookingFunction()
    }, [authUser])

    const getAllBookingFunctionOutUseEffect = async () => {
        try {
            const dataAllBooking = await bookingApi.getAllBooking()
            setAllBooking(dataAllBooking.data.allBooking)
            setBookingFromSelect(dataAllBooking.data.allBooking)
        } catch (error) {
            console.log(error)
        }
    }



    return <BookingContext.Provider value={{
        dataCreateBookingLoading,
        setDataCreateBooking,
        dataCreateBooking,
        myBooking,
        setMyBooking,
        dataDateAndTime, setDataDateAndTime,
        allBooking, setAllBooking,
        isLoadingBooking,
        bookingFromSelect, setBookingFromSelect,
        getAllBookingFunctionOutUseEffect,
        isShowText, setIsShowText
    }} >

        {children}
    </BookingContext.Provider>



}
