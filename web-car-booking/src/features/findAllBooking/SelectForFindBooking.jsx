import { useStore } from "../../store/useStore"


export default function SelectForFindBooking({ nameSelect, onChange, w }) {

    const allUserStore = useStore(state => state.allUser.data)
    const allCarData = useStore((state) => state.allCar.data)

    const width = {
        "16rem": "min-w-[16rem]"
    }

    return (
        <div className="flex flex-col justify-center items-center">
            <select
                onChange={onChange}
                role="button"
                id="selectByUser"
                className={`w-[12rem] rounded-md p-2  text-lg font-medium ${width[w]}`}
            >
                <option
                    value=""
                    className=""
                >{nameSelect}</option>

                {nameSelect === "Select By User" ? allUserStore.map(user => {

                    if (user.id !== 12) {
                        return <option key={user.id}
                            value={user.id}>{user.first_name}</option>
                    }

                }) : null}

                {nameSelect === "Select By Car" ? allCarData.map(car => <option key={car.id}
                    value={car.id}>{`${car.brand} ${car.model} ${car.license_plate}`}</option>) : null}


                {nameSelect === "Select by Status" ? (
                    <>
                        <option value="PANDING">Panding</option>
                        <option value="RESERVED">Reserved</option>
                        <option value="RETURNED">Returned</option>
                    </>
                ) : null}

                Select Status
            </select>
        </div>
    )
}
