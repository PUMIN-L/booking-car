import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "../features/createBooking/components/Footer";

export default function MainContainer() {
    return (
        <div>
            < Header />
            <div className="min-h-[55vh]">
                <Outlet />
            </div>
            <Footer />
        </div >

    )
}