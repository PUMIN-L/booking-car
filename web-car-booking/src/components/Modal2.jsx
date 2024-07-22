import { useState } from "react"
import { useStore } from "../store/useStore"

export default function Modal2({ children, isShowBackButton = true,
    title = "", bgColor = "gray", y = "mt-[-2.2rem]", x = "ml-[-5rem]" }) {


    const setIsOpenModal2 = useStore((state) => state.setIsOpenModal2)
    const isOpenModal2 = useStore((state) => state.isOpenModal2)


    const [showBackButton, setShowBackButton] = useState(isShowBackButton)

    const backgroundColor = {
        gray: "bg-neutral-300",
        none: ""
    }

    const axisY = { y }
    const axisX = { x }

    return (
        <>

            {isOpenModal2 ? <>
                <div className="fixed inset-0 bg-gray-800 z-20 opacity-85"></div>
                <div className="fixed inset-0 z-30 mt-20 max-h-[30rem]">
                    <div
                        className={`${backgroundColor[bgColor]}  flex justify-between`}
                    >

                        <div className="m-auto pt-5 pb-16 ">
                            <div className="flex justify-center  ">
                                <h1 className="text-5xl font-medium p-2 text-black z-50">{title}</h1>
                                {showBackButton ?
                                    <h1
                                        role="button"
                                        className={`bg-gray-700  text-white p-1.5 rounded-md max-h-9 my-auto z-50 ${axisX.x}  ${axisY.y}`}
                                        onClick={() => setIsOpenModal2(false)}
                                    >
                                        BACK
                                    </h1> : null}

                            </div>
                            <div>{children}</div>
                        </div>

                    </div>


                </div>

            </> : null}


        </>

    )
}