import { useState } from "react";
import Button from "../../../components/Button";
import Modal from "./Modal";
import Modal2 from "../../../components/Modal2";
import RegisterCarContainer from "../../createCAr/RegisterCarContainer";
import RegisterContainer2 from "./RegisterContainer2";

export default function RegisterContainer() {

    const [isOpenModal2, setIsOpenModal2] = useState(false)

    return (
        <>
            <div className="max-w-[22rem] ml-16 mt-5 pb-5">
                {/* <Button onClick={() => setOpenModal(true)} text="REGISTER" /> */}
                <Button onClick={() => setIsOpenModal2(true)} text="REGISTER" />
            </div>
            {/* <Modal openModal={openModal} onClick={() => setOpenModal(false)} /> */}
            {<Modal2
                isOpenModal2={isOpenModal2}
                setIsOpenModal2={setIsOpenModal2}
                bgColor='none'
                isShowBackButton={true}
                title=""
                y="mt-[-2.2rem]"
                x="ml-[-5rem]"

            ><RegisterContainer2 /></Modal2>}
        </>

    )
}