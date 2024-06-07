import Spinner from "../../../components/Spiner"
import useAuth from "../../../hooks/useAuth"
import { Navigate } from "react-router-dom"


export default function RedirectIfLogged({ children }) {

    const { authUser, isAutUserLoading } = useAuth()

    if (authUser && !isAutUserLoading) {
        return <Navigate to="/" />
    }

    return (
        <>
            {isAutUserLoading && <Spinner />}
            {children}
        </>
    )
}