import { useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import validateLogin from "../validator/login-validate";
import { useNavigate } from "react-router-dom"
import useAuth from "../../../hooks/useAuth";
import useCar from "../../../hooks/useCar";
import carApi from "../../../apis/car-api";


const inputLoginInit = {
    emailOrMobile: "",
    password: ""
}

const errInputLoginInit = {
    emailOrMobile: "",
    password: ""
}


export default function LoginForm() {

    const navigate = useNavigate()

    const { login } = useAuth()
    const { setAllCarData } = useCar()

    const [inputLogin, setInputLogin] = useState(inputLoginInit)
    const [errInputLogin, setErrInputLogin] = useState(errInputLoginInit)

    const handalInputLogin = (e) => {
        setInputLogin({ ...inputLogin, [e.target.name]: e.target.value })

    }

    const handalSubmit = async (e) => {
        try {
            e.preventDefault()
            const err = validateLogin(inputLogin)
            if (err) {
                return setErrInputLogin(err)
            }
            setErrInputLogin(errInputLoginInit)
            await login(inputLogin)
            const gatAllCarData = await carApi.getAllCar()
            if (gatAllCarData) {
                setAllCarData(gatAllCarData.data.result)
            }
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <form
            className=" max-w-[22rem] ml-16 mt-2 flex flex-col gap-4"
            onSubmit={(e) => handalSubmit(e)}
        >
            <Input onChange={(e) => handalInputLogin(e)} err={errInputLogin.emailOrMobile} name="emailOrMobile" placeholder="Mobile or Email" />
            <Input onChange={(e) => handalInputLogin(e)} err={errInputLogin.password} name="password" placeholder="Password" />
            <Button type="submit" text="LOGIN" color="green" />
        </form>
    )
}