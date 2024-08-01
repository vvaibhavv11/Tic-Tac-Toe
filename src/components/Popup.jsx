function Popup({ isVisible, onClose, message }) {
    if (!isVisible) return null;

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
            <div className="bg-gray-800 text-white p-6 rounded-lg w-full max-w-lg shadow-lg relative">
                <button
                    className="absolute top-2 right-2 text-white text-2xl focus:outline-none"
                    onClick={onClose}
                >
                    &times;
                </button>
                <p>{message}</p>
            </div>
        </div>
    );
};

export default Popup;

