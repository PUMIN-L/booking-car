import Spinner from "../../../components/Spiner";
import { Navigate } from "react-router-dom"
import { useStore } from "../../../store/useStore";

export default function ProtectedRoute({ children }) {

    const authUser = useStore((state) => state.authUser.data)
    const authUserLoading = useStore((state) => state.authUser.authUserLoading)

    if (!authUser && !authUserLoading) {
        return < Navigate to="/login" />
    }

    return (
        <>
            {authUserLoading && <Spinner />}
            {children}
        </>
    )

}