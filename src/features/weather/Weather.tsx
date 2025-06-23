import React from "react";
import { useSelector } from "react-redux";
import { selectWeatherData, selectWeatherStatus } from "./weatherSlice";
import styles from "./weather.module.css";


const Weather: React.FC = () => {
    const weatherStatus = useSelector(selectWeatherStatus);
    const { description, icon, temperature, feelsLike } = useSelector(selectWeatherData);

    if (weatherStatus === "succeeded") {
        const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;

        return (
            <div className={styles.weatherContainer}>
                <div className={styles.weatherIcon}>
                    <img src={iconUrl} alt={description} />
                </div>
                <div className={styles.weatherDetails}>
                    <p className={styles.weatherTemperature}>{Math.ceil(temperature)}&deg;C</p>
                    <p className={styles.weatherDescription}>{description}</p>
                </div>
            </div>
        );
    }
    
    return null;
};

export default Weather;