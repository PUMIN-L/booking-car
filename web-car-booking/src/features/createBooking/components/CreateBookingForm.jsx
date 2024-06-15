
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
    const { allCarData, setAllCarData } = useCar()

    const handleOnSubmit = (e) => {
        e.preventDefault()
    }

    const handleClickSearch = () => {
        if (!dataDateAndTime.datePickUp || !dataDateAndTime.timePickUp || !dataDateAndTime.dateDropOff || !dataDateAndTime.timeDropOff) {
            return alert("ERROR !! You have to select Date-Time PickUp and Date-Time Drop off")
        }
        const dateTimePickUp = `${dataDateAndTime.datePickUp} ${dataDateAndTime.timePickUp}`
        const dateTimePickUpDayJs = dayjs(dateTimePickUp).toISOString()

        const dateTimeDropOff = `${dataDateAndTime.dateDropOff} ${dataDateAndTime.timeDropOff}`
        const dateTimeDropOffDayJs = dayjs(dateTimeDropOff).toISOString()

        console.log("this", dataDateAndTime)
        console.log(dateTimePickUpDayJs)
        console.log(dateTimeDropOffDayJs)

        setDataCreateBooking(prev => ({ ...prev, "date_pick_up": dateTimePickUpDayJs }))
        setDataCreateBooking(prev => ({ ...prev, "date_drop_off": dateTimeDropOffDayJs }))
    }

    useEffect(() => {
        const getCarSelect = async () => {
            try {
                const selectCar = await carApi.getAvailableCar(dataCreateBooking.date_pick_up, dataCreateBooking.date_drop_off)
                console.log("dataCreateBooking", dataCreateBooking)
                setAllCarData(selectCar.data.result)
            } catch (error) {
                console.log(error)
            }
        }
        getCarSelect()

    }, [dataCreateBooking])

    return (
        <>
            <div className="max-w-[60rem] min-w-[30rem] bg-neutral text-slate-300 p-12 rounded-xl m-auto border-4 ">
                <form
                    onSubmit={handleOnSubmit}
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
                    allCarData.map(el => {
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
