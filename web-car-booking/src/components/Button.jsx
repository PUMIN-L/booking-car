


export default function Button({ text, color = "yellow", type, onClick }) {

    const background = {
        green: "bg-green-800 hover:bg-green-900",
        yellow: "bg-amber-600 hover:bg-yellow-700",
        red: "bg-red-600 hover:bg-red-700"
    }

    return (
        <button
            className={`${background[color]} rounded-md text-white font-normal
            p-2 w-full text-lg`}
            type={type}
            onClick={onClick}
        >
            {text}
        </button>
    )
}