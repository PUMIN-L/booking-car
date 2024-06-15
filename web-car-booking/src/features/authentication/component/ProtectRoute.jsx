import Spinner from "../../../components/Spiner";
import useAuth from "../../../hooks/useAuth";
import { Navigate } from "react-router-dom"
import useCar from "../../../hooks/useCar";

export default function ProtectedRoute({ children }) {
    const { authUser, isAuthUserLoading } = useAuth()
    // const { isLoadingCar } = useCar()


    if (!authUser && !isAuthUserLoading) {
        return <Navigate to="/login" />
    }

    return (
        <>
            {/* {isLoadingCar && <Spinner />} */}
            {isAuthUserLoading && <Spinner />}

            {children}
        </>

    )

}