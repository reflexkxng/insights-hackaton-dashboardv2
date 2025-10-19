'use client'

import { motion } from 'framer-motion'

interface NewsItem {
  id: number
  title: string
  content: string
  category: string
  priority: 'high' | 'medium' | 'low'
  date?: string
  timestamp?: string
}

interface NewsCardProps {
  items: NewsItem[]
}

export default function NewsCard({ items }: NewsCardProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -50 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="flex flex-col bg-black/60 backdrop-blur-lg border border-white/30 rounded-3xl shadow-2xl p-6 text-white w-[400px] h-[750px] relative overflow-hidden"
      style={{
        boxShadow: '0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.1)'
      }}
    >
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      <motion.h3 
        className="text-xl mb-4 font-bold"
        style={{ fontFamily: '"Just Another Hand", cursive' }}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        Recent News
      </motion.h3>
      
      <div className="flex-1 overflow-y-auto space-y-3">
        {items.length > 0 ? (
          items.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ 
                delay: 0.3 + (index * 0.1), 
                duration: 0.4,
                ease: "easeOut"
              }}
              whileHover={{ 
                scale: 1.02, 
                y: -2,
                transition: { duration: 0.2 }
              }}
              className="bg-gradient-to-r from-yellow-500/10 to-purple-500/10 backdrop-blur-sm rounded-lg p-3 border-l-4 cursor-pointer border border-yellow-400/20"
              style={{
                borderLeftColor: 
                  item.priority === 'high' ? '#ef4444' :
                  item.priority === 'medium' ? '#eab308' : '#22c55e'
              }}
            >
              <motion.div 
                className="flex justify-between items-start mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + (index * 0.1), duration: 0.3 }}
              >
                <h4 className="text-sm font-semibold text-white">{item.title}</h4>
                <div className="text-right">
                  <div className="text-xs text-gray-400">{item.date || item.timestamp}</div>
                  {item.date && item.timestamp && (
                    <div className="text-xs text-gray-500">{item.timestamp}</div>
                  )}
                </div>
              </motion.div>
              <motion.p 
                className="text-xs text-gray-300 mb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + (index * 0.1), duration: 0.3 }}
              >
                {item.content}
              </motion.p>
              <motion.div 
                className="flex justify-between items-center"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + (index * 0.1), duration: 0.3 }}
              >
                <motion.span 
                  className="text-xs px-2 py-1 bg-gradient-to-r from-yellow-500/20 to-purple-500/20 rounded text-white/90 border border-yellow-400/30"
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.category}
                </motion.span>
                <motion.span 
                  className="text-xs text-gray-500"
                  whileHover={{ scale: 1.1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.priority}
                </motion.span>
              </motion.div>
            </motion.div>
          ))
        ) : (
          <motion.div 
            className="text-center text-gray-400 text-sm py-8"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            No recent news updates
          </motion.div>
        )}
      </div>
    </motion.div>
  )
}
