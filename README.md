# Weather 🌤️

A modern, responsive weather application built with React and Vite. Search for any city to check its current weather conditions through a clean, intuitive interface.

## Live Demo

**[Open Weather App](https://cmwr.vercel.app/)**

## Features

- 🔍 Search weather by city name.
- ⌨️ Press Enter or click Search to get results.
- 🌡️ Current temperature in Celsius.
- 🌤️ Weather conditions and dynamic weather icons.
- 🌡️ Feels-like temperature.
- 💧 Humidity percentage.
- 💨 Wind speed in km/h.
- 🌡️ Atmospheric pressure.
- 🎨 Weather-responsive backgrounds.
- 📱 Responsive desktop and mobile interface.
- ⚡ Loading indicators and error handling.
- 🌤️ Custom weather emoji favicon.
- ♿ Keyboard-friendly interactions.

## Tech Stack

- React
- JavaScript
- Vite
- Tailwind CSS
- OpenWeatherMap API
- Vercel

## Getting Started

### Prerequisites

Install Node.js and npm.

### 1. Clone the repository

    git clone https://github.com/iamsachinG/Weather.git

### 2. Navigate to the project

    cd Weather

### 3. Install dependencies

    npm install

### 4. Configure the API key

Create a `.env` file in the project root:

    VITE_OPENWEATHER_API_KEY=your_api_key

Get your API key from [OpenWeatherMap](https://openweathermap.org/api).

### 5. Start the development server

    npm run dev

Open the local URL displayed in your terminal.

## Build and Deployment

Create a production build:

    npm run build

Run lint checks:

    npm run lint

Preview the production build:

    npm run preview

The application can be deployed using Vercel.

## API Security

Vite environment variables prefixed with `VITE_` are exposed in browser code. They are not secret credentials.

Restrict your API key where possible, and rotate it if it has been exposed publicly. For stronger protection, consider a server-side API proxy.

## Author

**Sachin Gupta**

GitHub: [@iamsachinG](https://github.com/iamsachinG)

---

⭐ If you like this project, consider giving it a star!
