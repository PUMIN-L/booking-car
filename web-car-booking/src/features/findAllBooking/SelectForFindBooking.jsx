import useUser from "../../hooks/useUser"


export default function SelectForFindBooking({ nameSelect, onChange }) {

    const { allUser } = useUser()

    return (
        <div className="flex flex-col justify-center items-center">
            <select
                onChange={onChange}
                role="button"
                id="selectByUser"
                className="w-[12rem] rounded-md p-2  text-lg font-medium"
            >
                <option
                    value=""
                    className=""
                >{nameSelect}</option>
                {allUser.map(user => <option key={user.id} value={user.id}>{user.first_name}</option>)}
            </select>
        </div>
    )
}
