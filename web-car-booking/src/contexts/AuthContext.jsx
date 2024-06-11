import { createContext, useEffect, useState } from "react"
import { getAccessToken, removeAccessToken, setAccessToken } from "../utils/local-storage"
import authApi from "../apis/aut-api"

export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {

    const [authUser, setAuthUser] = useState(null)
    const [isAuthUserLoading, setIsAuthUserLoading] = useState(true)
    const [isOpenModal2, setIsOpenModal2] = useState(false)


    useEffect(() => {
        const fetchUser = async () => {
            try {

                if (getAccessToken()) {
                    const res = await authApi.getMe()
                    setAuthUser(res.data.user)
                }

            } catch (error) {
                console.log(error)
            } finally {
                setIsAuthUserLoading(false)
            }
        }
        fetchUser()
    }, [])

    const login = async (credentials) => {
        const res = await authApi.login(credentials)
        setAccessToken(res.data.token)
        const resGetAuthUser = await authApi.getMe()
        setAuthUser(resGetAuthUser.data.user)
    }

    const logout = () => {
        removeAccessToken()
        setAuthUser(null)
    }


    return <AuthContext.Provider
        value={{ login, authUser, isAuthUserLoading, logout, isOpenModal2, setIsOpenModal2 }}
    >
        {children}
    </AuthContext.Provider>
}