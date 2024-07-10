import { createContext, useState } from "react"


export const UserContext = createContext()

export default function UserContextProvider({ children }) {

    const [allUser, setAllUser] = useState([])
    const [isLoagingAllUser, setIsLoadingAllUser] = useState(false)

    // useEffect(() => {
    //     const fetchAllUser = async () => {
    //         try {
    //             const dataAllUser = await userApi.getAlluser()
    //             setAllUser(dataAllUser.data.allUser)
    //             // console.log(alluser)
    //         } catch (error) {
    //             console.log(error)
    //         } finally {
    //             setIsLoadingAllUser(false)
    //         }
    //     }
    //     fetchAllUser()
    // }, [])

    return <UserContext.Provider value={{ isLoagingAllUser, allUser }}>
        {children}
    </UserContext.Provider>
}