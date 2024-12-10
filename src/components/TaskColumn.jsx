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
  icons
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
          <span className="w-8 h-8 mr-3">{icons[icon]}</span>
          {title}
        </h2>
      </div>

      <AnimatePresence>
        {toggle && (
          <>
            {/* Background Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black z-40"
              onClick={() => setToggle(false)}
            ></motion.div>

            {/* Task Form */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center"
            >
              <TaskForm
                setTasks={setTasks}
                setTasksCopy={setTasksCopy}
                setToggle={setToggle}
              />
            </motion.div>
          </>
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