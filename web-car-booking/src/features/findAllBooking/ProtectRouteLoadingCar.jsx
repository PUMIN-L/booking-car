import Spinner from "../../components/Spiner";
import useBooking from "../../hooks/useBooking";
import useCar from "../../hooks/useCar";



export default function ProtectRouteLoadingCar({ children }) {

    const { isLoadingCar } = useCar()
    const { isLoadingBooking } = useBooking()

    return (
        <>
            {isLoadingCar && <Spinner />}
            {isLoadingBooking && <Spinner />}

            {children}
        </>

    )

}