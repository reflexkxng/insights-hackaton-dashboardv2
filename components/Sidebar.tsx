'use client'

import { useState } from 'react'
import { ChevronRight } from 'lucide-react'

interface SidebarProps {
  isOpen: boolean
  onToggle: () => void
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <>
      {/* Sidebar toggle button */}
      <button
        onClick={onToggle}
        className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white text-black px-2 py-3 rounded-r-lg shadow-md z-20 hover:bg-gray-200 transition"
      >
        <ChevronRight 
          size={16}
          className={`transition-transform duration-300 ${
            isOpen ? 'rotate-180' : 'rotate-0'
          }`}
        />
      </button>

      {/* Sidebar */}
      {isOpen && (
        <div className="fixed left-0 top-0 h-full w-64 bg-black/80 text-white shadow-xl p-6 flex flex-col justify-between z-10 backdrop-blur-md animate-slideIn">
          <div>
            <h2 className="font-bold text-lg mb-6 tracking-wide">Saved Insights</h2>
          </div>

          <div className="text-sm text-gray-300">© 2025 Insights Dashboard</div>
        </div>
      )}
    </>
  )
}
