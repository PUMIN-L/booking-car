
import { useStore } from "../store/useStore";
import Dropdown from "./DropDown";


export default function Header() {


    const authUser = useStore((state) => state.authUser.data)

    return (
        <div className="navbar bg-neutral shadow-lg ">
            <div className="flex-1 w-2">
                <h1 className="pl-2 w-46 font-semibold text-2xl text-slate-300">PRIMO COMPANY</h1>
            </div>
            <div className="flex-none gap-2">

                <p className=" text-2xl font-semibold text-slate-300">{authUser?.first_name}</p>

                <Dropdown />

                <input type="checkbox" value="retro" className="toggle theme-controller mx-4" />
            </div>
        </div>
    )
}