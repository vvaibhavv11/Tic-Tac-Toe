import Block from "./components/Block.jsx"
import { invoke } from '@tauri-apps/api/tauri'
import "./App.css";
import { useCallback, useLayoutEffect, useState } from "react";
import Popup from "./components/Popup.jsx";


function Ttt() {
    const [Turns, setTurns] = useState(0)
    const [won, setwon] = useState(false);
    const [whoturn, setwhoturn] = useState("O")
    const [data, setdata] = useState({
        r1c1: "",
        r1c2: "",
        r1c3: "",
        r2c1: "",
        r2c2: "",
        r2c3: "",
        r3c1: "",
        r3c2: "",
        r3c3: "",
    })

    const change = async (cell) => {
        if (data[cell].length) {
            return
        }

        const change = await invoke("change_value", { data: `${whoturn}` });
        whoturn === "O" ? setwhoturn("X") : setwhoturn("O");
        setdata(prevdata => ({
            ...prevdata,
            [cell]: change,
        }));
    }

    useLayoutEffect(() => {
        async function wincheck() {
            const win = await invoke("win_condition", { celldata: data })
            if (win) {
                setwon(true)
            }
        }
        wincheck()
    }, [data])

    useLayoutEffect(() => {
        setTurns(Turns + 1);
    }, [data]);

    const clean = useCallback(() => {
        setdata({
            r1c1: "",
            r1c2: "",
            r1c3: "",
            r2c1: "",
            r2c2: "",
            r2c3: "",
            r3c1: "",
            r3c2: "",
            r3c3: "",
        })
        setwhoturn("O")
        setwon(false)
        setTurns(0)
    })

    return (
        <div className="flex flex-col bg-gray-900 text-white items-center justify-center min-h-screen">
            <div className="flex flex-col gap-y-5">
                <div className="flex items-center justify-center">Tic Tac Toe</div>
                <div className="flex flex-row gap-x-5 bg-gray-900">
                    <Block element={data.r1c1} oncli={() => change("r1c1")}></Block>
                    <Block element={data.r1c2} oncli={() => change("r1c2")}></Block>
                    <Block element={data.r1c3} oncli={() => change("r1c3")}></Block>
                </div>
                <div className="flex flex-row gap-x-5 bg-gray-900">
                    <Block element={data.r2c1} oncli={() => change("r2c1")}></Block>
                    <Block element={data.r2c2} oncli={() => change("r2c2")}></Block>
                    <Block element={data.r2c3} oncli={() => change("r2c3")}></Block>
                </div>
                <div className="flex flex-row gap-x-5 bg-gray-900">
                    <Block element={data.r3c1} oncli={() => change("r3c1")}></Block>
                    <Block element={data.r3c2} oncli={() => change("r3c2")}></Block>
                    <Block element={data.r3c3} oncli={() => change("r3c3")}></Block>
                </div>
            </div>
            <div className="py-5">
                <Popup isVisible={Turns === 10 ? true : false} onClose={clean} message={Turns === 10 ? "Draw" : "noob"} />
                <Popup isVisible={won} onClose={clean} message={whoturn === "O" ? "player O's won" : "player X's won"} />
                <Detail whoturn={whoturn} />
            </div>
            <button onClick={clean} className="justify-center w-24 h-16 text-xl bg-gray-800 rounded-lg border-slate-900">
                Reset
            </button>
        </div>
    )
}

// {won === false ? (whoturn === "O" ? "player X's turn" : "player O's turn") : (whoturn === "O" ? "player X's won" : "player O's won")}
function Detail({ whoturn }) {
    if (whoturn === "O") {
        return <span>Player X's turn</span>
    } else {
        return <span>Player O's turn</span>
    }
}


export default Ttt;
