

export default function Modal({ children }) {
    return (
        <>
            <div className="fixed inset-0 bg-gray-800 z-20"></div>
            <div className="fixed inset-0 z-30">
                <div>{children}</div>
            </div>
        </>

    )
}