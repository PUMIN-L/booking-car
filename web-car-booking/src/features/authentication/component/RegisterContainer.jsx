import Button from "../../../components/Button";
import Modal from "../../../components/Modal";
import RegisterForm from "./RegisterForm";

export default function RegisterContainer() {
    return (
        <>
            <div className="max-w-[22rem] ml-16 mt-5 pb-5">
                <Button text="REGISTER" />
            </div>
            <Modal>
                <RegisterForm />
            </Modal>
        </>

    )
}