
import AuthContextProvider from "./contexts/AuthContect"
import CarContextProvider from "./contexts/CarContext"
import Router from "./route"

function App() {


  return (
    <>
      <AuthContextProvider>
        <CarContextProvider>
          <Router />
        </CarContextProvider>
      </AuthContextProvider>
    </>
  )
}

export default App
