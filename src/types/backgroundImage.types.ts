export interface BackgroundImage {
    description: string,
    url: string
};

export interface BackgroundImageInitialState {
    images: BackgroundImage[],
    currentImageIndex: number,
    status: "idle" | "loading" | "succeeded" | "failed",
    error: string | null
};