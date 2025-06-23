// Function to get the latitude and longitude of the user

export const geolocation = navigator.geolocation.getCurrentPosition((position: GeolocationPosition) => {
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;

    return { latitude, longitude };
}, (error: GeolocationPositionError) => {
    switch (error.code) {
        case error.PERMISSION_DENIED:
            return "User denied access for Geolocation.";
        case error.POSITION_UNAVAILABLE:
            return "Location not found.";
        case error.TIMEOUT:
            return "The request to get user location timed out";
        default:
            return "An unknown error occured";
    }
});