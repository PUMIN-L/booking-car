import Button from "../../../components/Button";
import Input from "../../../components/Input";

export default function RegisterForm() {
    return (
        <>
            <div
                className=" bg-neutral-300 w-[70rem] m-auto mt-32 rounded-lg
                 flex justify-between"
            >
                <div className="m-auto">
                    <h1 className="text-5xl font-medium p-2">Register</h1>
                    <form className="max-w-[40rem] p-2 grid grid-cols-2 gap-3 ">
                        <div><Input placeholder="First name" /></div>
                        <div><Input placeholder="Lastt name" /></div>

                        <div className="col-span-2">
                            <Input placeholder="Mobile phone" />
                        </div>

                        <div className="col-span-2">
                            <Input placeholder="Email" />
                        </div>
                        <div className="col-span-2">
                            <Input placeholder="Password" />
                        </div>
                        <div className="col-span-2">
                            <Input placeholder="Confirm password" />
                        </div>
                        <div className="col-span-2 my-2">
                            <Button text="Register" color="green" ></Button>
                        </div>
                    </form>
                </div>
                <div className="max-w-[30rem] max-h-[40rem] object-cover overflow-hidden bg-orange-300">
                    <img src="../src/assets/car2.jpg" />
                </div>
            </div>
        </>
    )
}

