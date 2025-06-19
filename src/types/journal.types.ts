export interface Journal {
    id: number,
    text: string,
    isDone: boolean
};

export interface JournalInitialState {
    entries: Journal[]
};