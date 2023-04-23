import React, { useState } from 'react';
import './App.css';

function App() {

  const apiKey = 'c1de6e0aa4a172d8f4c747c793744958';
  const [weatherData, setWeatherData] = useState({});
  const [city, setCity] = useState('');

  const getWeather = (event) => {
    if (event.key === 'Enter') {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=${apiKey}`)
        .then(response => response.json())
        .then(data => {
          setWeatherData(data);
          setCity('');
        })
        .catch(error => console.error(error));
    }
  };

  return (
    <div className="container">
      <input 
        className="input" 
        placeholder="Enter City..."
        onChange={e => setCity(e.target.value)}
        value={city}
        onKeyPress={getWeather}
      />

      {Object.keys(weatherData).length === 0 ? (
        <div>
          <p>Welcome to weather app! Enter in a city to get the weather of</p>
        </div>
      ): (
        <div className='weather-data'>
          <p className='city'>{weatherData.name}</p>
          <p className='temp'> {Math.round(weatherData.main?.temp)}°C</p>
          <p className='weather'>{weatherData.weather?.[0]?.main}</p>
        </div> 
      )}

      {weatherData.cod === '404' && (
        <p> City not found.</p>
      )}

    </div>
  );
}

export default App;
