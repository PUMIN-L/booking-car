import Spinner from "../../components/Spiner";
import useCar from "../../hooks/useCar";
import useUser from "../../hooks/useUser";


export default function ProtectRouteFindAllBooking({ children }) {

    const { isLoagingAllUser } = useUser()
    const { isLoadingCar } = useCar()

    // console.log("IsLoadingAllUser", isLoagingAllUser)
    return (
        <>
            {isLoadingCar && <Spinner />}
            {isLoagingAllUser && <Spinner />}

            {children}
        </>

    )

}