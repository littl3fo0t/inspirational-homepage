import { createSlice, createAsyncThunk, type PayloadAction } from "@reduxjs/toolkit";
import type { BackgroundImageInitialState, BackgroundImage } from "../../types/backgroundImage.types";
import type { RootState } from "../../store";

const API_URL = `https://api.unsplash.com/search/photos?query=nature&page=1&per_page=5&client_id=${import.meta.env.VITE_UNSPLASH_ACCESS_KEY}`;

const initialBackgroundImageState: BackgroundImageInitialState = {
    images: [],
    status: "idle",
    error: null
};

export const getBackgroundImages = createAsyncThunk<BackgroundImage[], void, { rejectValue: string }>(
    "backgroundImage/getImage",
    async (_, { rejectWithValue }) => {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) {
                return rejectWithValue("Error: unable to fetch background image.");
            }

            const json = await response.json();
            if (json.results.length === 0) {
                return rejectWithValue("Error: no images returned from the API.");
            }

            const images: BackgroundImage[] = json.results.map((image: any) => {
                return {
                    description: image.alt_description,
                    url: image.urls.full
                };
            });

            //console.log("Images:", images);

            return images;
        } catch (error: any) {
            return rejectWithValue(error.message || "An unknown error occurred during image fetching.");
        }
    }
);

export const backgroundImageSlice = createSlice({
    name: "backgroundImage",
    initialState: initialBackgroundImageState,
    reducers: {
        resetBackgroundImages: () => {
            return initialBackgroundImageState;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getBackgroundImages.fulfilled, (state, action: PayloadAction<BackgroundImage[]>) => {
                state.images = action.payload;
                state.status = "succeeded";
                state.error = null;
            })
            .addCase(getBackgroundImages.pending, (state) => {
                state.images = [];
                state.status = "loading";
                state.error = null
            })
            .addCase(getBackgroundImages.rejected, (state, action) => {
                state.images = [];
                state.status = "failed";
                state.error = action.payload as string || action.error.message || "Unknown error.";
            })
    }
});

export const { resetBackgroundImages } = backgroundImageSlice.actions;
export const selectImages = (state: RootState) => state.backgroundImage.images;
export const selectBackgroundImagesStatus = (state: RootState) => state.backgroundImage.status;

export default backgroundImageSlice.reducer;