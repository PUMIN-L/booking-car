
import Button from "../../../components/Button";
import CarCard from "./CarCard";
import TimeForm from "./TimeForm";
import useBooking from "../../../hooks/useBooking"
import dayjs from 'dayjs'
import { useEffect, useState } from "react";
import carApi from "../../../apis/car-api";
import { useStore } from "../../../store/useStore";

export default function CreateBookingForm() {

    const allCarDataStore = useStore((state) => state.allCar.data)
    const isShowText = useStore((state) => state.isShowText)
    const setIsShowText = useStore((state) => state.setIsShowText)
    const dataDateAndTime = useStore((state) => state.dataDateAndTime)
    const setDataDateAndTime = useStore((state) => state.setDataDateAndTime)
    const { dataCreateBooking, setDataCreateBooking } = useBooking()

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
        setIsShowText(true)
    }


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
        setAllCars(allCarDataStore)
    }, [allCarDataStore, dataDateAndTime])

    const handleChangeDatePickUp = (e) => {
        // setDataDateAndTime({ ...dataDateAndTime, datePickUp: e.target.value })
        setDataDateAndTime({ datePickUp: e.target.value })
        setDataCreateBooking(prev => ({ ...prev, "date_pick_up": "" }))
        setIsShowText(false)
    }

    const handleChangeTimePickUp = (e) => {
        // setDataDateAndTime({ ...dataDateAndTime, timePickUp: e.target.value })
        setDataDateAndTime({ timePickUp: e.target.value })
        setDataCreateBooking(prev => ({ ...prev, "date_pick_up": "" }))
        setIsShowText(false)
    }

    const handleChangeDateDropOff = (e) => {
        // setDataDateAndTime({ ...dataDateAndTime, dateDropOff: e.target.value })
        setDataDateAndTime({ dateDropOff: e.target.value })
        setDataCreateBooking(prev => ({ ...prev, "date_drop_off": "" }))
        setIsShowText(false)
    }

    const handleChangeTimeDropOff = (e) => {
        // setDataDateAndTime({ ...dataDateAndTime, timeDropOff: e.target.value })
        setDataDateAndTime({ timeDropOff: e.target.value })
        setDataCreateBooking(prev => ({ ...prev, "date_drop_off": "" }))
        setIsShowText(false)
    }

    const datePickUp = dayjs(dataCreateBooking.date_pick_up).format("YYYY-MM-DD")
    const timePickUp = dayjs(dataCreateBooking.date_pick_up).format("HH:mm")
    const dateDropOff = dayjs(dataCreateBooking.date_drop_off).format("YYYY-MM-DD")
    const timeDropOff = dayjs(dataCreateBooking.date_drop_off).format("HH:mm")

    useEffect(() => {
        if (dataCreateBooking.date_pick_up && dataCreateBooking.date_drop_off) {
            setDataDateAndTime({
                datePickUp,
                timePickUp,
                dateDropOff,
                timeDropOff
            })
        }

        if (dataCreateBooking.date_pick_up && dataCreateBooking.date_drop_off) {
            setIsShowText(true)
        }

    }, [])

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
                        onChangeDate={e => handleChangeDatePickUp(e)}
                        onChangeTime={(e) => handleChangeTimePickUp(e)}
                        valueDay={dataDateAndTime.datePickUp}
                        valueTime={dataDateAndTime.timePickUp}

                    />
                    <TimeForm
                        title="Return (date and time)"
                        onChangeDate={(e) => handleChangeDateDropOff(e)}
                        onChangeTime={(e) => handleChangeTimeDropOff(e)}
                        valueDay={dataDateAndTime.dateDropOff}
                        valueTime={dataDateAndTime.timeDropOff}

                    />
                    <div className="mt-8">
                        <Button type="submit" text="Search" color="green" onClick={handleClickSearch} />
                    </div>

                </form>
            </div>
            <div >
                {isShowText ? <h1 className="text-2xl font-bold  pl-[20rem]">Choose a car..</h1> : ""}
                <div className="max-w-[30rem] min-w-[30rem] h-[30rem] p-4 rounded-xl m-auto overflow-auto ">
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
            </div>

        </>
    )
}
