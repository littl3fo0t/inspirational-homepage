import './App.css';
import { useEffect } from 'react';
import { useDispatch } from "react-redux";
import type { AppDispatch } from './store';
import BackgroundImageComponent from './features/backgroundImage/BackgroundImage';
import Quote from './features/quote/Quote';
import { getBackgroundImages } from './features/backgroundImage/backgroundImageSlice';
import { getQuote } from './features/quote/quoteSlice';
import { getWeatherData } from './features/weather/weatherSlice';
import Weather from './features/weather/Weather';

function App() {
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getBackgroundImages());
    dispatch(getQuote());
    dispatch(getWeatherData({city: "Halifax", countryCode: "CA"}));
  }, []);

  return (
    <>
      <BackgroundImageComponent />
      <Weather />
      <Quote />
    </>
  )
}

export default App
