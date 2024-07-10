import carApi from "../../apis/car-api"

export const carSilce = (set) => ({
    allCar: { data: [], error: null },
    currentCar: {},
    carLoading: false,

    fetchAllCar: async () => {
        try {
            set(() => ({ carLoading: true }))
            const allCarDataResponse = await carApi.getAllCar()
            const allCar = allCarDataResponse.data.result
            set((state) => ({ allCar: { ...state.allCar, data: allCar } }))
        } catch (error) {
            console.error(error)
        } finally {
            set(() => ({ carLoading: false }))
        }
    },

    getCatById: async (carId) => {
        try {
            set(() => ({ carLoading: true }))
            const currentCarResponse = await carApi.getCarById(+carId)
            const currentCar = currentCarResponse.data.currentCar
            set(() => ({ currentCar: currentCar }))
        } catch (error) {
            console.error(error)
        } finally {
            set(() => ({ carLoading: false }))
        }
    }

})