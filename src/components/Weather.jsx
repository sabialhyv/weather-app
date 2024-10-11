import React, { useEffect, useRef, useState } from 'react'
import { IoMdSearch } from "react-icons/io";
import clear from '../assets/images/clear.png'
import cloud from '../assets/images/cloud.png'
import rain from '../assets/images/rain.png'
import snow from '../assets/images/snow.png'
import drizzle from '../assets/images/drizzle.png'
import wind from '../assets/images/wind.png'
import humidity from '../assets/images/humidity.png'

const Weather = () => {

    const [data, setData] = useState(false)
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
    }


    const search = async (city) => {
        if (city === "") {
            alert("Please enter the city name")
            return;
        }

        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_APP_ID}`

            const response = await fetch(url);
            const data = await response.json();
            console.log(data);

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
                icon: icon
            })
        } catch (error) {
            setData(false);
            console.log("Error in fetching weather data")
        }
    }

    useEffect(() => {
        search('');
    }, [])

    return (
        <div className='weather-container'>
            <div className="search-bar">
                <input ref={inputRef} type="text" placeholder='enter the city name' />
                <IoMdSearch style={{ fontSize: "30px", cursor: "pointer" }} onClick={() => search(inputRef.current.value)} />
            </div>
            {data ? <>
                <img src={data.icon} className='weather-icon' alt="" />
                <p className='temperature'>{data.temperature}°c</p>
                <p className='location'>{data.location}</p>
                <div className="weather-info">
                    <div className="col">
                        <img src={humidity} alt="" />
                        <div>
                            <p>{data.humidity} %</p>
                            <span>Humidity</span>
                        </div>
                    </div>
                    <div className="col">
                        <img src={wind} alt="" />
                        <div>
                            <p>{data.windSpeed} km/h</p>
                            <span>Wind speed</span>
                        </div>
                    </div>
                </div>
            </>
                : <></>}
        </div>
    )
}

export default Weather;