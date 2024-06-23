import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { lazy } from "react"

import RedirectIfLogged from "../features/authentication/component/RedirectIfLogged"
import ProtectedRoute from "../features/authentication/component/ProtectRoute"
import MainContainer from "../layouts/MainContainer"
import LoginPage from "../pages/LoginPage"
import HomePage from "../pages/HomePage"
import ConfirmBooking from "../features/createBooking/components/ConfirmBooking";
import CarContextProvider from "../contexts/CarContext"
import MyBooking from "../features/findBooking/MyBooking"
import EditBookingFrom from "../features/editBooking/component/EditBookingFrom"
import FindAllBooking from "../features/findAllBooking/FindAllBooking"

import UserContextProvider from "../contexts/UserContext"
import ProtectRouteLoadingCar from "../features/findAllBooking/ProtectRouteLoadingCar"
import ProtectRouteForLoadingCar from "../features/findBooking/ProtectRouteForLoadingCar"
import AdminConfirmBooking from "../features/adminConfirmBooking/AdminConfirmBooking"


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
            { path: "/", element: <HomePage /> },
            { path: "/createBooking/:carId", element: <CarContextProvider> <ConfirmBooking /></CarContextProvider> },
            { path: "/myBooking", element: <ProtectRouteForLoadingCar><UserContextProvider><MyBooking /></UserContextProvider> </ProtectRouteForLoadingCar> },
            { path: "/myBooking/editMyBooking/:bookingId", element: <EditBookingFrom /> },
            {
                path: "/allBooking", element: <UserContextProvider> <ProtectRouteLoadingCar>
                    <FindAllBooking /></ProtectRouteLoadingCar> </UserContextProvider>
            },
            {
                path: "/adminConfirmBooking", element: <UserContextProvider><ProtectRouteLoadingCar>
                    <AdminConfirmBooking /></ProtectRouteLoadingCar></UserContextProvider>
            }
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