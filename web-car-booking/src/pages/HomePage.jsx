import Button from "../components/Button";
import CarCard from "../features/createBooking/components/CarCard";
import Footer from "../features/createBooking/components/Footer";
import TimeForm from "../features/createBooking/components/TimeForm";

export default function HomePage() {
    return (
        <>
            <div className="flex mt-[4rem] max-w-[75rem] m-auto ">
                <div className="max-w-[60rem] min-w-[30rem] bg-neutral text-slate-300 p-12 rounded-xl m-auto border-4 ">
                    <form className="m-auto  w-[20rem]">
                        <h1 className="text-x font-bold text-4xl ">Create booking</h1>
                        <TimeForm title="Pick-up (date and time)" />
                        <TimeForm title="Return (date and time)" />
                        <div className="mt-8">
                            <Button type="submit" text="Search" color="green" />
                        </div>

                    </form>
                </div>
                <div className="max-w-[30rem] min-w-[30rem] h-[30rem] p-4 rounded-xl m-auto overflow-auto">
                    <CarCard />
                    <CarCard />
                    <CarCard />
                    <CarCard />

                </div>
            </div>
            <div className="m-auto">
                <Footer />
            </div>

        </>
    )
}