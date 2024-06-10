import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { lazy } from "react"

import RedirectIfLogged from "../features/authentication/component/RedirectIfLogged"
import ProtectedRoute from "../features/authentication/component/ProtectRoute"
import MainContainer from "../layouts/MainContainer"
import LoginPage from "../pages/LoginPage"
import HomePage from "../pages/HomePage"


// const MainContainer = lazy(() => import("../layouts/MainContainer"))
// const LoginPage = lazy(() => import("../pages/LoginPage"))
// const HomePage = lazy(() => import("../pages/HomePage"))
// const ProtectedRoute = lazy(() => import("../features/authentication/component/ProtectRoute"))
// const RedirectIfLogged = lazy(() => import("../features/authentication/component/RedirectIfLogged"))


const router = createBrowserRouter([
    {
        path: "/",
        element: (<ProtectedRoute><MainContainer /></ProtectedRoute>),
        children: [
            { path: "/", element: <HomePage /> }
        ]
    },
    {
        path: "/login", element: (
            <RedirectIfLogged>
                <LoginPage />
            </RedirectIfLogged>
        )
    }

])

export default function Router() {
    return <RouterProvider router={router} />
}