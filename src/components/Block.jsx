function Block({ element, oncli }) {
    return (
        <button onClick={oncli} className="justify-center w-24 h-24 text-xl bg-gray-800 rounded-lg border-slate-900">
            {element}
        </button>
    )
}

export default Block;
