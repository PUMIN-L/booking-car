import userApi from "../../apis/user-api"

export const userSilce = (set) => ({
    allUser: { data: [], loading: false, error: null },
    allUserLoading: false,

    fetchAllUser: async () => {
        try {
            set(() => ({ allUserLoading: true }))
            const dataResponse = await userApi.getAlluser()
            const dataAllUser = dataResponse.data.allUser
            set((state) => ({ allUser: { ...state.allUser, data: dataAllUser } }))
        } catch (error) {
            console.log(error)
        } finally {
            set(() => ({ allUserLoading: false }))
        }
    }
})