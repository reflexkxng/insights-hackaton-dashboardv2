'use client'

import { motion } from 'framer-motion'

interface CrimeData {
  crime_type: string
  description: string
}

interface CrimeCardProps {
  crimeData: CrimeData | null
  className?: string
}

export default function CrimeCard({ crimeData, className = '' }: CrimeCardProps) {
  if (!crimeData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`w-[400px] h-[416px] bg-black/60 rounded-3xl shadow-2xl cursor-pointer relative overflow-hidden ${className}`}
        style={{
          boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
        }}
      >
        <div className="relative z-10 p-4 h-full flex flex-col text-white">
          <div className="text-center">
            <h3 
              className="font-bold text-2xl tracking-wide mb-4"
              style={{ fontFamily: '"Just Another Hand", cursive' }}
            >
              Crime
            </h3>
            <p className="text-white/50 italic">No crime data available</p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
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
        <div className="absolute top-4 right-4 text-4xl opacity-20">
          🛡️
        </div>
        <div className="absolute bottom-4 left-4 text-3xl opacity-15">
          ⚖️
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
              Crime
            </h3>
            <p className="text-sm opacity-80">Safety Analysis</p>
          </div>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
            className="text-4xl"
          >
            🛡️
          </motion.div>
        </motion.div>

        {/* Crime Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex-1 flex flex-col gap-4 min-h-0"
        >
          {/* Crime Type Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-black/70 transition-all duration-300"
          >
            <div className="text-center">
              <div className="text-sm opacity-70 mb-2 uppercase tracking-wide">Crime Type</div>
              <div className="text-xl font-bold text-white">{crimeData.crime_type}</div>
            </div>
          </motion.div>

          {/* Description Card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.3 }}
            className="bg-black/60 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-black/70 transition-all duration-300 flex-1"
          >
            <div className="text-sm opacity-70 mb-2 uppercase tracking-wide">Description</div>
            <p className="text-sm text-white/90 leading-relaxed">{crimeData.description}</p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
