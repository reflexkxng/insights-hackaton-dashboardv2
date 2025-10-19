'use client'

import { useState, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Search, Save, Printer, User } from 'lucide-react'
import axios from 'axios'
import { motion, AnimatePresence } from 'framer-motion'
import InsightCard from '@/components/InsightCard'
import NewsCard from '@/components/NewsCard'
import WeatherCard from '@/components/WeatherCard'
import TransportCard from '@/components/TransportCard'
import CrimeCard from '@/components/CrimeCard'
import AmenitiesCard from '@/components/AmenitiesCard'
import Sidebar from '@/components/Sidebar'

interface CardData {
  weather: {
    title: string
    content: string
    status: 'empty' | 'updated' | 'error'
    icon: string
  }
  crime: {
    title: string
    content: string
    status: 'empty' | 'updated' | 'error'
    icon: string
  }
  transport: {
    title: string
    content: string
    status: 'empty' | 'updated' | 'error'
    icon: string
  }
  amenities: {
    title: string
    content: string
    status: 'empty' | 'updated' | 'error'
    icon: string
  }
  recentNews: {
    title: string
    items: Array<{
      id: number
      title: string
      content: string
      category: string
      priority: 'high' | 'medium' | 'low'
      date?: string
      timestamp?: string
    }>
    status: 'empty' | 'updated' | 'error'
    icon: string
  }
}

// Fixed background gradient
const BACKGROUND_GRADIENT = 'linear-gradient(180deg, #ffe100 59.46%, #a78e14 79.28%)'

