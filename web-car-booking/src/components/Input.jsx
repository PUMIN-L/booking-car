export default function Input({ placeholder, name, onChange, value, err, correctValue }) {
    return (
        <>
            <input
                className={`p-2 rounded-lg bg-neutral-300 border-2 w-full
             text-lg focus:outline-none focus:ring-2 
              ${(correctValue && !err && value) ? "border-green-600 focus:ring-green-500" : err ? "border-red-500 focus:ring-red-400" : "border-neutral-500 focus:ring-neutral-400 "}
             `}
                placeholder={placeholder}
                name={name}
                onChange={onChange}
                value={value}
            />
            {err ? <small className="text-red-500 mt-[-1rem]">{err}</small> : null}
        </>

    )
}