
import Button from "../../../components/Button";
import CarCard from "./CarCard";
import TimeForm from "./TimeForm";
import useBooking from "../../../hooks/useBooking"
import useCar from "../../../hooks/useCar";
import dayjs from 'dayjs'
import { useEffect, useState } from "react";
import carApi from "../../../apis/car-api";

export default function CreateBookingForm() {

    const { dataCreateBooking, setDataCreateBooking, dataDateAndTime, setDataDateAndTime } = useBooking()
    const { allCarData } = useCar()

    const [allCars, setAllCars] = useState()

    const handleClickSearch = () => {
        if (!dataDateAndTime.datePickUp || !dataDateAndTime.timePickUp || !dataDateAndTime.dateDropOff || !dataDateAndTime.timeDropOff) {
            return alert("ERROR !! You have to select Date-Time PickUp and Date-Time Drop off")
        }
        const dateTimePickUp = `${dataDateAndTime.datePickUp} ${dataDateAndTime.timePickUp}`
        const dateTimePickUpDayJs = dayjs(dateTimePickUp).toISOString()

        const dateTimeDropOff = `${dataDateAndTime.dateDropOff} ${dataDateAndTime.timeDropOff}`
        const dateTimeDropOffDayJs = dayjs(dateTimeDropOff).toISOString()

        const date = Date()
        const currentTime = dayjs(date).toISOString()
        const limitTimeForBook = dayjs(currentTime).add(5, 'hour').toISOString()

        if (dateTimePickUpDayJs < limitTimeForBook) {
            return alert("Reservations must be made 5 hours before pick-up time")
        }

        if (dateTimeDropOffDayJs <= dateTimePickUpDayJs) {
            return alert("Time drop off must be more than time pick up")
        }

        setDataCreateBooking(prev => ({ ...prev, "date_pick_up": dateTimePickUpDayJs }))
        setDataCreateBooking(prev => ({ ...prev, "date_drop_off": dateTimeDropOffDayJs }))
    }

    // useEffect(() => {
    // const date = Date()
    // console.log(date)
    // const currentTime = dayjs(date).toISOString()
    // console.log("Current Time :", currentTime)
    // console.log("Current Time :", currentTime)
    // const testTime1 = dayjs("2024-06-17T02:00:00.000Z").toISOString()
    // console.log("testTime 1 :", testTime1)
    // const testTime2 = dayjs("2024-06-17T02:00:00.000Z").subtract(2, 'hour').toISOString()
    // console.log("testTime 2 :", testTime2)
    // const testTime2 = dayjs(currentTime).subtract(2, 'hour').toISOString()
    // console.log("testTime 2 :", testTime2)
    // }, [])

    useEffect(() => {

        const getCarSelect = async () => {
            try {
                const selectCar = await carApi.getAvailableCar(dataCreateBooking.date_pick_up, dataCreateBooking.date_drop_off)
                setAllCars(selectCar.data.result)
            } catch (error) {
                console.log(error)
            }
        }
        getCarSelect()

    }, [dataCreateBooking])

    useEffect(() => {
        setAllCars(allCarData)
    }, [allCarData])


    return (
        <>
            <div className="max-w-[60rem] min-w-[30rem] bg-neutral text-slate-300 p-12 rounded-xl m-auto border-4 ">
                <form
                    onSubmit={(e) => e.preventDefault()}
                    className="m-auto  w-[20rem]"
                >
                    <h1 className="text-x font-bold text-4xl ">Create booking</h1>
                    <TimeForm
                        title="Pick-up (date and time)"
                        onChangeDate={e => setDataDateAndTime({ ...dataDateAndTime, datePickUp: e.target.value })}
                        onChangeTime={(e) => setDataDateAndTime({ ...dataDateAndTime, timePickUp: e.target.value })}
                        valueDay={dataDateAndTime.datePickUp}
                        valueTime={dataDateAndTime.timePickUp}

                    />
                    <TimeForm
                        title="Return (date and time)"
                        onChangeDate={(e) => setDataDateAndTime({ ...dataDateAndTime, dateDropOff: e.target.value })}
                        onChangeTime={(e) => setDataDateAndTime({ ...dataDateAndTime, timeDropOff: e.target.value })}
                        valueDay={dataDateAndTime.dateDropOff}
                        valueTime={dataDateAndTime.timeDropOff}

                    />
                    <div className="mt-8">
                        <Button type="submit" text="Search" color="green" onClick={handleClickSearch} />
                    </div>

                </form>
            </div>
            <div className="max-w-[30rem] min-w-[30rem] h-[30rem] p-4 rounded-xl m-auto overflow-auto">
                {
                    allCars?.map(el => {
                        return <CarCard
                            key={el.id}
                            el={el}
                            img_car={`http://localhost:8288/${el.img_car}`}
                        />

                    })
                }
            </div>
        </>
    )
}
