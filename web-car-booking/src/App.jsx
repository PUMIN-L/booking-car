
import AuthContextProvider from "./contexts/AuthContext"
import BookingContextProvider from "./contexts/BookingContext"
import CarContextProvider from "./contexts/CarContext"
import Router from "./route"

function App() {


  return (
    <>
      <AuthContextProvider>
        <CarContextProvider>
          <BookingContextProvider>
            <Router />
          </BookingContextProvider>
        </CarContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default App
