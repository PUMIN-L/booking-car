
import Footer from "../features/createBooking/components/Footer";
import CreateBookingForm from "../features/createBooking/components/CreateBookingForm";






export default function HomePage() {



    return (
        <>

            <div className="flex mt-[4rem] max-w-[75rem] m-auto ">
                <CreateBookingForm />
            </div>
            {/* <div className="m-auto">
                <Footer />
            </div> */}

        </>
    )
}