import { Link } from "react-router-dom"
import useCar from "../../../hooks/useCar"

export default function CarCard({ el }) {

    const { } = useCar()

    const img_car = `http://localhost:8288/${el.img_car}`


    return (
        <Link to={`/createBooking/${el.id}`}>
            <div
                role="button"
                className="card lg:card-side shadow-xl my-5 rounded-2xl bg-black h-40 ">
                <figure><img src={img_car} alt="Album" /></figure>
                <div className="card-body min-w-[14rem]  bg-neutral-950 rounded-r-2xl border border-neutral flex flex-col align-middle">
                    <div>
                        <h2 className="card-title text-neutral-content text-2xl">{`${el.brand} ${el.model}`}</h2>
                    </div>
                    <div>
                        <p className="text-neutral-content font-medium text-lg mb-4">{el.license_plate}</p>
                    </div>

                    <div className="flex gap-2 mt-[-0.7rem]">
                        <p className="text-neutral-content font-medium text-sm mb-4">{el.transmission}</p>
                    </div>
                </div>
            </div>
        </Link>

    )
}