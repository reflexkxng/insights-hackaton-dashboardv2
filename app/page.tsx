'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import axios from 'axios'

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSearch = async () => {
    const query = searchQuery.trim()
    if (!query) return

    setIsSearching(true)
    setError('')

    try {
      console.log('Searching for city:', query)

      // Use LiveWise insights endpoint to get comprehensive data
      const response = await axios.post('http://localhost:3001/api/livewise-insights', {
        location: query
      })
      
      console.log('API response:', response.data)

      if (response.data.success) {
        // Navigate to dashboard with the LiveWise data
        try {
          const jsonData = JSON.stringify(response.data.data)
          const encodedData = encodeURIComponent(jsonData)
          router.push(`/dashboard?q=${encodeURIComponent(query)}&data=${encodedData}`)
        } catch (encodingError) {
          console.error('Error encoding data for URL:', encodingError)
          // Fallback: navigate without data parameter
          router.push(`/dashboard?q=${encodeURIComponent(query)}`)
        }
      } else {
        throw new Error('LiveWise insights failed')
      }
      
    } catch (error: any) {
      console.error('Error fetching data:', error)
      setIsSearching(false)
      
      if (error.response?.status === 400) {
        setError('Please enter a valid city name')
      } else if (error.response?.status === 404) {
        setError('City not found. Try "New York", "London", or "Tokyo"')
      } else {
        setError('Search failed. Please try again.')
      }
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch()
    }
  }

  return (
    <div className="landing-page">
      {/* Main Title */}
      <h1 className="main-title">INSIGHTS</h1>

      {/* Subtitle */}
      <p className="tagline">Stay Insightful</p>

      {/* Search Bar */}
      <div className="search-bar">
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search insights..."
          onKeyUp={handleKeyPress}
          disabled={isSearching}
        />
        <button onClick={handleSearch} className="search-btn" disabled={isSearching}>
          {isSearching ? '⏳' : '➜'}
        </button>
      </div>

      {/* Loading Text */}
      {isSearching && (
        <p className="loading-text">Looking for insights...</p>
      )}

      {/* Error Text */}
      {error && (
        <p className="error-text">{error}</p>
      )}

      {/* Footer */}
      <footer className="footer">
        <a href="#">Terms and Conditions</a>
        <span>•</span>
        <a href="#">Privacy</a>
      </footer>
    </div>
  )
}
