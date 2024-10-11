import React, { useEffect, useRef, useState } from 'react';
import { IoMdSearch } from "react-icons/io";
import clear from '../assets/images/clear.png';
import cloud from '../assets/images/cloud.webp';
import rain from '../assets/images/rain.webp';
import snow from '../assets/images/snow.webp';
import drizzle from '../assets/images/drizzle.webp';
import wind from '../assets/images/wind.webp';
import humidity from '../assets/images/humidity.webp';

const Weather = ({ setBackgroundImage, setContainerBgColor }) => {
    const [data, setData] = useState(null)
    const inputRef = useRef()

    const allIcons = {
        "01d": clear,
        "01n": clear,
        "02d": cloud,
        "02n": cloud,
        "03d": cloud,
        "03n": cloud,
        "04d": drizzle,
        "04n": drizzle,
        "09d": rain,
        "09n": rain,
        "10d": rain,
        "10n": rain,
        "13d": snow,
        "13n": snow,
    };


    const search = async (city) => {
        if (!city) {
            alert("Please enter the city name")
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`
            const response = await fetch(url);
            const data = await response.json();

            if (!response.ok) {
                alert(data.message);
                return;
            }

            const icon = allIcons[data.weather[0].icon] || clear
            setData({
                humidity: data.main.humidity,
                windSpeed: data.wind.speed,
                temperature: Math.floor(data.main.temp),
                location: data.name,
                icon: icon,
                timezone: data.timezone,
            });

            const localTime = new Date(Date.now() + data.timezone * 1000);
            const hour = localTime.getUTCHours();
            setBackgroundImage(hour >= 6 && hour < 18
                ? 'url(src/assets/images/background/morning-sky.webp)'
                : 'url(src/assets/images/background/night-sky.webp)');

            setContainerBgColor(hour >= 6 && hour < 18 ? 'gold' : '#6f7dbb');

            inputRef.current.value = '';
        } catch (error) {
            console.error("Error fetching weather data:", error);
            alert("Error in fetching weather data.");
            setData(null);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            search(inputRef.current.value);
        }
    };

    useEffect(() => {
        search('');
    }, []);

    return (
        <>
            <div className="search-bar">
                <input
                    ref={inputRef}
                    type="text"
                    placeholder='enter the city name'
                    onKeyPress={handleKeyPress}
                />
                <IoMdSearch style={{ fontSize: "30px", cursor: "pointer" }} onClick={() => search(inputRef.current.value)} />
            </div>
            {data ? (
                <>
                    <img src={data.icon} className='weather-icon' alt="Weather Icon" />
                    <p className='temperature'>{data.temperature}°C</p>
                    <p className='location'>{data.location}</p>
                    <div className="weather-info">
                        <div className="col">
                            <img src={humidity} alt="Humidity Icon" />
                            <div>
                                <p>{data.humidity} %</p>
                                <span>Humidity</span>
                            </div>
                        </div>
                        <div className="col">
                            <img src={wind} alt="Wind Speed Icon" />
                            <div>
                                <p>{data.windSpeed} km/h</p>
                                <span>Wind speed</span>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>No data available. Please search for a city</p>
            )}
        </>
    );
};

export default Weather;