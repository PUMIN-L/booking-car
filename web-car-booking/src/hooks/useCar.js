import { useContext } from "react";
import { CarContext } from "../contexts/CarContext";

export default function useCar() {
    return useContext(CarContext)
}