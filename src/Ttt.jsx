import Board from './components/Board.jsx';
import "./App.css";
import { useEffect, useLayoutEffect } from "react";
import Popup from "./components/Popup.jsx";
import { useGameData } from './store/store.js';


function Ttt() {
    const won = useGameData((state) => state.won)
    const whoturn = useGameData((state) => state.whoturn)
    const Turns = useGameData((state) => state.nturn)
    const setTurns = useGameData((state) => state.upateNturn)
    const data = useGameData((state) => state.data)
    const clean = useGameData((state) => state.clean)

    useEffect(() => {
        const value = Turns + 1
        setTurns(value);
    }, [data]);


    return (
        <div className="flex flex-col bg-gray-900 text-white items-center justify-center min-h-screen">
            <div className="flex flex-col gap-y-5">
                <Board />
            </div>
            <div className="py-5">
                <Popup isVisible={Turns === 9 ? true : false} onClose={clean} message={Turns === 9 ? "Draw" : "noob"} />
                <Popup isVisible={won} onClose={clean} message={whoturn === "O" ? "player O's won" : "player X's won"} />
                <Detail whoturn={whoturn} />
            </div>
            <button onClick={clean} className="my-8 items-center justify-center w-24 h-16 text-xl bg-gray-800 rounded-lg border-slate-900">
                Reset
            </button>
        </div>
    )
}

function Detail({ whoturn }) {
    if (whoturn === "O") {
        return <span>Player X's turn</span>
    } else {
        return <span>Player O's turn</span>
    }
}

export default Ttt;
