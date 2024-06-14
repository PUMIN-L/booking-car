import Spinner from "../../../components/Spiner";
import useBooking from "../../../hooks/useBooking";


export default function IsBookingLoading({ children }) {

    const { isBookingLoading } = useBooking()
    return (
        <>
            {isBookingLoading && <Spinner />}
            {children}
        </>
    )
}
