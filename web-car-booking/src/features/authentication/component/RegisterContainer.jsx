import { useState } from "react";
import Button from "../../../components/Button";
import Modal from "./Modal";

export default function RegisterContainer() {

    const [openModal, setOpenModal] = useState(false)

    return (
        <>
            <div className="max-w-[22rem] ml-16 mt-5 pb-5">
                <Button onClick={() => setOpenModal(true)} text="REGISTER" />
            </div>
            <Modal openModal={openModal} onClick={() => setOpenModal(false)} />
        </>

    )
}