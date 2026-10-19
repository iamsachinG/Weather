import { useRef, useState } from 'react';

const weatherIcon = (condition, isDay) => {
    if (condition === 'Thunderstorm') return '⛈️';
    if (condition === 'Drizzle' || condition === 'Rain') return '🌧️';
    if (condition === 'Snow') return '❄️';
    if (condition === 'Mist' || condition === 'Smoke' || condition === 'Haze' || condition === 'Dust' || condition === 'Fog' || condition === 'Sand' || condition === 'Ash' || condition === 'Squall' || condition === 'Tornado') return '🌫️';
    if (condition === 'Clouds') return '☁️';
    return isDay ? '☀️' : '🌙';
};

function Weather() {
    const [city, setCity] = useState('');
    const [weather, setWeather] = useState(null);
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const requestRef = useRef(null);

    const getWeather = async (event) => {
        event.preventDefault();
        const query = city.trim();
        if (!query || requestRef.current) return;

        const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY || 'e4303f1a5d75554f9e8f3d252b0f4114';
        if (!apiKey) {
            setError('Weather search is not configured. Add VITE_OPENWEATHER_API_KEY to the deployment environment.');
            return;
        }

        const controller = new AbortController();
        requestRef.current = controller;
        setLoading(true);
        setError('');

        try {
            const url = new URL('https://api.openweathermap.org/data/2.5/weather');
            url.search = new URLSearchParams({ q: query, appid: apiKey, units: 'metric' });
            const response = await fetch(url, { signal: controller.signal });
            const data = await response.json();
            if (!response.ok) {
                if (response.status === 404) throw new Error('We couldn’t find that city. Check the spelling and try again.');
                if (response.status === 401) throw new Error('Weather service configuration is invalid.');
                throw new Error('Weather data is temporarily unavailable. Please try again.');
            }
            if (requestRef.current !== controller) return;
            setWeather({
                city: data.name,
                country: data.sys?.country,
                temp: Math.round(data.main.temp),
                feelsLike: data.main.feels_like,
                description: data.weather?.[0]?.description,
                condition: data.weather?.[0]?.main,
                humidity: data.main.humidity,
                wind: data.wind?.speed,
                pressure: data.main.pressure,
                isDay: Date.now() / 1000 >= data.sys.sunrise && Date.now() / 1000 < data.sys.sunset,
            });
        } catch (err) {
            if (err.name === 'AbortError' || requestRef.current !== controller) return;
            setError(err instanceof TypeError ? 'Unable to connect. Check your internet connection and try again.' : err.message);
        } finally {
            if (requestRef.current === controller) {
                requestRef.current = null;
                setLoading(false);
            }
        }
    };

    const background = weather?.condition === 'Rain' || weather?.condition === 'Drizzle'
        ? 'rain' : weather?.condition === 'Thunderstorm' ? 'storm'
            : weather?.condition === 'Snow' ? 'snow'
                : weather?.condition === 'Clouds' || weather?.condition === 'Mist' || weather?.condition === 'Fog' ? 'clouds'
                    : weather && !weather.isDay ? 'night' : 'clear';

    return (
        <main className={`weather-page weather-${background}`}>
            <section className="weather-shell" aria-labelledby="app-title">
                <header className="brand-row">
                    <span className="brand-icon" role="img" aria-label="sun behind cloud">🌤️</span>
                    <h1 id="app-title">Weather</h1>
                    <span className="brand-caption">LIVE CONDITIONS</span>
                </header>

                <div className="intro">
                    <p className="eyebrow">YOUR WEATHER, AT A GLANCE</p>
                    <h2>Find your forecast.</h2>
                    <p>Current conditions for wherever you are.</p>
                </div>

                <form className="search-form" onSubmit={getWeather} role="search">
                    <label className="sr-only" htmlFor="city-search">Search by city name</label>
                    <span className="search-icon" aria-hidden="true">⌕</span>
                    <input id="city-search" type="search" value={city} onChange={(event) => setCity(event.target.value)} placeholder="Search a city..." autoComplete="off" />
                    <button type="submit" disabled={loading || !city.trim()} aria-label="Search weather">
                        {loading ? <span className="spinner" aria-hidden="true" /> : 'Search'}
                    </button>
                </form>

                <div className="results" aria-live="polite" aria-busy={loading}>
                    {loading && <p className="status-message">Finding current conditions…</p>}
                    {error && <p className="error-message" role="alert">{error}</p>}
                    {!weather && !loading && !error && <div className="empty-state"><span aria-hidden="true">⌖</span><p>Search a city to see its current weather.</p></div>}
                    {weather && !loading && (
                        <article className="forecast" aria-label={`Current weather in ${weather.city}`}>
                            <div className="location-row">
                                <div><p className="eyebrow">CURRENT WEATHER</p><h2>{weather.city}{weather.country ? <span>, {weather.country}</span> : ''}</h2></div>
                                <span className="condition-icon" role="img" aria-label={weather.description}>{weatherIcon(weather.condition, weather.isDay)}</span>
                            </div>
                            <div className="temperature-row"><p className="temperature">{weather.temp}<span>°</span></p><div className="condition-copy"><p>{weather.description}</p><span>Feels like {Math.round(weather.feelsLike)}°C</span></div></div>
                            <div className="detail-grid">
                                <Detail icon="💧" label="Humidity" value={`${weather.humidity}%`} />
                                {weather.wind != null && <Detail icon="〰️" label="Wind speed" value={`${(weather.wind * 3.6).toFixed(1)} km/h`} />}
                                {weather.pressure != null && <Detail icon="◉" label="Pressure" value={`${weather.pressure} hPa`} />}
                            </div>
                            <p className="units-note">Temperature in Celsius · Wind in km/h</p>
                        </article>
                    )}
                </div>
                <footer>Weather conditions powered by OpenWeather</footer>
            </section>
        </main>
    );
}

function Detail({ icon, label, value }) {
    return <div className="detail-card"><span aria-hidden="true">{icon}</span><div><p>{label}</p><strong>{value}</strong></div></div>;
}

export default Weather;
