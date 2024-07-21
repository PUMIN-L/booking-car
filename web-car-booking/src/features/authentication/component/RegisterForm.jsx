import { useEffect, useState } from "react";
import Button from "../../../components/Button";
import Input from "../../../components/Input";
import validatorRegister from "../validator/register-validate";
import autApi from "../../../apis/aut-api";

const dataUserInit = {
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    mobile_phone: "",
    img_user: "",
    employee_id: "",
    department_id: "",
    confirm_password: ""
}

const errDataUserInit = {
    first_name: "",
    last_name: "",
    password: "",
    email: "",
    mobile_phone: "",
    img_user: "",
    employee_id: "",
    department_id: "",
    confirm_password: ""
}


export default function RegisterForm({ setIsOpenModal2 }) {

    const [input, setInput] = useState(dataUserInit)
    const [correctValue, setCorrectValue] = useState(false)
    const [inputErr, setInputErr] = useState(errDataUserInit)

    const handelChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handelChangeIntValue = (e) => {
        setInput({ ...input, [e.target.name]: +e.target.value })
    }

    const handelSubmit = async (e) => {
        try {
            e.preventDefault()
            const err = validatorRegister(input)
            setCorrectValue(true)
            if (err) {
                return setInputErr(err)
            }
            setInputErr({ ...errDataUserInit })
            setIsOpenModal2(false)
            await autApi.register(input)
            setCorrectValue(false)
            alert("Create user is success")
            setInput(dataUserInit)
        } catch (error) {
            console.log(error)
        }

    }
    useEffect(() => {
        setCorrectValue(false)
    }, [])

    return (
        <>
            <div className="bg-neutral-300 rounded-l-2xl p-2 mt-[-2rem] ">
                <h1 className="text-5xl font-medium p-2 text-black ml-2">Register</h1>
                <form
                    className="overflow-auto max-w-[31rem] h-[32rem] p-4 rounded-l-xl grid grid-cols-2 gap-3 "
                    onSubmit={(e) => handelSubmit(e)}
                >
                    <div><Input
                        name="first_name"
                        onChange={(e) => handelChange(e)}
                        value={input["first_name"]}
                        placeholder="First name"
                        err={inputErr["first_name"]}
                        correctValue={correctValue}
                    />
                    </div>

                    <div><Input name="last_name"
                        onChange={(e) => handelChange(e)}
                        value={input["last_name"]}
                        placeholder="Last name"
                        err={inputErr["last_name"]}
                        correctValue={correctValue}
                    />
                    </div>

                    <div>

                        <select onChange={(e) => handelChangeIntValue(e)}
                            role="button"
                            name="department_id"
                            value={input["department_id"]}
                            className={`p-2 rounded-lg bg-neutral-300 border-2  w-full
             text-lg focus:outline-none ${!input["department_id"] ? "text-gray-500" : "text-black"}   ${(input["department_id"] && !inputErr["department_id"] && correctValue) ? "border-green-600 focus:ring-green-500 text-black" :
                                    inputErr["department_id"] ? "border-red-500 focus:ring-red-400 text-black" :
                                        "border-neutral-500 focus:ring-neutral-400"} 
                    
              `}

                        >
                            <option value="" >Department</option>
                            <option className="text-black font-medium" value={1} >Sales</option>
                            <option className="text-black font-medium" value={2} >Executive</option>
                            <option className="text-black font-medium" value={3} >Marketing</option>
                            <option className="text-black font-medium" value={4} >Purchasing</option>
                            <option className="text-black font-medium" value={5} >Warehouse</option>
                            <option className="text-black font-medium" value={6} >IT</option>
                            <option className="text-black font-medium" value={7} >Maintenance</option>
                            <option className="text-black font-medium" value={8} >Human Resource</option>
                        </select>
                        <small className="text-red-500">{inputErr["department_id"]}</small>
                    </div>


                    <div>
                        <Input name="employee_id"
                            onChange={(e) => handelChange(e)}
                            value={input["employee_id"]}
                            placeholder="Employee ID"
                            err={inputErr["employee_id"]}
                            correctValue={correctValue}
                        />
                    </div>
                    <div className="col-span-2">
                        <Input
                            name="mobile_phone"
                            onChange={(e) => handelChange(e)}
                            value={input["mobile_phone"]}
                            placeholder="Mobile phone"
                            err={inputErr["mobile_phone"]}
                            correctValue={correctValue}
                        />
                    </div>

                    <div className="col-span-2">
                        <Input
                            name="email"
                            onChange={(e) => handelChange(e)}
                            value={input["email"]}
                            placeholder="Email"
                            err={inputErr["email"]}
                            correctValue={correctValue}
                        />

                    </div>

                    <div className="col-span-2">
                        <Input
                            name="password"
                            onChange={(e) => handelChange(e)}
                            value={input["password"]}
                            placeholder="Password"
                            err={inputErr["password"]}
                            correctValue={correctValue}
                        />
                    </div>

                    <div className="col-span-2">
                        <Input
                            name="confirm_password"
                            onChange={(e) => handelChange(e)}
                            value={input["confirm_password"]}
                            placeholder="Confirm password"
                            err={inputErr["confirm_password"]}
                            correctValue={correctValue}
                        />
                    </div>

                    <div className="col-span-2 my-2">
                        <Button type="submit" text="Register" color="green" ></Button>

                    </div>

                </form>
            </div>
        </>
    )
}

