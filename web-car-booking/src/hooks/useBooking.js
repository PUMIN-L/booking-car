import { useContext } from "react";
import { BookingContext } from "../contexts/BookingContext";

export default function useBooking() {
    return useContext(BookingContext)
}