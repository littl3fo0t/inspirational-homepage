export interface Quote {
    text: string,
    author: string
};

export interface QuoteInitialState {
    quote: Quote,
    status: "idle" | "loading" | "succeeded" | "failed",
    error: string | null
};