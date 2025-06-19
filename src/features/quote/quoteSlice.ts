import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import fetchAPIData from "../../utils/fetchAPIData";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Quote, QuoteInitialState } from "../../types/quote.types";
import type { RootState } from "../../store";

const API_URL = "https://dummyjson.com/quotes/random";

const quoteInitialState: QuoteInitialState = {
    quote: {
        text: "",
        author: ""
    },
    isLoadingQuote: false,
    failedToLoadQuote: false
}

export const getQuote = createAsyncThunk<Quote, void, { rejectValue: string }>(
    "quote/getQuote",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                return rejectWithValue("Error: unable to fetch quote.");
            }

            const json = await response.json()
            if (!json.quote) {
                return rejectWithValue("Error: no quote text returned.");
            }

            const quote: Quote = {
                text: json.quote,
                author: json.author
            };

            //console.log("Quote:", quote);

            return quote;
        } catch (error: any) {
            return rejectWithValue(error.message || "An unknown error occurred during quote fetching.");
        }
    }
);

export const quoteSlice = createSlice({
    name: "quote",
    initialState: quoteInitialState,
    reducers: {
        resetQuote: () => {
            return quoteInitialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getQuote.fulfilled, (state, action: PayloadAction<Quote>) => {
                state.quote.text = action.payload.text;
                state.quote.author = action.payload.author || "Anonymous";
                state.isLoadingQuote = false;
                state.failedToLoadQuote = false;
            })
            .addCase(getQuote.pending, (state) => {
                state.quote.text = "";
                state.quote.author = "";
                state.isLoadingQuote = true;
                state.failedToLoadQuote = false;
            })
    }
});

export const { resetQuote } = quoteSlice.actions;
export const selectQuote = (state: RootState) => state.quote.quote;
//export const selectQuoteAuthor = (state: RootState) => state.quote.quote.author;
export const selectisQuoteLoading = (state: RootState) => state.quote.isLoadingQuote;
export const selectFailedToLoadQuote = (state: RootState) => state.quote.failedToLoadQuote;

export default quoteSlice.reducer;