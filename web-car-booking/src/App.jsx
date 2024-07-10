
import { useEffect } from "react"
import AuthContextProvider from "./contexts/AuthContext"
import BookingContextProvider from "./contexts/BookingContext"
import Router from "./route"
import { useStore } from "./store/useStore"
import Spinner from "./components/Spiner"

function App() {

  const fetchAllUser = useStore((state) => state.fetchAllUser)
  const fetchAllCar = useStore(state => state.fetchAllCar)

  const allUserLoading = useStore((state) => state.allUserLoading)
  const carLoading = useStore(state => state.carLoading)

  useEffect(() => {
    fetchAllUser()
    fetchAllCar()
  }, [fetchAllUser])

  if (
    allUserLoading ||
    carLoading
  ) {
    return <Spinner />
  }



  return (
    <>
      <AuthContextProvider>
        <BookingContextProvider>
          <Router />
        </BookingContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default App
