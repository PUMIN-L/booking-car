import { useRef, useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import useAuth from "../../hooks/useAuth";
import { ImageIcon } from "../../icons";
import Select from "../../components/Select";
import carApi from "../../apis/car-api";
import validatorRegisterCar from "./calidator/car-register-validator";

export default function RegisterCarFrom() {

    const inputInit = {
        type_id: "",
        brand: "",
        model: "",
        transmission: "",
        color: "",
        license_plate: ""

    }

    const inputErrInit = {
        type_id: "",
        brand: "",
        model: "",
        transmission: "",
        color: "",
        license_plate: ""

    }

    const { setIsOpenModal2 } = useAuth()

    const fileEl = useRef()





    const [input, setInput] = useState(inputInit)
    const [inputErr, setInputErr] = useState(inputErrInit)
    const [correctValue, setCorrectValue] = useState(false)
    const [file, setFile] = useState(null)

    const handleChange = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const err = validatorRegisterCar(input)
        if (err) {
            setInputErr(err)
            console.log(inputErr)
        }
        setCorrectValue(true)
        if (!err) {
            const data = new FormData()
            if (file) {
                data.append("img_car", file)
            }
            data.append("type_id", input.type_id)
            data.append("brand", input.brand)
            data.append("model", input.model)
            data.append("transmission", input.transmission)
            data.append("color", input.color)
            data.append("license_plate", input.license_plate)
            carApi.registerCar(data)

            setCorrectValue(false)
            setFile(null)
            setInput(inputInit)
            setIsOpenModal2(false)
            setTimeout(() => {
                alert("Create car success")
            }, 0)

        }


    }

    const handleClickDelete = (e) => {
        e.stopPropagation()
        setFile(null)
        fileEl.current.value = ""
    }

    return (
        <>
            <div className="bg-neutral-300 rounded-l-2xl p-2 overflow-auto">
                <h1 className="text-5xl font-medium p-2 text-black ml-2">Register Car</h1>
                <form
                    onSubmit={(e) => handleSubmit(e)}
                    className="flex flex-col gap-3 p-5 h-[30rem] min-w-[30rem] max-w-[31rem] overflow-auto"
                >


                    <Select
                        inputErr={inputErr}
                        name="type_id"
                        value={input["type_id"]}
                        onChange={((e) => setInput({ ...input, [e.target.name]: +e.target.value }))}
                        input={input}
                        correctValue={correctValue}
                    >
                        <option className="text-gray-600 font-normal" value="" >Type of car</option>
                        <option className="text-black font-normal" value={1} >Sedan</option>
                        <option className="text-black font-normal" value={2} >Motorcycle</option>
                        <option className="text-black font-normal" value={3} >Truck</option>
                        <option className="text-black font-normal" value={4} >Van</option>
                        <option className="text-black font-normal" value={5} >Minivan</option>
                    </Select>

                    <div >
                        <Input
                            placeholder="Brand"
                            onChange={(e) => handleChange(e)}
                            name="brand"
                            value={input["brand"]}
                            err={inputErr.brand}
                            correctValue={correctValue}
                        />
                    </div>


                    <div>
                        <Input
                            placeholder="Model"
                            onChange={(e) => handleChange(e)}
                            name="model"
                            value={input["model"]}
                            err={inputErr.model}
                            correctValue={correctValue}
                        />
                    </div>
                    <div> <Input placeholder="License Plate"
                        name="license_plate"
                        value={input["license_plate"]}
                        err={inputErr.license_plate}
                        onChange={(e) => handleChange(e)}
                        correctValue={correctValue}

                    /></div>
                    <div><Input placeholder="color"
                        name="color"
                        value={input["color"]}
                        err={inputErr.color}
                        onChange={(e) => handleChange(e)}
                        correctValue={correctValue}
                    /></div>
                    <div>
                        <Select
                            inputErr={inputErr}
                            name="transmission"
                            value={input["transmission"]}
                            onChange={((e) => setInput({ ...input, [e.target.name]: e.target.value }))}
                            input={input}
                            correctValue={correctValue}
                        >
                            <option className="text-gray-600 font-normal" value="" >Transmission</option>
                            <option className="text-black font-normal" value="AUTOMATIC_TRANSMISSION" >AUTOMATIC</option>
                            <option className="text-black font-normal" value="MANUAL_TRANSMISSION" >MANUAL</option>
                        </Select>
                    </div>



                    <input
                        type="file"
                        ref={fileEl}
                        className="hidden"
                        onChange={e => {
                            if (e.target.files[0]) {
                                setFile(e.target.files[0])
                            }
                        }}
                    />

                    <div
                        role="button"
                        onClick={() => fileEl.current.click()}
                        className={`col-span-2 row-span-3 p-2 rounded-lg bg-neutral-300 ${file ? null : "border-2 border-neutral-500"} w-full
             text-lg focus:outline-none `}
                    >



                        {file ?
                            <div className=" relative">
                                <img className="max-w-[25rem] m-auto rounded-lg max-h-[9.5rem]" src={file ? URL.createObjectURL(file) : undefined} />
                                <p
                                    className="bg-neutral-500 text-white absolute right-0 top-32 p-1 flex justify-center items-center rounded-lg text-xs"
                                    onClick={(e) => handleClickDelete(e)}
                                >Delete ptictue
                                </p>
                            </div>
                            :
                            <div>
                                <div
                                    className="min-w-[6rem] h-[6rem] flex justify-center items-center ">
                                    <ImageIcon />
                                </div>

                                <p className="text-center font-bold text-3xl">Add Photo</p>
                            </div>
                        }



                    </div>

                    <div><Button text="Add" color="green" type="submit" /></div>
                    <div><Button onClick={() => setIsOpenModal2(false)} text="Cancel" color="red" /></div>


                </form>
            </div>
        </>
    )
}