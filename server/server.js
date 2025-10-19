const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Unified LiveWise endpoint - simulates calling all functions at once
app.post('/api/livewise-insights', async (req, res) => {
  try {
    const { location } = req.body;
    
    console.log('Received request:', { location, body: req.body }); // Debug log
    
    if (!location) {
      console.log('No location provided'); // Debug log
      return res.status(400).json({
        error: 'Location is required',
        message: 'Please provide a location in the request body'
      });
    }

    // Simulate calling all three LiveWise functions simultaneously
    console.log(`Fetching LiveWise insights for: ${location}`);
    
    // Simulate API processing delay
    setTimeout(() => {
      // Mock responses that simulate the real LiveWise function outputs
      const livewiseData = {
        weather: {
          temp: 293.96,
          feels_like: 294.66,
          temp_min: 293.96,
          temp_max: 293.96,
          humidity: 98,
          main: "Clouds",
          description: "overcast clouds"
        },
        crime: {
          crime_type: "Minor Theft & Vandalism",
          description: "Low crime rate area with strong police presence. Recent incidents include minor thefts and vandalism cases. Overall safety rating is high with decreasing crime trend."
        },
        transport: {
          origin_name: location,
          dest_name: "Downtown Kingston",
          fare: "J$150",
          typical_time: "45 minutes"
        },
        amenities: {
          amenities: [
            {
              name: "Downtown Plaza",
              type_of_place: "Shopping Center"
            },
            {
              name: "Kingston General Hospital",
              type_of_place: "Hospital"
            },
            {
              name: "Central Park Gym",
              type_of_place: "Gym"
            },
            {
              name: "Island Restaurant",
              type_of_place: "Restaurant"
            },
            {
              name: "Kingston High School",
              type_of_place: "School"
            }
          ]
        },
        news: {
          items: [
            {
              id: 1,
              title: `${location} Community Center Opens New Youth Programs`,
              content: "Local community center launches after-school programs for teenagers, focusing on technology and sports.",
              category: "Community",
              priority: "medium",
              date: new Date().toISOString().split('T')[0],
              timestamp: new Date().toLocaleString()
            },
            {
              id: 2,
              title: "Traffic Improvements Planned for Main Street",
              content: "City council approves $2M budget for road widening and traffic light upgrades in downtown area.",
              category: "Infrastructure",
              priority: "high",
              date: new Date().toISOString().split('T')[0],
              timestamp: new Date().toLocaleString()
            },
            {
              id: 3,
              title: "New Restaurant Opens in Business District",
              content: "Popular chef opens Caribbean fusion restaurant, creating 25 new jobs for local residents.",
              category: "Business",
              priority: "low",
              date: new Date().toISOString().split('T')[0],
              timestamp: new Date().toLocaleString()
            },
            {
              id: 4,
              title: "Local School Receives Technology Grant",
              content: "Elementary school awarded $50K grant for computer lab upgrades and digital learning tools.",
              category: "Education",
              priority: "medium",
              date: new Date().toISOString().split('T')[0],
              timestamp: new Date().toLocaleString()
            },
            {
              id: 5,
              title: "Weather Alert: Heavy Rain Expected",
              content: "Met Office issues weather warning for heavy rainfall and potential flooding in low-lying areas.",
              category: "Weather",
              priority: "high",
              date: new Date().toISOString().split('T')[0],
              timestamp: new Date().toLocaleString()
            },
            {
              id: 6,
              title: "Local Sports Team Wins Regional Championship",
              content: "High school basketball team brings home regional trophy after defeating rivals in overtime.",
              category: "Sports",
              priority: "low",
              date: new Date().toISOString().split('T')[0],
              timestamp: new Date().toLocaleString()
            }
          ]
        }
      };

      console.log('Sending response:', { success: true, location, dataKeys: Object.keys(livewiseData) }); // Debug log
      res.json({
        success: true,
        location: location,
        data: livewiseData,
        timestamp: new Date().toISOString(),
        dataSource: "livewise-simulation"
      });
    }, 1200); // Simulate processing time

  } catch (error) {
    console.error('LiveWise insights error:', error);
    res.status(500).json({
      error: 'Failed to fetch LiveWise insights',
      message: error.message
    });
  }
});

