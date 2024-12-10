import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskCard from "./TaskCard";
import TaskForm from "./TaskForm";
import Drop from "./Drop";

const TaskColumn = ({
  title,
  icon,
  tasks,
  status,
  handleDelete,
  setTasksCopy,
  setTasks,
  setActiveCard,
  onDrop,
}) => {
  const [toggle, setToggle] = useState(false);

  const editHandler = () => {
    setToggle(!toggle);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-br from-gray-900 via-black to-gray-800
                    rounded-3xl p-6
                    border border-gray-700
                    shadow-2xl
                    relative
                    min-h-[600px]
                    overflow-hidden"
    >
      <div className="flex items-center justify-between mb-6">
        <h2
          className="flex items-center text-2xl font-bold
                        text-transparent bg-clip-text
                        bg-gradient-to-r from-blue-400 to-purple-600"
        >
          <img
            className="w-8 h-8 mr-3"
            src={icon}
            alt={`${title} icon`}
          />
          {title}
        </h2>
        {title === "To do" && (
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={editHandler}
            className="bg-blue-600/20
                        hover:bg-blue-600/40
                        text-blue-400
                        px-4 py-2
                        rounded-full
                        font-semibold
                        transition-all
                        duration-300"
          >
            + Add Task
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {toggle && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="absolute inset-0
                          bg-gradient-to-br from-gray-800 via-gray-900 to-black
                          z-10
                          flex items-center
                          justify-center
                          p-6"
          >
            <TaskForm
              setTasks={setTasks}
              setTasksCopy={setTasksCopy}
              setToggle={setToggle}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Drop onDrop={() => onDrop(status, 0)} />
      <div className="space-y-2">
        {tasks.map(
          (task, index) =>
            task.status === status && (
              <React.Fragment key={index}>
                <TaskCard
                  title={task.task}
                  description={task.description}
                  tags={task.tags}
                  handleDelete={handleDelete}
                  index={index}
                  setActiveCard={setActiveCard}
                />
                <Drop onDrop={() => onDrop(status, index + 1)} />
              </React.Fragment>
            )
        )}
      </div>
    </motion.section>
  );
};

export default TaskColumn;