import { useLayoutEffect } from "react";
import { invoke } from '@tauri-apps/api/tauri'
import Block from "./Block";
import { useGameData } from "../store/store";

export const Board = () => {
    const whoturn = useGameData((state) => state.whoturn)
    const setWhoturn = useGameData((state) => state.updateWhoTurn)
    const data = useGameData((state) => state.data)
    const setData = useGameData((state) => state.updateData)
    const setWon = useGameData((state) => state.updateWon)

    const change = async (i, j) => {
        if (data[i][j].length) {
            return
        }
        const change = await invoke("change_value", { data: `${whoturn}` });

        setData(i, j, change);
    }

    async function computer(data) {

        let bestmove = { i: 0, j: 0 }
        let bestValue = -Infinity

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                if (data[i][j] === "") {
                    data[i][j] = 'X'
                    let moveValue = await invoke("minimax", { data: data, depth: 0, is_max: false })
                    data[i][j] = ""
                    if (moveValue > bestValue) {
                        bestValue = moveValue
                        bestmove = {
                            i: i,
                            j: j
                        }
                    }
                }
            }
        }
        return bestmove
    }

    useLayoutEffect(() => {
        async function aimove() {
            if (whoturn === 'X') {
                let ai = await computer(copy_array(data))
                setData(ai.i, ai.j, 'X');
            }
        }
        aimove()
    }, [data])

    useLayoutEffect(() => {
        whoturn === 'X' ? setWhoturn('O') : setWhoturn('X')
    }, [data])

    useLayoutEffect(() => {
        async function wincheck() {
            const win = await invoke("win_condition", { game: data })
            if (win) {
                setWon(true)
            }
        }
        wincheck();
    }, [data]);

    return (
        <>
            <div className="flex items-center justify-center">Tic Tac Toe</div>
            {data.map((row, rowIndex) => (
                <div key={rowIndex} className="flex flex-row gap-x-5 bg-gray-900">
                    {row.map((element, colIndex) => (
                        <Block key={colIndex} element={element} oncli={() => { change(rowIndex, colIndex) }} />
                    ))}
                </div>
            ))}
        </>
    );
};

function copy_array(board) {
    let array = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ]
    for (let i=0; i<3; i++) {
        for (let j=0; j<3; j++) {
            array[i][j] = board[i][j]
        }
    }
    return array
}

export default Board;
