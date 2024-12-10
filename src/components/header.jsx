import React from 'react';
import { motion } from 'framer-motion';
import SearchBar from "./SearchBar";

export default function Header({ onSearch, openModal }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ 
        type: "spring", 
        stiffness: 100, 
        damping: 15,
        duration: 0.7
      }}
      viewport={{ once: true }}
      className="bg-gradient-to-br from-gray-900 via-gray-800 to-black 
                  p-6 rounded-2xl shadow-2xl border-2 border-gray-700"
    >
      <div className="flex justify-between items-center space-x-6">
        {/* Brand Title with Gradient Text */}
        <motion.button 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          className="text-3xl font-extrabold 
                     bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 
                     text-transparent bg-clip-text 
                     tracking-wider"
        >

          Kanban
        </motion.button>

        {/* SearchBar */}
        <div className="flex-grow">
          <SearchBar onSearch={onSearch} />
        </div>

        {/* New Task Button with Hover and Click Effects */}
        <motion.button
          whileHover={{ 
            scale: 1.05,
            boxShadow: "0 0 15px rgba(96, 165, 250, 0.5)"
          }}
          whileTap={{ scale: 0.95 }}
          onClick={openModal}
          className="bg-gradient-to-r from-blue-600 to-purple-700 
                     text-white 
                     px-6 py-3 
                     rounded-xl 
                     font-semibold 
                     transition-all 
                     duration-300 
                     hover:from-blue-700 hover:to-purple-800 
                     focus:outline-none 
                     focus:ring-4 
                     focus:ring-blue-300 focus:ring-opacity-50 
                     shadow-lg hover:shadow-xl"
        >
          New Task
        </motion.button>
      </div>
    </motion.div>
  );
}