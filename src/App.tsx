import './App.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch } from './store';
import BackgroundImageComponent from './features/backgroundImage/BackgroundImage';
import Quote from './features/quote/Quote';
import { getBackgroundImages } from './features/backgroundImage/backgroundImageSlice';
import { getQuote } from './features/quote/quoteSlice';
import { getWeatherData } from './features/weather/weatherSlice';
import Weather from './features/weather/Weather';
import reverseGeocoding from './utils/reverseGeocoding';
import { selectWeatherStatus } from './features/weather/weatherSlice';
import BackgroundImageNavigation from './features/backgroundImage/components/BackgroundImageNavigation';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getBackgroundImages());
    dispatch(getQuote());

    navigator.geolocation.getCurrentPosition(async (position: GeolocationPosition) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      try {
        const locationData = await reverseGeocoding(latitude, longitude);
        if (locationData) {
          dispatch(getWeatherData(locationData));
        }
      } catch (error: any) {
        console.log(error.message);
      }
    }, (error: GeolocationPositionError) => {
      switch (error.code) {
        case error.PERMISSION_DENIED:
          console.log("User denied access for Geolocation.");
          break;
        case error.POSITION_UNAVAILABLE:
          console.log("Location not found.");
          break;
        case error.TIMEOUT:
          console.log("The request to get user location timed out");
          break;
        default:
          console.log("An unknown error occured");
          break;
      }
    })
  }, []);

  const weatherStatus = useSelector(selectWeatherStatus);

  return (
    <>
      <BackgroundImageComponent />
      {weatherStatus === "succeeded" && <BackgroundImageNavigation />}
      <Weather />
      <Quote />
    </>
  )
}

export default App
