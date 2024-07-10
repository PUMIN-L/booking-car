import { useEffect, useState } from "react";
import Payment from "../features/payment/Payment";
import { useStore } from "../store/useStore";
import departmentApi from "../apis/department-api";

export default function PaymentPage() {

    const getMoney = useStore((state) => state.getMoney)
    const [money, setMoney] = useState(0)

    const handalChangeMoney = (e) => {
        setMoney(e.target.value)
    }

    const handleClickCheckout = async (e) => {
        e.preventDefault()
        const req = { name: String(money) }
        await departmentApi.updateMoney(req)
    }

    useEffect(() => {
        getMoney()
    }, [])

    return (
        <div className="flex justify-between p-10 w-[60rem] m-auto mt-20">
            <Payment />
            <form
                onSubmit={(e) => handleClickCheckout(e)}
                className="p-5 rounded-lg flex flex-col items-center justify-center"
            >
                <p>How mush do you want tp pay?</p>
                <input
                    type="number"
                    className="p-2 rounded-lg min-w-[14rem] mt-5"
                    value={money}
                    onChange={(e) => handalChangeMoney(e)}
                />
                <button className="bg-blue-400 p-2 text-white rounded-lg border-2 mt-5 min-w-[13.8rem]">check out</button>
            </form>
        </div>
    )
}
