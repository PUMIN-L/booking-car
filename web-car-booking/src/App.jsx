
import AuthContextProvider from "./contexts/AuthContect"
import Router from "./route"

function App() {


  return (
    <>
      <AuthContextProvider>
        <Router />
      </AuthContextProvider>
    </>
  )
}

export default App
