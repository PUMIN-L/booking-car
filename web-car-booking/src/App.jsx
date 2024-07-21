
import { useEffect } from "react"
import Router from "./route"
import { useStore } from "./store/useStore"
import Spinner from "./components/Spiner"

function App() {

  const fetchAllUser = useStore(state => state.fetchAllUser)
  const fetchAllCar = useStore(state => state.fetchAllCar)
  const fetchAllBooking = useStore(state => state.fetchAllBooking)
  const fetchUser = useStore(state => state.fetchUser)

  const allUserLoading = useStore((state) => state.allUserLoading)
  const carLoading = useStore(state => state.carLoading)
  const bookingLoading = useStore(state => state.allBooking.allUserLoading)
  const authUserLoading = useStore(state => state.authUser.authUserLoading)

  useEffect(() => {
    fetchUser()
    fetchAllUser()
    fetchAllCar()
    fetchAllBooking()
  }, [fetchAllUser, fetchAllCar, fetchAllBooking, fetchUser])

  if (
    allUserLoading ||
    carLoading ||
    bookingLoading ||
    authUserLoading
  ) {
    return <Spinner />
  }

  return <Router />

}

export default App
