# 🌦️ Weather App

A simple and responsive weather application built with React and Vite. Search for any city to check its current temperature, weather conditions, and humidity.

## 🌐 Live Demo

**[Visit Weather App](https://cmwr.vercel.app/)**

## ✨ Features

- 🔍 Search weather by city name
- 🌡️ Temperature displayed in Celsius
- ☁️ Current weather conditions
- 💧 Humidity information
- ⚡ Loading indicator
- 📱 Responsive user interface
- ❌ Error handling for invalid city names

## 🛠️ Tech Stack

- React.js
- JavaScript
- Vite
- Tailwind CSS
- OpenWeatherMap API
- Font Awesome
- Vercel

## 🚀 Getting Started

### Prerequisites

Install Node.js and npm.

### Installation

Clone the repository:

    git clone https://github.com/iamsachinG/Weather.git

Navigate to the project:

    cd Weather

Install dependencies:

    npm install

Start the development server:

    npm run dev

Open the local URL displayed in your terminal.

## 📦 Production Build

Build the application:

    npm run build

Preview the production build:

    npm run preview

## 🌤️ Weather API

This application uses the
[OpenWeatherMap API](https://openweathermap.org/api)
to retrieve weather information. Set `VITE_OPENWEATHER_API_KEY` in a local `.env` file before running the app:

    VITE_OPENWEATHER_API_KEY=your_openweathermap_key

Add the same variable in the Vercel project settings and redeploy. Vite exposes `VITE_` variables in browser code, so this key is visible to visitors; restrict it in OpenWeatherMap and rotate the previously committed key.

## 👨‍💻 Author

**Sachin Gupta**

GitHub: [@iamsachinG](https://github.com/iamsachinG)

---

⭐ If you like this project, consider giving it a star!
