export interface Weather {
    description: string,
    icon: string,
    temperature: number,
    feelsLike: number
};

export interface WeatherInitialState {
    weather: Weather,
    status: "idle" | "loading" | "succeeded" | "failed",
    error: string | null
}