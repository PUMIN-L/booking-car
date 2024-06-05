import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { lazy } from "react"
import LoginPage from "../pages/LoginPage"


const MainContainer = lazy(() => import("../layouts/MainContainer"))


const router = createBrowserRouter([
    {
        path: "/",
        element: <MainContainer />,
        children: [
            { path: "/", element: <h1>test</h1> }
        ]
    },
    { path: "/login", element: <LoginPage /> }

])

export default function Router() {
    return <div className="bg-gray-800 fixed inset-0"><RouterProvider router={router} ></RouterProvider></div>

}