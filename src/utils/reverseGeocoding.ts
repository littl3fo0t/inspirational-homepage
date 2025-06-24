const API_URL = `http://api.openweathermap.org/geo/1.0/reverse?appid=${import.meta.env.VITE_OPENWEATHER_API_KEY}`;

const reverseGeocoding = async (latitude: number, longitude: number) => {
    const endpoint = `${API_URL}&lat=${latitude}&lon=${longitude}`;

    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error("Error: unable to perform reverse geocoding.");
        }

        const json = await response.json();
        if (!json || json.length === 0) {
            throw new Error("Error: no data returned from the API.");
        }

        return {
            city: json[0].name,
            countryCode: json[0].country
        };
    } catch (error: any) {
        console.log(error.message || "Unknown error occurred during reverse geocoding.");
    }
};

export default reverseGeocoding;