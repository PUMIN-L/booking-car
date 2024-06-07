import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { lazy } from "react"
import LoginPage from "../pages/LoginPage"
import RedirectIfLogged from "../features/authentication/component/RedirectIfLogged"
import ProtectedRoute from "../features/authentication/component/ProtectRoute"


const MainContainer = lazy(() => import("../layouts/MainContainer"))


const router = createBrowserRouter([
    {
        path: "/",
        element: <ProtectedRoute><MainContainer /></ProtectedRoute>,
        children: [
            { path: "/", element: <h1>test</h1> }
        ]
    },
    { path: "/login", element: <RedirectIfLogged><LoginPage /></RedirectIfLogged> }

])

export default function Router() {
    return <RouterProvider router={router} ></RouterProvider>
}