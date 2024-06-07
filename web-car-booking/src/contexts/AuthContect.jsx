import { createContext, useEffect, useState } from "react"
import { getAccessToken, setAccessToken } from "../utils/local-storage"
import autApi from "../apis/aut-api"

export const AuthContext = createContext()

export default function AuthContextProvider({ children }) {

    const [authUser, setAuthUser] = useState(null)
    const [isAuthUserLoading, setIsAuthUserLoading] = useState(true)

    useEffect(() => {
        const fetchUser = async () => {
            try {
                if (getAccessToken()) {
                    const res = await autApi.getMe()
                    setAuthUser(res.data.user)
                }
            }
            catch (error) {
                console.log(error)
            } finally {
                setIsAuthUserLoading(false)
            }
        }
        fetchUser()
    }, [])

    const login = async (credentials) => {
        const res = await autApi.login(credentials)
        setAccessToken(res.data.token)
        const resGetAuthUser = await autApi.getMe()
        setAuthUser(resGetAuthUser.data.user)
    }
    return <AuthContext.Provider value={{ login, authUser, isAuthUserLoading }} >{children}</AuthContext.Provider>
}