// Mock data
const mockData = {
  weather: {
    description: "Clear skies with moderate temperature.",
    icon: "☀️",
    type: "sunny",
    temperature: 24,
    humidity: 65,
    windSpeed: 12,
    windDirection: "west"
  },
  crime: {
    summary: "Very safe area with crime rate 15% below city average. Only 3 minor incidents reported this month. Recent incidents include 1 theft and 2 vandalism cases.",
    icon: "🛡️",
    safetyRating: "High",
    incidentsThisMonth: 3,
    crimeRate: "15% below average"
  },
  transport: {
    summary: "Excellent connectivity: 5 bus routes, 2 subway stations within 500m. Average commute time: 22 minutes. Real-time updates available.",
    icon: "🚌",
    busRoutes: 5,
    subwayStations: 2,
    averageCommute: "22 minutes",
    realTimeUpdates: true
  },
  amenities: {
    amenities: [
      {
        name: "Downtown Plaza",
        type_of_place: "Shopping Center"
      },
      {
        name: "Kingston General Hospital",
        type_of_place: "Hospital"
      },
      {
        name: "Central Park Gym",
        type_of_place: "Gym"
      },
      {
        name: "Island Restaurant",
        type_of_place: "Restaurant"
      },
      {
        name: "Kingston High School",
        type_of_place: "School"
      }
    ]
  },
  news: {
    items: [
      {
        id: 1,
        title: "Infrastructure Development Update",
        content: "Major infrastructure upgrade announced including new bike lanes, improved street lighting, and expanded public transport routes.",
        category: "Infrastructure",
        priority: "medium",
        date: "2024-01-15",
        timestamp: "2024-01-15 10:30:00"
      },
      {
        id: 2,
        title: "Community Safety Initiative",
        content: "New neighborhood watch program launched with increased police patrols and community safety workshops.",
        category: "Safety",
        priority: "high",
        date: "2024-01-14",
        timestamp: "2024-01-14 14:20:00"
      },
      {
        id: 3,
        title: "Cultural Festival Announcement",
        content: "Annual cultural festival returns with food vendors, live music, and family activities. Free admission for all residents.",
        category: "Events",
        priority: "low",
        date: "2024-01-13",
        timestamp: "2024-01-13 09:15:00"
      },
      {
        id: 4,
        title: "Weather Alert",
        content: "Severe weather warning issued. Heavy rainfall and strong winds expected. Residents advised to stay indoors.",
        category: "Weather",
        priority: "high",
        date: "2024-01-12",
        timestamp: "2024-01-12 16:45:00"
      }
    ]
  }
};

// Routes
app.get('/api/cards', (req, res) => {
  res.json(mockData);
});

app.get('/api/weather', (req, res) => {
  const { q } = req.query;
  
  // Simulate API delay
  setTimeout(() => {
    res.json({
      weather_resultText: `Weather data for ${q}: ${mockData.weather.description}`,
      traffic_resultText: `Traffic data for ${q}: ${mockData.transport.summary}`,
      location: q,
      timestamp: new Date().toISOString()
    });
  }, 500);
});

app.get('/api/insights/:location', (req, res) => {
  const { location } = req.params;
  
  // Return comprehensive data for a specific location
  const locationData = {
    ...mockData,
    location: location,
    timestamp: new Date().toISOString(),
    dataSource: "mock-api"
  };
  
  res.json(locationData);
});

// POST endpoint for city search - recommended approach
app.post('/api/search', (req, res) => {
  const { city } = req.body;
  
  if (!city) {
    return res.status(400).json({
      error: 'City name is required',
      message: 'Please provide a city name in the request body'
    });
  }
  
  // Simulate processing delay
  setTimeout(() => {
    // Generate location-specific data based on city
    const locationData = generateLocationData(city);
    
    res.json({
      success: true,
      city: city,
      data: locationData,
      timestamp: new Date().toISOString(),
      dataSource: "mock-api"
    });
  }, 800); // Simulate API processing time
});

