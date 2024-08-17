import authApi from "../../apis/aut-api"
import { getAccessToken, removeAccessToken, setAccessToken } from "../../utils/local-storage"

export const authSlice = (set) => ({
    authUser: { data: null, error: null, authUserLoading: true },
    isOpenModal2: false,


    setIsOpenModal2: (boolean) => set(() => ({ isOpenModal2: boolean })),

    fetchUser: async () => {
        try {
            set((state) => ({ authUser: { ...state.authUser, authUserLoading: true } }))
            if (getAccessToken()) {
                const res = await authApi.getMe()
                set((state) => ({ authUser: { ...state.authUser, data: res.data.user } }))
            }
        } catch (error) {
            console.log(error)
        } finally {
            set((state) => ({ authUser: { ...state.authUser, authUserLoading: false } }))
        }
    },

    login: async (credentials) => {
        const res = await authApi.login(credentials)
        setAccessToken(res.data.token)
        const resGetAuthUser = await authApi.getMe()
        set((state) => ({ authUser: { ...state.authUser, data: resGetAuthUser.data.user } }))
    },

    logout: () => {
        removeAccessToken()
        set((state) => ({ authUser: { ...state.authUser, data: null } }))
    }
})