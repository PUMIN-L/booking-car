import { createContext, useEffect, useState } from "react";
import carApi from "../apis/car-api";
import { useParams } from "react-router-dom";
import useBooking from "../hooks/useBooking";


export const CarContext = createContext()

export default function CarContextProvider({ children }) {

    let { carId } = useParams()

    const { dataCreateBooking, setDataCreateBooking } = useBooking()

    const [allCarData, setAllCarData] = useState([])
    const [currentCar, setCurrentCar] = useState({})
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

    const getCatById = async () => {
        const getCurrentCar = await carApi.getCarById(+carId)
        setCurrentCar(getCurrentCar.data.currentCar)
    }

    const saveCarToBooking = () => {
        setDataCreateBooking({ ...dataCreateBooking, car_id: +carId })
    }




    return <CarContext.Provider value={{ isLoadingCar, allCarData, setAllCarData, getCatById, currentCar, saveCarToBooking }} >
        {children}</CarContext.Provider>
}