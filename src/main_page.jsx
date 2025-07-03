import React, { useState, useEffect } from 'react';

function App() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const getWeather = async () => {
        const apiKey = "e4303f1a5d75554f9e8f3d252b0f4114"; 

        if (!city) {
            setError('Please enter a city name.');
            setWeather(null);
            return;
        }

        setLoading(true);
        setError(null);
        setWeather(null);

        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

        try {
            const response = await fetch(url);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "City not found or API error.");
            }

            const data = await response.json();
            setWeather({
                temp: data.main.temp,
                description: data.weather[0].description,
                humidity: data.main.humidity
            });

            setError('');
        } catch (err) {
            console.error("Error fetching weather:", err);
            setWeather(null);
            setError(err.message || 'Failed to fetch weather data. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            className="flex justify-center items-center h-screen font-inter"
            
            style={{
                background: 'linear-gradient(to bottom right, #87CEEB, #ADD8E6, #B0E0E6)'
            }}
        >
            <div className='bg-white shadow-2xl rounded-3xl p-8 max-w-sm w-full'> 
                <div className='flex flex-col items-center justify-center'>
                    <h1 className='text-3xl font-bold mb-8 flex items-center gap-2'>
                        <span role="img" aria-label="sun behind cloud emoji">🌤️</span>Weather
                    </h1>

                    <div className='relative flex items-center mb-8 w-full'>
                        <input
                            type="text"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                            placeholder="Enter city name"
                            className='border p-3 rounded-full flex-grow focus:outline-none focus:ring-2 focus:ring-blue-400 pr-12'
                        />
                        <button
                            onClick={getWeather}
                            className='absolute right-0 top-0 bottom-0 bg-blue-500 hover:bg-blue-600 text-white p-3 rounded-full shadow-md transition duration-300 ease-in-out transform hover:scale-105 flex items-center justify-center w-12 h-12'
                            disabled={loading}
                        >
                            {loading ? (
                                <i className="fas fa-spinner fa-spin"></i>
                            ) : (
                                <i className="fa-solid fa-magnifying-glass"></i>
                            )}
                        </button>
                    </div>

                    <div id="weather" className="w-full text-center">
                        {loading && <p className="text-gray-600">Loading weather...</p>}
                        {weather && (
                            <div className="space-y-2 mt-8">
                                <p className='font-bold text-5xl text-gray-800'>{weather.temp}°c</p>
                                <p className='text-lg text-gray-700'>Weather: {weather.description}</p>
                                <p className='text-md text-gray-600'>Humidity: {weather.humidity}%</p>
                            </div>
                        )}

                        {error && <p className='text-red-500 mt-8 font-semibold'>{error}</p>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
