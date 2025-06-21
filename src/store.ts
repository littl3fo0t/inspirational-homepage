import { configureStore } from "@reduxjs/toolkit";
import journalReducer from "./features/journal/journalSlice";
import quoteReducer from "./features/quote/quoteSlice";
import backgroundImageReducer from "./features/backgroundImage/backgroundImageSlice";
import weatherReducer from "./features/weather/weatherSlice";

export const store = configureStore({
    reducer: {
        journal: journalReducer,
        quote: quoteReducer,
        backgroundImage: backgroundImageReducer,
        weather: weatherReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;