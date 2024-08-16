
import bookingApi from "../../apis/booking-api"

export const bookingSlice = (set, get) => ({
    allBooking: { data: [], error: null, allBookingLoading: false },
    myBooking: { data: [], error: null, myBookingLoading: false },
    bookingLoading: false,
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
            return allBookingResponse.data.allBooking
        } catch (error) {
            console.error(error)
        } finally {
            set((state) => ({ allBooking: { ...state.allBooking, allBookingLoading: false } }))
        }
    },
    fetchMybooking: async (authUser) => {
        try {
            set((state) => ({ myBooking: { ...state.myBooking, myBookingLoading: true } }))
            if (authUser?.id) {
                const objId = { id: authUser?.id }
                const myBookingResponse = await bookingApi.getBookingByUserId(objId)
                set((state) => ({ myBooking: { ...state.myBooking, data: myBookingResponse.data.myBooking } }))
                return myBookingResponse.data.myBooking
            }
        } catch (error) {
            console.error(error)
        } finally {
            set((state) => ({ myBooking: { ...state.myBooking, myBookingLoading: false } }))
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
    //
    setMyBooking: (obj) => {
        const myBooking = get().myBooking.data
        const allBooking = get().allBooking.data
        set((state) => ({ myBooking: { ...state.myBooking, data: [...myBooking, obj] } }))
        set((state) => ({ allBooking: { ...state.allBooking, data: [...allBooking, obj] } }))
    },

    setMyBookingAfterConfirm: (index, newObj) => {
        const myBooking = get().myBooking.data
        const myBookingClone = myBooking
        myBookingClone[index] = newObj
        set((state) => ({ myBooking: { ...state.myBooking, data: myBookingClone } }))
    },

    setMyBookingAfterDeleteBookingAndUpdate: (arr) => {
        set((state) => ({ myBooking: { ...state.myBooking, data: arr } }))
    },

    setAllBookingAfterDeleteBookingAndUpdate: (arr) => {
        set((state) => ({ allBooking: { ...state.allBooking, data: arr } }))
    },




    deleteBooking: async (bookingId) => {
        try {
            set(() => ({ bookingLoading: true }))
            const result = await bookingApi.deleteBookingById(bookingId)
            const { data } = get().allBooking
            set((state) => ({ allBooking: { ...state.allBooking, data: data.filter(el => el.id !== result.data.result.id) } }))
        } catch (error) {
            console.error(error)
        } finally {
            set(() => ({ bookingLoading: false }))
        }
    },

    getBookingById: async (bookingId) => {
        try {
            set(() => ({ bookingLoading: true }))
            const booking = await bookingApi.getBookingById(bookingId)
            return booking.data
        } catch (error) {
            console.error(error)
        } finally {
            set(() => ({ bookingLoading: false }))
        }
    },

    updateBooking: async (dataUpdate) => {
        try {
            set(() => ({ bookingLoading: true }))
            await bookingApi.updateBooking(dataUpdate)
        } catch (error) {
            console.error(error)
        } finally {
            set(() => ({ bookingLoading: false }))
        }
    }


})