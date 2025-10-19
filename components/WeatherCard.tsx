'use client'

import { motion } from 'framer-motion'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface WeatherData {
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  humidity: number
  main: string
  description: string
}

interface WeatherCardProps {
  weatherData: WeatherData
  cityName: string
  className?: string
}

const getWeatherIcon = (main: string | undefined) => {
  if (!main) return '🌤️'
  
  switch (main.toLowerCase()) {
    case 'clear':
      return '☀️'
    case 'clouds':
      return '☁️'
    case 'rain':
      return '🌧️'
    case 'snow':
      return '❄️'
    case 'thunderstorm':
      return '⛈️'
    case 'mist':
    case 'fog':
      return '🌫️'
    default:
      return '🌤️'
  }
}


const kelvinToCelsius = (kelvin: number) => Math.round(kelvin - 273.15)
const kelvinToFahrenheit = (kelvin: number) => Math.round((kelvin - 273.15) * 9/5 + 32)

export default function WeatherCard({ weatherData, cityName, className = '' }: WeatherCardProps) {
  const celsius = kelvinToCelsius(weatherData.temp)
  const fahrenheit = kelvinToFahrenheit(weatherData.temp)
  const feelsLikeCelsius = kelvinToCelsius(weatherData.feels_like)
  const minTemp = kelvinToCelsius(weatherData.temp_min)
  const maxTemp = kelvinToCelsius(weatherData.temp_max)

  return (
    <TooltipProvider>
      <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ 
        y: -8, 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
      className={`w-[400px] h-[416px] bg-black/60 rounded-3xl shadow-2xl cursor-pointer relative overflow-hidden ${className}`}
      style={{
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 text-6xl opacity-20">
          {getWeatherIcon(weatherData.main)}
        </div>
        <div className="absolute bottom-4 left-4 text-4xl opacity-15">
          {getWeatherIcon(weatherData.main)}
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 p-4 h-full flex flex-col text-white overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="flex justify-between items-start mb-3"
        >
          <div>
            <h3 
              className="font-bold text-2xl tracking-wide"
              style={{ fontFamily: '"Just Another Hand", cursive' }}
            >
              Weather
            </h3>
            <p className="text-sm opacity-80">{cityName}</p>
          </div>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
            className="text-5xl"
          >
            {getWeatherIcon(weatherData.main)}
          </motion.div>
        </motion.div>

        {/* Main Temperature Display */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mb-3"
        >
          <div className="text-5xl font-bold mb-1 text-white drop-shadow-lg">{celsius}°</div>
          <div className="text-sm opacity-90 capitalize font-medium">{weatherData.description}</div>
        </motion.div>

        {/* Modern Weather Stats Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex-1 grid grid-cols-2 gap-2 min-h-0"
        >
          {/* Feels Like Card */}
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
                className="bg-black/60 backdrop-blur-sm rounded-xl p-2 border border-white/20 hover:bg-black/70 transition-all duration-300 cursor-help"
              >
                <div className="text-center">
                  <div className="text-xs opacity-70 mb-2 uppercase tracking-wide">Feels Like</div>
                  <div className="text-2xl font-bold">{feelsLikeCelsius}°C</div>
                </div>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>How the temperature actually feels considering wind and humidity</p>
            </TooltipContent>
          </Tooltip>

          {/* Humidity Card */}
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                className="bg-black/60 backdrop-blur-sm rounded-xl p-2 border border-white/20 hover:bg-black/70 transition-all duration-300 cursor-help"
              >
                <div className="text-center">
                  <div className="text-xs opacity-70 mb-2 uppercase tracking-wide">Humidity</div>
                  <div className="text-2xl font-bold">{weatherData.humidity}%</div>
                </div>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Amount of water vapor in the air - higher values feel more humid</p>
            </TooltipContent>
          </Tooltip>

          {/* Temperature Range Card */}
          <Tooltip>
            <TooltipTrigger asChild>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7, duration: 0.3 }}
                className="bg-black/60 backdrop-blur-sm rounded-xl p-2 border border-white/20 hover:bg-black/70 transition-all duration-300 col-span-2 cursor-help"
              >
                <div className="text-center ">
                  <div className="text-xs opacity-70 mb-2 uppercase tracking-wide">Temperature Range</div>
                  <div className="flex justify-center items-center gap-6">
                    <div className="text-center">
                      <div className="text-sm opacity-70 mb-1">Min</div>
                      <div className="text-xl font-bold">{minTemp}°C</div>
                    </div>
                    <div className="w-8 h-0.5 bg-white/30 rounded-full"></div>
                    <div className="text-center">
                      <div className="text-sm opacity-70 mb-1">Max</div>
                      <div className="text-xl font-bold">{maxTemp}°C</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </TooltipTrigger>
            <TooltipContent>
              <p>Daily temperature range from minimum to maximum</p>
            </TooltipContent>
          </Tooltip>
        </motion.div>

      </div>
    </motion.div>
    </TooltipProvider>
  )
}
