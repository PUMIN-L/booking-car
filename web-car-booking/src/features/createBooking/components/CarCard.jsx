import { useNavigate } from "react-router-dom"
import useBooking from "../../../hooks/useBooking"
import { GEAR } from "../../../constants"
import { useStore } from "../../../store/useStore"

export default function CarCard({ el }) {

    const navigate = useNavigate()

    const { dataCreateBooking, setDataCreateBooking } = useBooking()

    const setCurrentCar = useStore((state) => state.getCatById)

    const img_car = `http://localhost:8288/${el.img_car}`


    const handleOnClickCard = () => {
        if (!dataCreateBooking.date_pick_up || !dataCreateBooking.date_drop_off) {
            return alert("ERROR !! You have to search available car first")
        }
        setCurrentCar(el.id)
        navigate(`/createBooking/${el.id}/?pickUp=${dataCreateBooking.date_pick_up}&dropOff=${dataCreateBooking.date_drop_off}`)
    }


    return (

        <div
            role="button"
            onClick={handleOnClickCard}
            className="card lg:card-side shadow-xl my-5 rounded-2xl  h-40 ">
            <figure><img src={img_car} alt="Album" /></figure>
            <div className="card-body min-w-[14rem] bg-neutral-950 rounded-r-2xl border border-neutral flex flex-col align-middle">
                <div>
                    <h2 className="card-title text-neutral-content text-2xl">{`${el.brand} ${el.model}`}</h2>
                </div>
                <div>
                    <p className="text-neutral-content font-medium text-lg mb-4">{el.license_plate}</p>
                </div>

                <div className="flex gap-2 mt-[-0.7rem]">
                    <p className="text-neutral-content font-medium text-sm mb-4">{GEAR[el.transmission]}</p>
                </div>
            </div>
        </div>


    )
}