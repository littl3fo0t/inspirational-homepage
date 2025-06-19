export interface Quote {
    text: string,
    author: string
};

export interface QuoteInitialState {
    quote: Quote,
    isLoadingQuote: boolean,
    failedToLoadQuote: boolean
};