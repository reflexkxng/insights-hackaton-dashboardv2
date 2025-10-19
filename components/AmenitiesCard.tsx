'use client'

import { motion } from 'framer-motion'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"

interface AmenityData {
  name: string
  type_of_place: string
}

interface AmenitiesData {
  amenities: AmenityData[]
}

interface AmenitiesCardProps {
  amenitiesData: AmenitiesData | null
  className?: string
}

export default function AmenitiesCard({ amenitiesData, className = '' }: AmenitiesCardProps) {
  console.log('AmenitiesCard received data:', amenitiesData) // Debug log
  
  if (!amenitiesData || !amenitiesData.amenities || amenitiesData.amenities.length === 0) {
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
              Amenities
            </h3>
            <p className="text-white/50 italic">No amenities data available</p>
          </div>
        </div>
      </motion.div>
    )
  }

  return (
    <TooltipProvider>
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
            🏪
          </div>
          <div className="absolute bottom-4 left-4 text-3xl opacity-15">
            🏢
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
                Amenities
              </h3>
              <p className="text-sm opacity-80">Nearby Places</p>
            </div>
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
              className="text-4xl"
            >
              🏪
            </motion.div>
          </motion.div>

          {/* Amenities Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex-1 flex flex-col gap-3 min-h-0"
          >
            {/* Amenities Table */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.3 }}
              className="bg-black/60 backdrop-blur-sm rounded-xl border border-white/20 hover:bg-black/70 transition-all duration-300 overflow-hidden flex-1"
            >
              <div className="overflow-y-auto h-full">
                <table className="w-full text-white">
                  <thead className="sticky top-0 bg-black/40">
                    <tr className="border-b border-white/20">
                      <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide opacity-80">Name</th>
                      <th className="px-4 py-3 text-left text-sm font-semibold uppercase tracking-wide opacity-80">Type</th>
                    </tr>
                  </thead>
                  <tbody>
                    {amenitiesData.amenities.map((amenity, index) => (
                      <Tooltip key={index}>
                        <TooltipTrigger asChild>
                          <tr className="border-b border-white/10 hover:bg-black/30 transition-colors duration-200 cursor-help">
                            <td className="px-4 py-3">
                              <div className="text-sm font-medium">{amenity.name}</div>
                            </td>
                            <td className="px-4 py-3">
                              <div className="text-sm text-blue-400 font-medium">{amenity.type_of_place}</div>
                            </td>
                          </tr>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{amenity.name} is a {amenity.type_of_place.toLowerCase()}</p>
                        </TooltipContent>
                      </Tooltip>
                    ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </TooltipProvider>
  )
}
