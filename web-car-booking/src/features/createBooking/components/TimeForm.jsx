export default function TimeForm({ title = "" }) {
    return (
        <div className="flex flex-col gap-2 w-full mt-10">
            <label className="font-semibold text-lg" htmlFor="pickUpTime">{`${title} `}</label>
            <input className="p-2 rounded-lg focus:outline-blue-900" type="datetime-local" id="pickUpTime" name="pickUpTime" />
        </div>
    )
}