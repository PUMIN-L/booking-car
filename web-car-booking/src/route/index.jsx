import { RouterProvider, createBrowserRouter } from "react-router-dom"
import { lazy } from "react"

import RedirectIfLogged from "../features/authentication/component/RedirectIfLogged"
import ProtectedRoute from "../features/authentication/component/ProtectRoute"
import MainContainer from "../layouts/MainContainer"
import LoginPage from "../pages/LoginPage"
import HomePage from "../pages/HomePage"
import ConfirmBooking from "../features/createBooking/components/ConfirmBooking";
import MyBooking from "../features/findBooking/MyBooking"
import EditBookingFrom from "../features/editBooking/component/EditBookingFrom"
import FindAllBooking from "../features/findAllBooking/FindAllBooking"
import AdminConfirmBooking from "../features/adminConfirmBooking/AdminConfirmBooking"
import Completion from "../features/payment/Completion"
import PaymentPage from "../pages/PaymentPage"


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
            { path: "/createBooking/:carId", element: <ConfirmBooking /> },
            { path: "/myBooking", element: <MyBooking /> },
            { path: "/myBooking/editMyBooking/:bookingId", element: <EditBookingFrom /> },
            { path: "/allBooking", element: <FindAllBooking /> },
            { path: "/adminConfirmBooking", element: <AdminConfirmBooking /> },
            { path: "/payment", element: <PaymentPage /> },
            { path: "/completion", element: <Completion /> },

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