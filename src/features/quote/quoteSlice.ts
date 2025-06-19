import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
//import fetchAPIData from "../../utils/fetchAPIData";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { Quote } from "../../types/quote.types";

const API_URL = "http://api.forismatic.com/api/1.0/?method=getQuote&format=json&lang=en";

const quoteInitialState: Quote = {
    text: "",
    author: ""
}

export const getQuote = createAsyncThunk<Quote, void>(
    "quote/getQuote",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                return rejectWithValue("Error: unable to fetch quote.");
            }

            const json = await response.json()
            if (!json.quoteText) {
                return rejectWithValue("Error: no quote text returned.");
            }

            const quote: Quote = {
                text: json.quoteText,
                author: json.quoteAuthor
            };

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
                state.text = action.payload.text;
                state.author = action.payload.author || "Anonymous";
            })
    }
});