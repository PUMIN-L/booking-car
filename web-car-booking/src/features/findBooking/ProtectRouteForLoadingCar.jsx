import Spinner from "../../components/Spiner"
import useCar from "../../hooks/useCar"


export default function ProtectRouteForLoadingCar({ children }) {

    const { isLoadingCar } = useCar()

    return (
        <>
            {isLoadingCar && <Spinner />}
            {children}
        </>
    )
}
