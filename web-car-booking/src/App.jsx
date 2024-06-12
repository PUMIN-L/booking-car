
import AuthContextProvider from "./contexts/AuthContext"
import BookingContextProvider from "./contexts/BookingContext"
import CarContextProvider from "./contexts/CarContext"
import Router from "./route"

function App() {


  return (
    <>
      <AuthContextProvider>
        <BookingContextProvider>
          <CarContextProvider>
            <Router />
          </CarContextProvider>
        </BookingContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default App
