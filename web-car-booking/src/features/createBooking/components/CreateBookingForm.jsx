
import Button from "../../../components/Button";
import CarCard from "./CarCard";
import TimeForm from "./TimeForm";
import useBooking from "../../../hooks/useBooking"
import useCar from "../../../hooks/useCar";



export default function CreateBookingForm() {

    const { dataCreateBooking, setDataCreateBooking } = useBooking()
    const { allCarData } = useCar()

    const car = allCarData

    return (
        <>
            <div className="max-w-[60rem] min-w-[30rem] bg-neutral text-slate-300 p-12 rounded-xl m-auto border-4 ">
                <form className="m-auto  w-[20rem]">
                    <h1 className="text-x font-bold text-4xl ">Create booking</h1>
                    <TimeForm
                        title="Pick-up (date and time)"
                        name="time_pick_up"
                        onChange={(e) => setDataCreateBooking({ ...dataCreateBooking, [e.target.name]: e.target.value })}

                    />
                    <TimeForm
                        title="Return (date and time)"
                        name="time_drop_off"
                        onChange={(e) => setDataCreateBooking({ ...dataCreateBooking, [e.target.name]: e.target.value })}
                    />
                    <div className="mt-8">
                        <Button type="submit" text="Search" color="green" />
                    </div>

                </form>
            </div>
            <div className="max-w-[30rem] min-w-[30rem] h-[30rem] p-4 rounded-xl m-auto overflow-auto">
                {
                    car.map(el => {
                        return <CarCard
                            key={el.id}
                            brand={el.brand}
                            img_car={`http://localhost:8288/${el.img_car}`}
                            license_plate={el.license_plate}
                            model={el.model}
                            transmission={el.transmission}
                        />

                    })


                }


            </div>
        </>
    )
}
