# LiveWise API Structure Documentation

## Production API Endpoint

**Endpoint:** `POST /api/livewise-insights`

**Request Body:**
```json
{
  "location": "string (required)"
}
```

**Response Structure:**
```json
{
  "success": true,
  "location": "string",
  "data": {
    "weather": { /* Weather Data */ },
    "crime": { /* Crime Data */ },
    "transport": { /* Transport Data */ },
    "news": { /* News Data */ }
  },
  "timestamp": "ISO 8601 string",
  "dataSource": "livewise-production"
}
```

---

## 1. Weather Data Schema

```json
{
  "weather": {
    "temp": "number (Kelvin)",
    "feels_like": "number (Kelvin)",
    "temp_min": "number (Kelvin)",
    "temp_max": "number (Kelvin)",
    "humidity": "number (0-100)",
    "main": "string",
    "description": "string"
  }
}
```

**Field Descriptions:**
- `temp`: Current temperature in Kelvin
- `feels_like`: Feels like temperature in Kelvin
- `temp_min`: Minimum temperature in Kelvin
- `temp_max`: Maximum temperature in Kelvin
- `humidity`: Humidity percentage (0-100)
- `main`: Main weather condition (Clear, Clouds, Rain, Snow, Thunderstorm, Mist, Fog)
- `description`: Detailed weather description

---

## 2. Crime Data Schema

```json
{
  "crime": {
    "crime_type": "string",
    "description": "string"
  }
}
```

**Field Descriptions:**
- `crime_type`: Most common type of crime
- `description`: Detailed crime description

---

## 3. Transport Data Schema

```json
{
  "transport": {
    "origin_name": "string",
    "dest_name": "string",
    "fare": "string",
    "typical_time": "string"
  }
}
```

**Field Descriptions:**
- `origin_name`: Starting location name
- `dest_name`: Destination location name
- `fare`: Transportation fare cost
- `typical_time`: Typical travel time

---

## 4. News Data Schema

```json
{
  "news": {
    "items": [
      {
        "title": "string",
        "summary": "string",
        "category": "string",
        "timestamp": "ISO 8601 string",
        "source": "string",
        "url": "string"
      }
    ]
  }
}
```

**Field Descriptions:**
- `items`: Array of news articles
  - `title`: News article title
  - `summary`: Brief summary of the article
  - `category`: News category (Development, Safety, Weather, etc.)
  - `timestamp`: ISO 8601 timestamp
  - `source`: News source name
  - `url`: Link to full article

---

## Error Response Schema

```json
{
  "success": false,
  "error": "string",
  "message": "string",
  "timestamp": "ISO 8601 string"
}
```

---

## 5. Amenities Data Schema

```json
{
  "amenities": {
    "amenities": [
      {
        "name": "string",
        "type_of_place": "string"
      }
    ]
  }
}
```

**Field Descriptions:**
- `amenities`: Array of amenity objects
  - `name`: Name of the amenity/place
  - `type_of_place`: Type of amenity (restaurant, gym, hospital, school, etc.)

---

## Implementation Notes

1. **Temperature Units**: All temperatures are in Kelvin (convert to Celsius by subtracting 273.15)
2. **Timestamps**: Use ISO 8601 format for all timestamps
3. **Icons**: Use emoji icons for visual representation
4. **Required Fields**: All fields in the structure are required
5. **Data Types**: 
   - Numbers: Use actual numbers, not strings
   - Percentages: Include the % symbol in strings
   - Times: Use descriptive strings (e.g., "45 minutes")
6. **Error Handling**: Always return proper error responses for failed requests
7. **CORS**: Ensure CORS is enabled for frontend requests
8. **Rate Limiting**: Consider implementing rate limiting for production use

---

## Testing the API

**cURL Example:**
```bash
curl -X POST http://your-api-domain.com/api/livewise-insights \
  -H "Content-Type: application/json" \
  -d '{"location": "Kingston"}'
```

**JavaScript Example:**
```javascript
const response = await fetch('http://your-api-domain.com/api/livewise-insights', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    location: 'Kingston'
  })
});

const data = await response.json();
console.log(data);
```
