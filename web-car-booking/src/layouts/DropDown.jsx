import { useState } from "react"
import useAuth from "../hooks/useAuth"
import { Link, useNavigate } from "react-router-dom"

import Modal2 from "../components/Modal2"
import RegisterCarFrom from "../features/createCAr/RegisterCarFrom"
import RegisterCarContainer from "../features/createCAr/RegisterCarContainer"

export default function Dropdown() {

    const { logout, authUser, isOpenModal2, setIsOpenModal2 } = useAuth()
    const navigate = useNavigate()

    const handleClickLogout = () => {
        logout()
        navigate("/login")
    }

    return (
        <>
            <div className="dropdown dropdown-end">
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full bg-slate-300 ">
                        <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M5 21C5 17.134 8.13401 14 12 14C15.866 14 19 17.134 19 21M16 7C16 9.20914 14.2091 11 12 11C9.79086 11 8 9.20914 8 7C8 4.79086 9.79086 3 12 3C14.2091 3 16 4.79086 16 7Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path> </g></svg>
                    </div>
                </div>
                <ul tabIndex={0} className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                        <a className="justify-between">
                            Profile
                        </a>
                    </li>
                    <li><a>My booking</a></li>
                    <li><a>Edit profile</a></li>
                    {authUser?.is_admin ? <li onClick={() => setIsOpenModal2(true)}><a>Register Car</a></li> : null}
                    <li onClick={handleClickLogout} ><a>Logout</a></li>

                </ul>
            </div>
            <Modal2
                isOpenModal2={isOpenModal2}
                setIsOpenModal2={setIsOpenModal2}
                isShowBackButton={false}
                tital=""
                bgColor="none"
            >
                <RegisterCarContainer />
            </Modal2>
        </>

    )
}