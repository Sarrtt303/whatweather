
import './App.css';
import Search from "./components/Search"
import CurrentWeather from './components/CurrentWeather';
import { WEATHER_API_KEY, WEATHER_API_URL } from './api';
import { useState } from 'react';
import Forecast from './components/forecast';

function App() {
   
  const [currentWeather, setcurrentWeather]= useState(null);
  const [forecast, setForecast]= useState(null);

  const handleOnSearchChange =(searchData)=>{

      const [lat, lon]=searchData.value.split(" ");

      const currentweatherFetch= fetch(`${WEATHER_API_URL}/weather?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`)
      const forecastFetch= fetch(`${WEATHER_API_URL}/forecast?lat=${lat}&lon=${lon}&appid=${WEATHER_API_KEY}`)
      

      Promise.all([currentweatherFetch, forecastFetch]).then(async(response)=>{
        const weatherResponse= await response[0].json();
        const forecastResponse= await response[1].json();

        setcurrentWeather({city: searchData.label , ...weatherResponse});
        setForecast({city: searchData.label , ...forecastResponse});

      })
      .catch((err)=> console.log(err))
    }

   console.log(currentWeather);
   console.log(forecast)

  return (
    <div className="container">
      <Search onSearchChange={handleOnSearchChange}/>
      {currentWeather && <CurrentWeather data={currentWeather} />}
      {forecast && <Forecast data={forecast} />}
    </div>
  );
}

export default App;
