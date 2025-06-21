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
    status: "idle",
    error: null
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
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(getQuote.pending, (state) => {
                state.quote.text = "";
                state.quote.author = "";
                state.status = "loading";
                state.error = null;
            })
            .addCase(getQuote.rejected, (state, action) => {
                state.quote.text = "";
                state.quote.author = "";
                state.status = "failed";
                state.error = action.payload as string || action.error.message || "Unknown error.";
            })
    }
});

export const { resetQuote } = quoteSlice.actions;
export const selectQuote = (state: RootState) => state.quote.quote;
export const selectisQuoteLoading = (state: RootState) => state.quote.status;
export const selectFailedToLoadQuote = (state: RootState) => state.quote.error;

export default quoteSlice.reducer;