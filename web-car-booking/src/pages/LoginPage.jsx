
import LoginForm from "../features/authentication/component/LoginForm";
import RegisterContainer from "../features/authentication/component/RegisterContainer";



export default function LoginPage() {
    return (

        <div
            className="bg-neutral-300 max-w-[70rem] m-auto mt-[3rem] h-full my-11 rounded-lg shadow-[0_0_6px_rgb(0,0,0,0.2)]
         flex justify-between"
        >
            <div className="pt-24 pl-9">
                <div className="p-4">
                    <h1 className="text-5xl font-semibold text-black">Wellcome</h1>
                    <h2 className="text-3xl font-semibold mt-3 ml-12 text-black">Online car booking system</h2>
                </div>
                <LoginForm />
                <hr className="border-2 border-gray-500 my-2 max-w-[22rem] ml-16 mt-5"></hr>
                <RegisterContainer />
            </div>

            <div className="max-w-[35rem] max-h-[40rem] overflow-hidden">
                <img className="w-full object-cover" src="../src/assets/car1.jpg" alt="picture" />
            </div>
        </div >
    )
}