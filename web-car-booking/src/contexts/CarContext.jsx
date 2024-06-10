import { createContext, useEffect } from "react";
import carApi from "../apis/car-api";

export const CarContext = createContext()

export default function CarContextProvider({ children }) {

    useEffect(() => {
        const fetchAllCar = async () => {
            try {
                const allCarData = await carApi.getAllCar()
                console.log(allCarData)
            } catch (error) {
                console.log(error)
            }
        }
        fetchAllCar()
    }, [])

    return <CarContext.Provider value={""} >{children}</CarContext.Provider>
}