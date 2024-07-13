import carApi from "../../apis/car-api"

export const carSilce = (set, get) => ({
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

    setAllCarDataAfterAddNewCar: async (dataCar) => {
        try {
            set(() => ({ carLoading: true }))
            const { data } = get().allCar
            const res = await carApi.registerCar(dataCar)
            set((state) => ({ allCar: { ...state.allCar, data: [...data, res.data.dataNewCar] } }))

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