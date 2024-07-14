
import { useEffect } from "react"
import AuthContextProvider from "./contexts/AuthContext"
import Router from "./route"
import { useStore } from "./store/useStore"
import Spinner from "./components/Spiner"

function App() {

  const fetchAllUser = useStore(state => state.fetchAllUser)
  const fetchAllCar = useStore(state => state.fetchAllCar)
  const fetchAllBooking = useStore(state => state.fetchAllBooking)

  const allUserLoading = useStore((state) => state.allUserLoading)
  const carLoading = useStore(state => state.carLoading)
  const bookingLoading = useStore(state => state.allBooking.allUserLoading)

  useEffect(() => {
    fetchAllUser()
    fetchAllCar()
    fetchAllBooking()
  }, [fetchAllUser, fetchAllCar, fetchAllBooking])

  if (
    allUserLoading ||
    carLoading ||
    bookingLoading
  ) {
    return <Spinner />
  }

  return (
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  )
}

export default App
