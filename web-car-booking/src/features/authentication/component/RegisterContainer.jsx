import { useState } from "react";
import Button from "../../../components/Button";
import Modal2 from "../../../components/Modal2";
import RegisterContainer2 from "../component/RegisterContainer2";

export default function RegisterContainer() {

    const [isOpenModal2, setIsOpenModal2] = useState(false)

    return (
        <>
            <div className="max-w-[22rem] ml-16 mt-5 pb-5">
                <Button onClick={() => setIsOpenModal2(true)} text="REGISTER" />
            </div>
            {<Modal2
                isOpenModal2={isOpenModal2}
                setIsOpenModal2={setIsOpenModal2}
                bgColor='none'
                isShowBackButton={true}
                title=""
                y="mt-[-2.2rem]"
                x="ml-[-5rem]"
            ><RegisterContainer2 setIsOpenModal2={setIsOpenModal2} /></Modal2>}
        </>

    )
}