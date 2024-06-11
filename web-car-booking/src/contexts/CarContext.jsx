import { createContext, useEffect, useState } from "react";
import carApi from "../apis/car-api";


export const CarContext = createContext()

export default function CarContextProvider({ children }) {

    const [allCarData, setAllCarData] = useState([])
    const [isLoadingCar, setIsLoagingCar] = useState(true)

    useEffect(() => {
        const fetchAllCar = async () => {
            try {

                const gatAllCarData = await carApi.getAllCar()
                if (gatAllCarData) {
                    setAllCarData(gatAllCarData.data.result)
                }

            } catch (error) {
                console.log(error)
            } finally {
                setIsLoagingCar(false)
            }
        }
        fetchAllCar()
    }, [])



    return <CarContext.Provider value={{ isLoadingCar, allCarData, setAllCarData }} >{children}</CarContext.Provider>
}