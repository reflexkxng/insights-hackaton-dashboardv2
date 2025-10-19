'use client'

import { motion } from 'framer-motion'

interface TransportData {
  origin_name: string
  dest_name: string
  fare: string
  typical_time: string
}

interface TransportCardProps {
  transportData: TransportData | null
  className?: string
}

export default function TransportCard({ transportData, className = '' }: TransportCardProps) {
  if (!transportData) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className={`w-[550px] h-[424px] bg-black/60 rounded-3xl shadow-2xl cursor-pointer relative overflow-hidden ${className}`}
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
              Transport
            </h3>
            <p className="text-white/50 italic">No transport data available</p>
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
      className={`w-[550px] h-[424px] bg-black/60 rounded-3xl shadow-2xl cursor-pointer relative overflow-hidden ${className}`}
      style={{
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-4 right-4 text-4xl opacity-20">
          🚌
        </div>
        <div className="absolute bottom-4 left-4 text-3xl opacity-15">
          🗺️
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
              Transport
            </h3>
            <p className="text-sm opacity-80">Route Information</p>
          </div>
          <motion.div
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
            className="text-4xl"
          >
            🚌
          </motion.div>
        </motion.div>

        {/* Transport Information Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="flex-1 flex flex-col gap-3 min-h-0"
        >
          {/* Transport Table */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
            className="bg-black/60 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-black/70 transition-all duration-300 overflow-hidden"
          >
            <div className="overflow-x-auto">
              <table className="w-full text-white">
                <thead>
                  <tr className="bg-black/40 border-b border-white/20">
                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide opacity-80">Route</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide opacity-80">Fare</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide opacity-80">Time</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-white/10 hover:bg-black/30 transition-colors duration-200">
                    <td className="px-4 py-3">
                      <div className="text-sm">
                        <div className="font-medium">{transportData.origin_name}</div>
                        <div className="text-xs opacity-60">to</div>
                        <div className="font-medium">{transportData.dest_name}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-bold text-green-400">{transportData.fare}</div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="text-sm font-bold">{transportData.typical_time}</div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  )
}
