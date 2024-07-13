
import bookingApi from "../../apis/booking-api"

export const bookingSlice = (set, get) => ({
    allBooking: { data: [], error: null, allBookingLoading: false },
    myBooking: { data: [], error: null, myBookingLoading: false },
    isShowText: false,
    dataDateAndTime: {},
    dataCreateBooking: {},

    setIsShowText: (value) => set(() => ({ isShowText: value })),
    resetDataDateAndTime: () => set(() => ({ dataDateAndTime: {} })),

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

    setDataCreateBooking: (object) => {
        const dataCreateBooking = get().dataCreateBooking
        set(() => ({ dataCreateBooking: { ...dataCreateBooking, ...object } }))
    },

    setMyBooking: (arr) => {
        const myBooking = get().myBooking
        set((state) => ({ myBooking: { ...state.myBooking, data: [...arr, ...myBooking] } }))
    },

    fetchMybooking: async (authUser) => {
        try {
            console.log("authUser = ", authUser)
            set(() => ({ myBookingLoading: true }))
            if (authUser?.id) {
                const objId = { id: authUser?.id }
                const myBookingResponse = await bookingApi.getBookingByUserId(objId)
                set((state) => ({ myBooking: { ...state.myBooking, data: myBookingResponse.data.myBooking } }))
            }
        } catch (error) {
            console.error(error)
        } finally {
            set(() => ({ myBookingLoading: false }))
        }
    }


})