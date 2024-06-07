import RegisterForm from "./RegisterForm";


export default function Modal({ onClick, openModal }) {
    return (
        <>
            {openModal ? <>

                <div className="fixed inset-0 bg-gray-800 z-20"></div>
                <div className="fixed inset-0 z-30 mt-24">
                    <div
                        className=" bg-neutral-300 w-[75rem] m-auto rounded-lg
                 flex justify-between"
                    >

                        <div className="m-auto pt-5 pb-16">
                            <div className="flex justify-between pr-2 ">
                                <h1 className="text-5xl font-medium p-2">Register</h1>
                                <h1
                                    role="button"
                                    className=" bg-gray-700 p-1.5 text-white rounded-md max-h-9 my-auto"
                                    onClick={onClick}
                                >
                                    BACK
                                </h1>

                            </div>
                            <RegisterForm closeModal={onClick} />
                        </div>
                        <div className="max-w-[33.9rem] object-cover overflow-hidden  bg-black">
                            <img className="" src="../src/assets/car2.jpg" />
                        </div>
                    </div>


                </div>

            </> : ""}

        </>

    )
}