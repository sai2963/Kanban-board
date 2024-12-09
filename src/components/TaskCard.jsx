import React from "react";
import { motion } from "framer-motion";
import deleteIcon from "../assets/delete.png";

const TaskCard = ({
  title,
  description,
  tags,
  handleDelete,
  index,
  setActiveCard,
}) => {
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="bg-gradient-to-br from-gray-800 via-gray-900 to-black 
                  rounded-2xl p-6 
                  border border-gray-700 
                  shadow-2xl hover:shadow-[0_0_20px_rgba(99,102,241,0.3)]
                  transition-all duration-300
                  cursor-grab active:cursor-grabbing"
      draggable
      onDragStart={() => setActiveCard(index)}
      onDragEnd={() => setActiveCard(null)}
    >
      <p
        className="text-2xl font-bold 
                    text-transparent bg-clip-text 
                    bg-gradient-to-r from-blue-400 to-purple-600 
                    mb-3"
      >
        {title}
      </p>

      <p className="text-gray-300 text-base mb-4">{description}</p>

      <div className="flex justify-between items-center mt-4">
        <motion.div
          className="task_delete 
                     bg-red-600/20 
                     hover:bg-red-600/40 
                     p-2 rounded-full 
                     transition-all duration-300"
          onClick={() => handleDelete(index)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <img
            src={deleteIcon}
            className="w-6 h-6 filter brightness-150"
            alt="Delete"
          />
        </motion.div>
      </div>
    </motion.article>
  );
};

export default TaskCard;
