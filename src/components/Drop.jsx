import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Drop = ({ onDrop }) => {
  const [showDrop, setShowDrop] = useState(false);
  const dropRef = useRef(null);

  const handleDragEnter = (e) => {
    e.preventDefault();
    setShowDrop(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setShowDrop(false);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setShowDrop(false);
    onDrop(e);
  };

  return (
    <div
      ref={dropRef}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
      className="relative w-full h-32 flex items-center justify-center" // Adjusted height to h-32
      role="region"
      aria-dropeffect="move"
    >
      <AnimatePresence>
        {showDrop && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 50 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 20,
            }}
            className="absolute inset-0 z-10"
          >
            <div
              className="w-full h-full 
                bg-gradient-to-br from-gray-900 via-black to-gray-800
                border-2 border-gray-700 rounded-3xl
                flex items-center justify-center
                text-transparent bg-clip-text 
                bg-gradient-to-r from-blue-400 to-purple-600
                text-xl font-bold tracking-wide // Reduced text size
                shadow-2xl
                transition-all duration-300
                cursor-pointer
                ring-4 ring-gray-700/50
                hover:ring-blue-500/50
                select-none"
            >
              Move Here
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Drop;
