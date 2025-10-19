# Insights API Server

Express.js server providing mock data for the insights dashboard.

## Setup

1. Install dependencies:
```bash
cd server
npm install
```

2. Start the server:
```bash
# Development mode (with auto-restart)
npm run dev

# Production mode
npm start
```

## API Endpoints

### GET /api/cards
Returns all card data (weather, crime, transport, amenities, news)

### GET /api/weather?q=location
Returns weather and traffic data for a specific location
- Query parameter: `q` (location name)

### GET /api/insights/:location
Returns comprehensive insights data for a specific location
- Path parameter: `location` (location name)

### POST /api/insights
Save insights data for a location
- Body: `{ location: string, data: object }`

### GET /health
Health check endpoint

## Mock Data Structure

The server provides realistic mock data including:
- Weather conditions with temperature, humidity, wind
- Crime statistics and safety ratings
- Transportation information with routes and commute times
- Local amenities with counts and distances
- Recent news items with categories and priorities

## Usage with Frontend

Update your frontend API calls to use:
- `http://localhost:3001/api/cards`
- `http://localhost:3001/api/weather?q=location`
- `http://localhost:3001/api/insights/location`
