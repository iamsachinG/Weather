# Weather

A responsive city weather app built with React and Vite. Search for current conditions around the world with a clean interface designed for desktop and mobile.

## Live demo

[Open Weather](https://cmwr.vercel.app/)

## Features

- Search by city using the search button or Enter key.
- View current temperature in Celsius, condition, and feels-like temperature.
- See humidity, wind speed in km/h, and atmospheric pressure when available.
- Weather icons and background colors adapt to the reported conditions and local time.
- Loading, invalid-city, and connection error states.
- Responsive layout, keyboard focus styles, and reduced-motion support.
- Custom 🌤️ favicon.

## Built with

- React and JavaScript
- Vite
- Tailwind CSS
- OpenWeatherMap Current Weather API

## Run locally

Requires Node.js and npm.

```sh
git clone https://github.com/iamsachinG/Weather.git
cd Weather
npm install
npm run dev
```

Vite prints the local development URL in the terminal.

## API configuration

Weather data comes from the [OpenWeatherMap Current Weather API](https://openweathermap.org/current). The app currently includes a client-side fallback API key. To use a different key, create a `.env` file in the project root:

```env
VITE_OPENWEATHER_API_KEY=your_openweathermap_key
```

Vite variables prefixed with `VITE_` are bundled into the browser code, so they are visible to users and are not suitable for private credentials. Restrict the key in OpenWeatherMap. For Vercel, configure `VITE_OPENWEATHER_API_KEY` in the project’s Environment Variables and redeploy.

## Build and lint

```sh
npm run build
npm run lint
npm run preview
```

## Author

**Sachin Gupta** · [@iamsachinG](https://github.com/iamsachinG)
