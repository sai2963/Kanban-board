import React, { useState } from "react";
import { motion } from "framer-motion";

const TaskForm = ({ setTasks, setToggle, setTasksCopy }) => {
  const [taskData, setTaskData] = useState({
    task: "",
    description: "",
    status: "todo",
    tags: []
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTaskData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setTasks((prev) => [...prev, taskData]);
    setTasksCopy((prev) => [...prev, taskData]);
    setTaskData({
      task: "",
      description: "",
      status: "todo",
      tags: []
    });
    setToggle((prev) => !prev);
  };

  return (
    <motion.section
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="w-full max-w-md mx-auto"
    >
      <form onSubmit={handleSubmit} className="space-y-6">
        <motion.input
          whileFocus={{
            scale: 1.02,
            boxShadow: "0 0 20px rgba(99,102,241,0.3)"
          }}
          type="text"
          name="task"
          value={taskData.task}
          placeholder="Enter your task"
          onChange={handleChange}
          required
          className="w-full px-6 py-4
              bg-gradient-to-br from-gray-800 via-gray-900 to-black
              border-2 border-gray-700 rounded-full
              text-white text-lg
              focus:outline-none
              placeholder-gray-500
             transition-all duration-300
             hover:border-blue-500
             focus:ring-4 focus:ring-blue-500/30"
        />

        <motion.textarea
          whileFocus={{
            scale: 1.02,
            boxShadow: "0 0 20px rgba(99,102,241,0.3)"
          }}
          name="description"
          value={taskData.description}
          placeholder="Enter task description"
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-6 py-4
              bg-gradient-to-br from-gray-800 via-gray-900 to-black
              border-2 border-gray-700 rounded-3xl
              text-white text-lg
              focus:outline-none
              placeholder-gray-500
             transition-all duration-300
             hover:border-blue-500
             focus:ring-4 focus:ring-blue-500/30
             resize-none"
        />

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full
              bg-gradient-to-r from-blue-500 to-purple-600
              text-white
              py-4
              rounded-full
              font-bold
              text-lg
              transition-all
              duration-300
              hover:shadow-2xl
              hover:brightness-110"
        >
          Submit Task
        </motion.button>
      </form>
    </motion.section>
  );
};

export default TaskForm;