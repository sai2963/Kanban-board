import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskColumn from "./components/TaskColumn";
import SearchBar from "./components/SearchBar";
import doneIcon from "./assets/done-1476-svgrepo-com.svg";
import reviewIcon from "./assets/review-screen-svgrepo-com.svg";
import progressIcon from "./assets/in-progress-svgrepo-com.svg";
import TodoIcon from "./assets/to-do-svgrepo-com.svg";

const App = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );
  const [tasksCopy, setTasksCopy] = useState(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleDelete = (taskIndex) => {
    const newTasks = tasks.filter((task, index) => index !== taskIndex);
    setTasks(newTasks);
    setTasksCopy(newTasks);
  };

  const onDrop = (status, position) => {
    if (activeCard == null || activeCard === undefined) return;
    const taskMove = tasks[activeCard];
    const updatedTask = tasks?.filter((task, index) => index !== activeCard);
    updatedTask.splice(position, 0, {
      ...taskMove,
      status: status
    });
    setTasks(updatedTask);
    setTasksCopy(updatedTask);
  };

  const [filteredItems, setFilteredItems] = useState(tasks);

  const filteredData = (newData) => {
    if (newData === " ") {
      setTasks(tasksCopy);
    } else {
      setTasks(newData);
    }
  };

  const columnData = [
    { title: "To do", icon: TodoIcon, status: "todo" },
    { title: "In Progress", icon: progressIcon, status: "doing" },
    { title: "Peer Review", icon: reviewIcon, status: "Peer Review" },
    { title: "Done", icon: doneIcon, status: "done" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black text-white p-6">
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="container mx-auto"
      >
        <div className="mb-8">
          <SearchBar 
            onSearch={filteredData} 
            className="bg-gray-700 text-white placeholder-gray-400 rounded-xl shadow-lg"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <AnimatePresence>
            {columnData.map((column, index) => (
              <motion.div
                key={column.status}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  duration: 0.5, 
                  delay: index * 0.2,
                  ease: "easeOut" 
                }}
                className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-4"
              >
                <TaskColumn 
                  title={column.title}
                  status={column.status}
                  icon={column.icon}
                  tasks={tasks}
                  onDrop={onDrop}
                  setActiveCard={setActiveCard}
                  handleDelete={handleDelete}
                  setTasks={setTasks}
                  setTasksCopy={setTasksCopy}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
};

export default App;