export default function Dashboard() {
  const searchParams = useSearchParams()
  const [searchQuery, setSearchQuery] = useState('')
  const [pageName, setPageName] = useState('Waiting on Insights...')
  const [currentWeather, setCurrentWeather] = useState('sunny')
  const [currentBackground, setCurrentBackground] = useState(BACKGROUND_GRADIENT)
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [weatherData, setWeatherData] = useState<any>(null)
  const [transportData, setTransportData] = useState<{
    origin_name: string
    dest_name: string
    fare: string
    typical_time: string
  } | null>(null)
  const [crimeData, setCrimeData] = useState<{
    crime_type: string
    description: string
  } | null>(null)
  const [amenitiesData, setAmenitiesData] = useState<{
    amenities: Array<{
      name: string
      type_of_place: string
    }>
  } | null>(null)

  const [cardData, setCardData] = useState<CardData>({
    weather: {
      title: 'Weather',
      content: '',
      status: 'empty',
      icon: ''
    },
    crime: {
      title: 'Crime',
      content: '',
      status: 'empty',
      icon: ''
    },
    transport: {
      title: 'Transport',
      content: '',
      status: 'empty',
      icon: ''
    },
    amenities: {
      title: 'Amenities',
      content: '',
      status: 'empty',
      icon: ''
    },
    recentNews: {
      title: 'Recent News',
      items: [],
      status: 'empty',
      icon: ''
    }
  })

  // Update background when weather changes
  useEffect(() => {
    setCurrentBackground(BACKGROUND_GRADIENT)
  }, [currentWeather])

  // Auto-load data when dashboard first loads
  useEffect(() => {
    const query = searchParams.get('q')
    
    // If no query from URL, load default data
    if (!query) {
      setSearchQuery('Kingston') // Default location
      setPageName('Loading insights...')
      
      // Auto-load data for default location
      const loadDefaultData = async () => {
        try {
          console.log('Making API call to load default data...') // Debug log
          const response = await axios.post('http://localhost:3001/api/livewise-insights', {
            location: 'Kingston'
          })
          
          console.log('API response:', response.data) // Debug log
          const { success, location, data } = response.data
          
          if (success) {
            console.log('API call successful, processing data...') // Debug log
            // Use unified function to update dashboard
            updateDashboardWithData(data, location)
          } else {
            console.log('API call failed:', response.data) // Debug log
          }
        } catch (error) {
          console.error('Error loading default data:', error)
          setPageName('Error loading default data')
        }
      }
      
      loadDefaultData()
    }
  }, [])

  // Initialize search query from URL
  useEffect(() => {
    const query = searchParams.get('q')
    const data = searchParams.get('data')
    
    if (query) {
      setSearchQuery(query)
      setPageName(`Searching: ${query}`)
    }
    
    if (data) {
      try {
        // First check if the data is already decoded or needs decoding
        let decodedData = data
        try {
          // Try to decode the URI component
          decodedData = decodeURIComponent(data)
        } catch (decodeError) {
          console.warn('Data appears to be already decoded or malformed:', decodeError)
          // Use the data as-is if decoding fails
          decodedData = data
        }
        
        const cityData = JSON.parse(decodedData)
        console.log('Parsed city data from URL:', cityData) // Debug log
        // Use the query as the search term
        const searchTerm = query || 'Unknown Location'
        // Use unified function to update dashboard
        updateDashboardWithData(cityData, searchTerm)
      } catch (error) {
        console.error('Error parsing city data:', error)
        // Set a fallback state when data parsing fails
        setPageName(`Error loading data for: ${query || 'Unknown Location'}`)
      }
    }
  }, [searchParams])

  // Update page name when card data changes
  useEffect(() => {
    const hasInsights = Object.values(cardData).some(card => 
      card.status === 'updated' && card.content && card.content !== ''
    )
    
    if (hasInsights && searchQuery) {
      setPageName(`Insights for: ${searchQuery}`)
    } else if (searchQuery && !hasInsights) {
      setPageName(`Searching: ${searchQuery}`)
    }
  }, [cardData, searchQuery])

  // Debug amenities data changes
  useEffect(() => {
    console.log('Amenities data state changed:', amenitiesData)
  }, [amenitiesData])

  const updateCardData = (cardType: keyof CardData, data: Partial<CardData[keyof CardData]>) => {
    setCardData(prev => ({
      ...prev,
      [cardType]: {
        ...prev[cardType],
        ...data
      }
    }))
  }

  const updateAllCards = (data: Partial<CardData>) => {
    setCardData(prev => ({
      ...prev,
      ...data
    }))
  }

  const populateCardsWithData = (productionData: any, searchTerm: string) => {
    // Only handle production JSON data
    if (productionData && typeof productionData === 'object') {
      handleProductionData(productionData, searchTerm)
    } else {
      // Show empty state if no production data
      setPageName(`No data available for: ${searchTerm}`)
    }
  }

  // Unified function to update dashboard with received data
  const updateDashboardWithData = (data: any, searchTerm: string) => {
    console.log('Updating dashboard with data:', data) // Debug log
    
    // Update all card states
    if (data.weather) {
      setWeatherData(data.weather)
    }
    
    if (data.crime) {
      setCrimeData(data.crime)
    }
    
    if (data.transport) {
      setTransportData(data.transport)
    }
    
    if (data.amenities) {
      setAmenitiesData(data.amenities)
    }
    
    // Update all card data for display
    updateCardData('weather', {
      content: data.weather?.description || 'No weather data available',
      status: 'updated',
      icon: '🌤️'
    })
    
    updateCardData('crime', {
      content: data.crime?.description || 'No crime data available',
      status: 'updated',
      icon: '🛡️'
    })
    
    updateCardData('transport', {
      content: data.transport ? `${data.transport.origin_name} to ${data.transport.dest_name}` : 'No transport data available',
      status: 'updated',
      icon: '🚌'
    })
    
    updateCardData('amenities', {
      content: data.amenities?.amenities ? `${data.amenities.amenities.length} amenities found` : 'No amenities data available',
      status: 'updated',
      icon: '🏪'
    })
    
    if (data.news?.items) {
      updateCardData('recentNews', {
        items: data.news.items,
        status: 'updated',
        icon: '📰'
      })
    }
    
    // Update page name
    setPageName(`Insights for: ${searchTerm}`)
    setCurrentWeather('sunny')
    
    console.log('Dashboard updated successfully!') // Debug log
  }

  const handleProductionData = (data: any, searchTerm: string) => {
    try {
      console.log('Processing data:', data) // Debug log
      
      // Extract data from production JSON structure
      const weatherData = extractWeatherData(data)
      const crimeData = extractCrimeData(data)
      const transportData = extractTransportData(data)
      const amenitiesData = extractAmenitiesData(data)
      const newsData = extractNewsData(data)

      console.log('Extracted data:', { weatherData, crimeData, transportData, amenitiesData, newsData }) // Debug log

      // Update weather data for WeatherCard component
      if (data.weather) {
        setWeatherData(data.weather)
        updateCardData('weather', {
          content: data.weather.description || 'No weather data available',
          status: 'updated',
          icon: '🌤️'
        })
      }

      if (crimeData && crimeData.content) {
        updateCardData('crime', {
          content: crimeData.content,
          status: 'updated',
          icon: crimeData.icon || '🛡️'
        })
      }

      if (transportData && transportData.content) {
        updateCardData('transport', {
          content: transportData.content,
          status: 'updated',
          icon: transportData.icon || '🚌'
        })
      }

      if (amenitiesData && amenitiesData.content) {
        updateCardData('amenities', {
          content: amenitiesData.content,
          status: 'updated',
          icon: amenitiesData.icon || '🏪'
        })
      }

      if (newsData && newsData.length > 0) {
        updateCardData('recentNews', {
          items: newsData,
          status: 'updated',
          icon: '📰'
        })
      }

      // Update page name and weather background
      setPageName(`Insights for: ${searchTerm}`)
      
      // Extract weather type from production data or use default
      const weatherType = extractWeatherType(data) || 'sunny'
      setCurrentWeather(weatherType)

    } catch (error) {
      console.error('Error processing production data:', error)
      setPageName(`Error loading data for: ${searchTerm}`)
    }
  }


  // Production data extraction functions
  const extractWeatherData = (data: any) => {
    // Match the server's data structure
    return {
      content: data.weather?.description || 'No weather data available',
      icon: data.weather?.icon || '🌤️'
    }
  }

  const extractCrimeData = (data: any) => {
    return {
      content: data.crime?.summary || 'No crime data available',
      icon: data.crime?.icon || '🛡️'
    }
  }

  const extractTransportData = (data: any) => {
    return {
      content: data.transport?.summary || 'No transport data available',
      icon: data.transport?.icon || '🚌'
    }
  }

  const extractAmenitiesData = (data: any) => {
    return {
      content: data.amenities?.summary || 'No amenities data available',
      icon: data.amenities?.icon || '🏪'
    }
  }

  const extractNewsData = (data: any) => {
    // Handle the server's news structure
    const newsItems = data.news?.items || []
    
    return newsItems.map((item: any, index: number) => ({
      id: item.id || index + 1,
      title: item.title || 'News Update',
      content: item.content || 'No content available',
      category: item.category || 'General',
      priority: item.priority || 'medium',
      date: item.date || new Date().toISOString().split('T')[0],
      timestamp: item.timestamp || new Date().toLocaleString()
    }))
  }

  const extractWeatherType = (data: any) => {
    // Extract weather type for background from server data
    const weatherType = data.weather?.type
    const validTypes = ['sunny', 'cloudy', 'rainy']
    return validTypes.includes(weatherType) ? weatherType : 'sunny'
  }

  const fetchCardData = async () => {
    try {
      const response = await axios.get('http://localhost:3001/api/cards')
      const data = response.data
      
      // Process the mock data from server
      handleProductionData(data, searchQuery || 'Unknown')
      
    } catch (error) {
      console.error('Error fetching card data:', error)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery) return

    setPageName(`Searching: ${searchQuery}`)

    try {
      console.log('Making search API call for:', searchQuery) // Debug log
      // Use LiveWise unified endpoint
      const response = await axios.post('http://localhost:3001/api/livewise-insights', {
        location: searchQuery
      })
      
      console.log('Search API response:', response.data) // Debug log
      const { success, location, data } = response.data
      
      if (success) {
        console.log('Search successful, processing data...') // Debug log
        // Use unified function to update dashboard
        updateDashboardWithData(data, location)
      } else {
        console.log('Search failed:', response.data) // Debug log
        throw new Error('Search failed')
      }
      
    } catch (err) {
      console.error('Search error:', err)
      updateCardData('weather', {
        content: 'Search failed',
        status: 'error'
      })
      setPageName(`Search failed for: ${searchQuery}`)
    }
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen)
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-screen text-black flex flex-col p-4 relative overflow-hidden"
      style={{ background: currentBackground }}
    >
      <Sidebar isOpen={sidebarOpen} onToggle={toggleSidebar} />

      {/* Header */}
      <motion.header 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex justify-between items-center mb-2"
      >
        <motion.h1 
          className="font-bold text-2xl tracking-widest"
          style={{ fontFamily: '"Just Another Hand", cursive' }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.2 }}
        >
          INSIGHTS
        </motion.h1>
        <motion.h2 
          className="font-bold text-base mb-2"
          key={pageName}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {pageName}
        </motion.h2>

        <motion.div 
          className="flex items-center gap-3 text-lg"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.2 }}>
            <Save className="cursor-pointer text-white/80 hover:text-yellow-400 transition-colors duration-200" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, rotate: -5 }} transition={{ duration: 0.2 }}>
            <Printer className="cursor-pointer text-white/80 hover:text-yellow-400 transition-colors duration-200" />
          </motion.div>
          <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ duration: 0.2 }}>
            <User className="cursor-pointer text-white/80 hover:text-yellow-400 transition-colors duration-200" />
          </motion.div>
        </motion.div>
      </motion.header>

      {/* Search */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="w-full flex items-center justify-center mb-4 relative gap-2"
      >
        <div className="relative w-full max-w-lg">
          <motion.input
            type="text"
            placeholder="Enter text..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyUp={(e) => e.key === 'Enter' && handleSearch()}
            className="w-full bg-white py-2 px-4 pr-12 rounded-full shadow-sm focus:outline-none text-sm"
            whileFocus={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          />
          <motion.button
            onClick={handleSearch}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-gradient-to-r from-yellow-500 to-yellow-600 py-1 px-3 rounded-full hover:from-yellow-600 hover:to-yellow-700 transition-all duration-200 shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            <Search size={16} />
          </motion.button>
        </div>
      </motion.div>

      {/* Dashboard grid */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="flex gap-12 place-content-center"
      >
        {/* Left Column: Recent News */}
        <NewsCard items={cardData.recentNews.items} />

        {/* Right Section */}
        <motion.div 
          className="flex flex-col gap-4"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Top Row: Weather/Crime stacked + Transport */}
          <div className="flex gap-2">
            {/* Weather and Crime Cards Stacked */}
            <motion.div 
              className="flex flex-col gap-4"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <WeatherCard
                weatherData={weatherData || {
                  temp: 293.96,
                  feels_like: 294.66,
                  temp_min: 293.96,
                  temp_max: 293.96,
                  humidity: 98,
                  main: "Clouds",
                  description: "overcast clouds"
                }}
                cityName={searchQuery || 'Unknown'}
              />

              <CrimeCard
                crimeData={crimeData}
              />
            </motion.div>

            {/* Transport and Amenities Cards Stacked */}
            <motion.div 
              className="flex flex-col gap-4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
            >
              <TransportCard
                transportData={transportData}
                className="animate-slideIn"
              />

              <AmenitiesCard
                amenitiesData={amenitiesData}
              />
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}
