

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
                    <option className="text-gray-100 font-normal" value="1" >01:00</option>
                    <option className="text-gray-100 font-normal" value="2" >02:00</option>
                    <option className="text-gray-100 font-normal" value="3" >03:00</option>
                    <option className="text-gray-100 font-normal" value="4" >04:00</option>
                    <option className="text-gray-100 font-normal" value="5" >05:00</option>
                    <option className="text-gray-100 font-normal" value="6" >06:00</option>
                    <option className="text-gray-100 font-normal" value="7" >07:00</option>
                    <option className="text-gray-100 font-normal" value="8" >08:00</option>
                    <option className="text-gray-100 font-normal" value="9" >09:00</option>
                    <option className="text-gray-100 font-normal" value="10" >10:00</option>
                    <option className="text-gray-100 font-normal" value="11" >11:00</option>
                    <option className="text-gray-100 font-normal" value="12" >12:00</option>
                    <option className="text-gray-100 font-normal" value="13" >13:00</option>
                    <option className="text-gray-100 font-normal" value="14" >14:00</option>
                    <option className="text-gray-100 font-normal" value="15" >15:00</option>
                    <option className="text-gray-100 font-normal" value="16" >16:00</option>
                    <option className="text-gray-100 font-normal" value="17" >17:00</option>
                    <option className="text-gray-100 font-normal" value="18" >18:00</option>
                    <option className="text-gray-100 font-normal" value="19" >19:00</option>
                    <option className="text-gray-100 font-normal" value="20" >20:00</option>
                    <option className="text-gray-100 font-normal" value="21" >21:00</option>
                    <option className="text-gray-100 font-normal" value="22" >22:00</option>
                    <option className="text-gray-100 font-normal" value="23" >23:00</option>
                    <option className="text-gray-100 font-normal" value="0" >0:00</option>
                </select>
            </div>

        </div>
    )
}