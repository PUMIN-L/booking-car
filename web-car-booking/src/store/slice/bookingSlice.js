import bookingApi from "../../apis/booking-api"

export const bookingSlice = (set, get) => ({
    allBooking: { data: [], error: null, allBookingLoading: false },
    isShowText: false,
    dataDateAndTime: {},

    setIsShowText: (value) => set(() => ({ isShowText: value })),
    fetchAllBooking: async () => {
        try {
            set((state) => ({ allBooking: { ...state.allBooking, allBookingLoading: true } }))
            const allBookingResponse = await bookingApi.getAllBooking()
            set((state) => ({ allBooking: { ...state.allBooking, data: allBookingResponse.data.allBooking } }))
        } catch (error) {
            console.error(error)
        } finally {
            set((state) => ({ allBooking: { ...state.allBooking, allBookingLoading: false } }))
        }
    },

    setDataDateAndTime: (keyAndValueObject) => {
        const dataDateAndTime = get().dataDateAndTime
        set(() => ({ dataDateAndTime: { ...dataDateAndTime, ...keyAndValueObject } }))
    },

    resetDataDateAndTime: () => set(() => ({ dataDateAndTime: {} }))
})