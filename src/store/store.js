import { create } from "zustand"

const useGameData = create((set) => ({
    data: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    updateData: (i, j, changedata) => set((state) => {
        const newdata = [...state.data]
        newdata[i][j] = changedata
        return { data: newdata }
    }),
    whoturn: 'x',
    updateWhoTurn: (value) => set(() => ({ whoturn: value })),
    won: false,
    updateWon: (bol) => set(() => ({ won: bol })),
    nturn: 0,
    upateNturn: (value) => set(() => ({ nturn: value })),
    clean: () => set(() => ({
        data: [
            ['', '', ''],
            ['', '', ''],
            ['', '', '']
        ],
        whoturn: 'x',
        won: false,
        nturn: 0
    }))
}))

export { useGameData }
