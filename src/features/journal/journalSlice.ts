import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../../store";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { JournalInitialState } from "../../types/journal.types";

const journalInitialState: JournalInitialState = {
    entries: []
}

export const journalSlice = createSlice({
    name: "journal",
    initialState: journalInitialState,
    reducers: {
        addEntry: (state, action: PayloadAction<string>) => {
            state.entries.push({id: Date.now(), text: action.payload, isDone: false});
        },
        removeEntry: (state, action: PayloadAction<number>) => {
            state.entries = state.entries.filter(entry => entry.id !== action.payload);
        },
        markEntryComplete: (state, action: PayloadAction<number>) => {
            state.entries = state.entries.map(entry => entry.id === action.payload ? { ...entry, isDone: !entry.isDone } : entry);
        },
        clearEntries: (state) => {
            state.entries = [];
        }
    }
});

export const {
    addEntry,
    removeEntry,
    markEntryComplete,
    clearEntries
} = journalSlice.actions;

export const selectEntries = (state: RootState) => state.journal.entries;

export default journalSlice.reducer;