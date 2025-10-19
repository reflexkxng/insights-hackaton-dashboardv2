'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { fetchMockInsights } from "./utils/mockApi";

export default function LandingPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [isSearching, setIsSearching] = useState(false)
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSearch = async () => {
  const query = searchQuery.trim();
  if (!query) return;

  setIsSearching(true);
  setError('');

  try {
    console.log('Searching for city (mock):', query);

    // 🔹 Use mock data instead of axios to localhost
    const data = await fetchMockInsights(query);

    console.log('Mock data loaded:', data);

    // Navigate to dashboard with encoded mock data
    try {
      const jsonData = JSON.stringify(data);
      const encodedData = encodeURIComponent(jsonData);
      router.push(`/dashboard?q=${encodeURIComponent(query)}&data=${encodedData}`);
    } catch (encodingError) {
      console.error('Error encoding data for URL:', encodingError);
      router.push(`/dashboard?q=${encodeURIComponent(query)}`);
    }
  } catch (err) {
    console.error('Error loading mock data:', err);
    setError('Failed to load insights.');
  } finally {
    setIsSearching(false);
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
