import { useNavigate, useParams } from "react-router-dom";
import Button from "../components/Button";
import { useStore } from "../store/useStore";

export default function Profile() {

    const navigate = useNavigate()
    const { prevPath } = useParams()

    const user = useStore(state => state.authUser.data)

    const handleClickBack = () => {
        if (prevPath === "home") {
            return navigate("/")
        }
        navigate(`/${prevPath}`)
    }
    return (
        <div className="bg-neutral-300 rounded-2xl m-auto p-2 mt-2 w-[50rem] ">
            <h1 className="text-5xl font-medium p-2 text-black ml-2 text-center">My Profile</h1>
            <div
                className="  p-4 rounded-l-xl flex flex-col items-center m-auto text-black"
            >
                <div className="flex flex-col w-[30rem]">
                    <div className="flex gap-5 pl-10">
                        <div className="flex gap-2">
                            <p className="text-xl font-semibold ">First name : </p>
                            <p className="text-xl ">{user.first_name}</p>
                        </div>
                        <div className="flex gap-2">
                            <p className="text-xl font-semibold ">Last name : </p>
                            <p className="text-xl  ">{user.last_name}</p>
                        </div>

                    </div>

                    <div className="flex gap-2 pl-10">
                        <p className="text-xl font-semibold ">Department : </p>
                        <p className="text-xl">{user.department.name}</p>
                    </div>

                    <div className="flex gap-2 pl-10 mt-1">
                        <p className="text-xl font-semibold ">Employee-id : </p>
                        <p className="text-xl">{user.employee_id || "-"}</p>
                    </div>

                    <div className="flex gap-2 pl-10 mt-1">
                        <p className="text-xl font-semibold ">Mobile number : </p>
                        <p className="text-xl">{user.mobile_phone}</p>
                    </div>

                    <div className="flex gap-2 pl-10 mt-1">
                        <p className="text-xl font-semibold ">Email : </p>
                        <p className="text-xl">{user.email}</p>
                    </div>

                </div>
                <div className="col-span-2 my-5 min-w-80">
                    <Button type="button" text="Back" color="green" onClick={handleClickBack} ></Button>
                </div>

            </div>
        </div>
    )
}
