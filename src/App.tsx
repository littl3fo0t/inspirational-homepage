import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import type { AppDispatch } from './store';
import { useDispatch, useSelector } from 'react-redux';
import { getQuote, selectQuote } from './features/quote/quoteSlice';
import {
  getBackgroundImages,
  selectImages,
  selectBackgroundImagesStatus
} from './features/backgroundImage/backgroundImageSlice';
import fallbackImage from "./assets/images/background-img-fallback.svg";
import confetti from "canvas-confetti";

function App() {
  const [count, setCount] = useState(0);

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getQuote());
    dispatch(getBackgroundImages());

    //document.body.style.backgroundImage = "url('" + currentImage.url + "')";
  }, [])

  const { text, author } = useSelector(selectQuote);
  const images = useSelector(selectImages);
  const imageStatus = useSelector(selectBackgroundImagesStatus);
  const currentImage = images[0];
  //console.log(fallbackImage);
  //`url('${currentImage.url}')`

  useEffect(() => {
    if (imageStatus === "succeeded" && currentImage) {
      document.body.style.backgroundImage = `url('${currentImage.url}')`;
    } else {
      document.body.style.backgroundImage = `url('${fallbackImage}')`;
    }
    document.body.style.backgroundSize = "cover";
    document.body.style.backgroundPosition = "center";
    document.body.style.backgroundRepeat = "no-repeat";
  }, [imageStatus, currentImage]);

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)} id='count-btn'>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
      <p>Quote: {text}; Author: {author}</p>
    </>
  )
}

export default App
