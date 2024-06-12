

export default function Select({ inputErr = "", children, input = "", keyErr = "",
    name, onChange, keyName, correctValue = "", value, grow, bgColor = "neutral300" }) {

    const bg = {
        neutral300: "bg-neutral-300",
        neutral950: "bg-neutral-950",

    }

    return (
        <div>
            <select
                value={value}
                role="button"
                name={name}
                onChange={onChange}
                className={`p-2 rounded-lg ${bg[bgColor]} border-2  w-full ${grow ? grow : ""} 
             text-lg focus:outline-none ${!input[name] ? "text-gray-500" : "text-black"}   ${(input[name] && !inputErr[name] && correctValue) ? "border-green-600 focus:ring-green-500 text-black" :
                        inputErr[name] ? "border-red-500 focus:ring-red-400 text-black" :
                            "border-neutral-500 focus:ring-neutral-400"} `}
            >
                {children}
            </select>
            <small className="text-red-500">{inputErr[name]}</small>
        </div>
    )
}
