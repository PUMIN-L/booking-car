

export default function TimeForm({ title = "", onChangeDate, name, onChangeTime, valueDay, valueTime }) {


    return (
        <div className="flex flex-col gap-2 w-full mt-10">
            <label className="font-semibold text-lg" htmlFor="pickUpTime">{`${title} `}</label>
            <div className="flex gap-2 ">

                <input

                    className="p-2 rounded-lg focus:outline-blue-900 grow"
                    type="date"
                    id={name}
                    name={name}
                    onChange={onChangeDate}
                    value={valueDay}
                />
                <select
                    role="button"
                    onChange={onChangeTime}
                    value={valueTime}
                    className={`p-2 rounded-lg  border-2 text-lg focus:outline-none outline-none border-none
                         `}
                >
                    <option className="text-gray-500 font-normal  " value="" >Time</option>
                    <option className="text-gray-100 font-normal" value="01:00" >01:00</option>
                    <option className="text-gray-100 font-normal" value="02:00" >02:00</option>
                    <option className="text-gray-100 font-normal" value="03:00" >03:00</option>
                    <option className="text-gray-100 font-normal" value="04:00" >04:00</option>
                    <option className="text-gray-100 font-normal" value="05:00" >05:00</option>
                    <option className="text-gray-100 font-normal" value="06:00" >06:00</option>
                    <option className="text-gray-100 font-normal" value="07:00" >07:00</option>
                    <option className="text-gray-100 font-normal" value="08:00" >08:00</option>
                    <option className="text-gray-100 font-normal" value="09:00" >09:00</option>
                    <option className="text-gray-100 font-normal" value="10:00" >10:00</option>
                    <option className="text-gray-100 font-normal" value="11:00" >11:00</option>
                    <option className="text-gray-100 font-normal" value="12:00" >12:00</option>
                    <option className="text-gray-100 font-normal" value="13:00" >13:00</option>
                    <option className="text-gray-100 font-normal" value="14:00" >14:00</option>
                    <option className="text-gray-100 font-normal" value="15:00" >15:00</option>
                    <option className="text-gray-100 font-normal" value="16:00" >16:00</option>
                    <option className="text-gray-100 font-normal" value="17:00" >17:00</option>
                    <option className="text-gray-100 font-normal" value="18:00" >18:00</option>
                    <option className="text-gray-100 font-normal" value="19:00" >19:00</option>
                    <option className="text-gray-100 font-normal" value="20:00" >20:00</option>
                    <option className="text-gray-100 font-normal" value="21:00" >21:00</option>
                    <option className="text-gray-100 font-normal" value="22:00" >22:00</option>
                    <option className="text-gray-100 font-normal" value="23:00" >23:00</option>
                    <option className="text-gray-100 font-normal" value="00:00" >0:00</option>
                </select>
            </div>

        </div>
    )
}