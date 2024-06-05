export default function Input({ placeholder }) {
    return (
        <input
            className="p-2 rounded-lg bg-neutral-300 border-2 border-neutral-500 w-full
             text-lg focus:outline-none"
            placeholder={placeholder}
        />
    )
}