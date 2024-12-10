import React, { useState } from "react";
import { motion } from "framer-motion";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    const input = e.target.value;
    setQuery(input);
    onSearch(input);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mx-auto"
    >
      <motion.div
        whileFocus={{
          scale: 1.02,
          boxShadow: "0 0 20px rgba(99,102,241,0.3)",
        }}
        className="relative"
      >
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search tasks..."
          className="w-full px-6 py-4 bg-gradient-to-br from-gray-800 via-gray-900 to-black border-2 border-gray-700 rounded-full text-white text-lg focus:outline-none placeholder-gray-500 transition-all duration-300 hover:border-blue-500 focus:ring-4 focus:ring-blue-500/30"
        />
      </motion.div>
    </motion.section>
  );
};

export default SearchBar;
