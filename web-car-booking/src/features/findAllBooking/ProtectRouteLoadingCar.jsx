import Spinner from "../../components/Spiner";
import useBooking from "../../hooks/useBooking";
import useCar from "../../hooks/useCar";
import useUser from "../../hooks/useUser";


export default function ProtectRouteLoadingCar({ children }) {

    const { isLoagingAllUser } = useUser()
    const { isLoadingCar } = useCar()
    const { isLoadingBooking } = useBooking()

    // console.log("IsLoadingAllUser", isLoagingAllUser)
    return (
        <>
            {isLoadingCar && <Spinner />}
            {isLoagingAllUser && <Spinner />}
            {isLoadingBooking && <Spinner />}

            {children}
        </>

    )

}