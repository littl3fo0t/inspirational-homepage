import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { WeatherInitialState, Weather } from "../../types/weather.types";
import type { RootState } from "../../store";

const API_URL = `https://api.openweathermap.org/data/2.5/weather?appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}&units=metric`;

const weatherInitialState: WeatherInitialState = {
    weather: {
        description: "",
        icon: "",
        temperature: 0,
        feelsLike: 0
    },
    status: "idle",
    error: null
};

export const getWeatherData = createAsyncThunk<Weather, { city: string, countryCode: string }, { rejectValue: string }>(
    "weather/getWeatherData",
    async ({ city, countryCode }, { rejectWithValue }) => {
        const endpoint = `${API_URL}&q=${city}&country=${countryCode}`;
        try {
            const response = await fetch(endpoint);
            if (!response.ok) {
                return rejectWithValue("Error: unable to get weather data.");
            }

            const json = await response.json();
            if (!json.weather || !json.main) {
                return rejectWithValue("Error: no weather data returned from the API.");
            }

            const weatherData: Weather = {
                description: json.weather[0].description,
                icon: json.weather[0].icon,
                temperature: json.main.temp,
                feelsLike: json.main.feels_like
            };

            return weatherData;
        } catch (error: any) {
            return rejectWithValue(error.message || "An unknown error occured when fetching weather data.");
        }
    }
);

export const weatherSlice = createSlice({
    name: "weather",
    initialState: weatherInitialState,
    reducers: {
        resetWeatherData: () => {
            return weatherInitialState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getWeatherData.fulfilled, (state, action: PayloadAction<Weather>) => {
                state.weather = action.payload;
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(getWeatherData.pending, (state) => {
                state.weather.description = "";
                state.weather.icon = "";
                state.weather.temperature = 0;
                state.weather.feelsLike = 0;
                state.status = "loading";
                state.error = null;
            })
            .addCase(getWeatherData.rejected, (state, action) => {
                state.weather.description = "";
                state.weather.icon = "";
                state.weather.temperature = 0;
                state.weather.feelsLike = 0;
                state.status = "failed";
                state.error = action.payload as string || action.error.message || "Unknown error.";
            })
    }
});

export const { resetWeatherData } = weatherSlice.actions;
export const selectWeatherData = (state: RootState) => state.weather.weather;
export const selectWeatherStatus = (state: RootState) => state.weather.status;
export const selectWeatherError = (state: RootState) => state.weather.error;

export default weatherSlice.reducer;