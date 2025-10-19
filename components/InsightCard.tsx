'use client'

import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'

interface InsightCardProps {
  title: string
  content: string
  icon?: string
  status: 'empty' | 'updated' | 'error'
  className?: string
  width?: string
  height?: string
}

export default function InsightCard({ 
  title, 
  content, 
  icon, 
  status, 
  className = '',
  width = 'w-[400px]',
  height = 'h-[416px]'
}: InsightCardProps) {
  return (
    <HoverCard>
      <HoverCardTrigger asChild>
        <motion.div 
          initial={{ opacity: 0, y: 20, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ 
            duration: 0.5,
            ease: "easeOut",
            delay: Math.random() * 0.2 // Staggered animation
          }}
          whileHover={{ 
            y: -8, 
            scale: 1.02,
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.98 }}
          className={`${width} ${height} bg-black/60 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl flex flex-col justify-start p-6 cursor-pointer relative overflow-hidden ${className}`}
          style={{
            boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
          }}
        >
          {/* Subtle gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
          <motion.div 
            className="text-center text-white relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <motion.h3 
              className="font-bold text-2xl mb-4 text-white/90 tracking-wide"
              style={{ fontFamily: '"Just Another Hand", cursive' }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              {title}
            </motion.h3>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.3 }}
              className="bg-gradient-to-br from-yellow-500/10 to-purple-500/10 rounded-2xl p-4 backdrop-blur-sm border border-yellow-400/20"
            >
              {content ? (
                <p className="text-sm leading-relaxed text-white/80">{content}</p>
              ) : (
                <p className="text-sm text-white/50 italic">No data available</p>
              )}
            </motion.div>
            {icon && (
              <motion.div
                className="mt-6 flex justify-center"
                initial={{ scale: 0, rotate: -180 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ 
                  delay: 0.5, 
                  duration: 0.6,
                  type: "spring",
                  stiffness: 200
                }}
                whileHover={{ 
                  scale: 1.2, 
                  rotate: 10,
                  transition: { duration: 0.2 }
                }}
              >
                <div className="w-16 h-16 bg-gradient-to-br from-yellow-400/30 to-purple-500/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-yellow-400/30">
                  <span className="text-3xl">{icon}</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      </HoverCardTrigger>
      <HoverCardContent className="w-80">
        <motion.div 
          className="p-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.2 }}
        >
          <h4 className="font-semibold mb-2">{title}</h4>
          <p className="text-sm text-gray-600">{content || 'No additional information available'}</p>
        </motion.div>
      </HoverCardContent>
    </HoverCard>
  )
}
