import { createContext, useEffect, useState } from "react"
import userApi from "../apis/user-api"
import useUser from "../hooks/useUser"

export const UserContext = createContext()

export default function UserContextProvider({ children }) {



    const [alluser, setAllUser] = useState([])
    const [isLoagingAllUser, setIsLoadingAllUser] = useState(true)

    useEffect(() => {
        const fetchAllUser = async () => {
            try {
                const dataAllUser = await userApi.getAlluser()
                setAllUser(dataAllUser.data.allUser)
            } catch (error) {
                console.log(error)
            } finally {
                setIsLoadingAllUser(false)
            }

        }

        fetchAllUser()
    }, [])

    return <UserContext.Provider value={{ isLoagingAllUser, alluser }}>
        {children}
    </UserContext.Provider>
}