// Function to generate location-specific data
function generateLocationData(cityName) {
  // You can customize this based on the city
  const cityVariations = {
    weather: {
      description: ` Clear skies with moderate temperature.`,
      icon: "☀️",
      type: "sunny",
      temperature: 24,
      humidity: 65,
      windSpeed: 12,
      windDirection: "west"
    },
    crime: {
      summary: `Safety report for ${cityName}: Very safe area with crime rate 15% below city average. Only 3 minor incidents reported this month. Recent incidents include 1 theft and 2 vandalism cases.`,
      icon: "🛡️",
      safetyRating: "High",
      incidentsThisMonth: 3,
      crimeRate: "15% below average"
    },
    transport: {
      summary: `Transportation in ${cityName}: Excellent connectivity: 5 bus routes, 2 subway stations within 500m. Average commute time: 22 minutes. Real-time updates available.`,
      icon: "🚌",
      busRoutes: 5,
      subwayStations: 2,
      averageCommute: "22 minutes",
      realTimeUpdates: true
    },
    amenities: {
      amenities: [
        {
          name: "Downtown Plaza",
          type_of_place: "Shopping Center"
        },
        {
          name: "Kingston General Hospital",
          type_of_place: "Hospital"
        },
        {
          name: "Central Park Gym",
          type_of_place: "Gym"
        },
        {
          name: "Island Restaurant",
          type_of_place: "Restaurant"
        },
        {
          name: "Kingston High School",
          type_of_place: "School"
        }
      ]
    },
    news: {
      items: [
        {
          id: 1,
          title: `${cityName} Infrastructure Development`,
          content: "Major infrastructure upgrade announced including new bike lanes, improved street lighting, and expanded public transport routes.",
          category: "Infrastructure",
          priority: "medium",
          date: "2024-01-15",
          timestamp: "2024-01-15 10:30:00"
        },
        {
          id: 2,
          title: `Community Safety Initiative in ${cityName}`,
          content: "New neighborhood watch program launched with increased police patrols and community safety workshops.",
          category: "Safety",
          priority: "high",
          date: "2024-01-14",
          timestamp: "2024-01-14 14:20:00"
        },
        {
          id: 3,
          title: `${cityName} Cultural Festival`,
          content: "Annual cultural festival returns with food vendors, live music, and family activities. Free admission for all residents.",
          category: "Events",
          priority: "low",
          date: "2024-01-13",
          timestamp: "2024-01-13 09:15:00"
        },
        {
          id: 4,
          title: `Weather Alert: ${cityName}`,
          content: "Severe weather warning issued. Heavy rainfall and strong winds expected. Residents advised to stay indoors.",
          category: "Weather",
          priority: "high",
          date: "2024-01-12",
          timestamp: "2024-01-12 16:45:00"
        }
      ]
    }
  };
  
  return cityVariations;
}

app.post('/api/insights', (req, res) => {
  const { location, data } = req.body;
  
  // Simulate saving data
  console.log(`Received data for ${location}:`, data);
  
  res.json({
    success: true,
    message: `Data saved for ${location}`,
    timestamp: new Date().toISOString()
  });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: 'Something went wrong!',
    message: err.message 
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Insights API Server running on port ${PORT}`);
  console.log(`📊 Available endpoints:`);
  console.log(`   GET  /api/cards - Get all card data`);
  console.log(`   GET  /api/weather?q=location - Get weather data`);
  console.log(`   GET  /api/insights/:location - Get insights for location`);
  console.log(`   POST /api/search - Search for city data (RECOMMENDED)`);
  console.log(`   POST /api/insights - Save insights data`);
  console.log(`   GET  /health - Health check`);
});
