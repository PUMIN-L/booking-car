import RegisterForm from "./RegisterForm";


export default function RegisterContainer2({ setIsOpenModal2 }) {
    return (
        <div className="flex max-w-[70rem] mt-[-3rem] ">
            <RegisterForm setIsOpenModal2={setIsOpenModal2} />
            <div className="max-w-[30.4rem] mt-[-2rem]">
                <img src="../src/assets/car2.jpg" />
            </div>
        </div>
    )
} 