import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TaskColumn from "./components/TaskColumn";
import { FcTodoList } from "react-icons/fc";
import { MdReviews } from "react-icons/md";
import { MdDone } from "react-icons/md";
import { GrInProgress } from "react-icons/gr";


import TaskForm from "./components/TaskForm";
import Header from "./components/header";

const App = () => {
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );
  const [tasksCopy, setTasksCopy] = useState(
    JSON.parse(localStorage.getItem("tasks") || "[]")
  );
  const [activeCard, setActiveCard] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      status: status,
    });
    setTasks(updatedTask);
    setTasksCopy(updatedTask);
  };

  const filteredData = (newData) => {
    setTasks(newData);
  };

  const icons = {
    todo: <FcTodoList />,
    doing: <GrInProgress />,
    "Peer Review": <MdReviews />, 
    done: <MdDone />,
  };
  
  
  const columnData = [
    { title: "To do", icon: "todo", status: "todo" },
    { title: "In Progress", icon: "doing", status: "doing" },
    { title: "Peer Review", icon: "Peer Review", status: "Peer Review" },
    { title: "Done", icon: "done", status: "done" },
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
          <Header
            onSearch={(query) => {
              const filteredItems = tasksCopy.filter((task) =>
                task.task.toLowerCase().includes(query.toLowerCase())
              );
              filteredData(query === "" ? tasksCopy : filteredItems);
            }}
            openModal={() => setIsModalOpen(true)}
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
                  ease: "easeOut",
                }}
                className="bg-gray-800 rounded-2xl shadow-2xl border border-gray-700 p-4"
              >
                <TaskColumn
                  title={column.title}
                  status={column.status}
                  icon={column.icon}
                  icons={icons}
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

      {/* Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              onClick={() => setIsModalOpen(false)}
              className="fixed inset-0 bg-black z-40"
            />

            {/* Modal */}
            <motion.div
              key="modal"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-50 flex items-center justify-center"
            >
              <div
                className="bg-gray-800 p-6 rounded-lg shadow-xl"
                onClick={(e) => e.stopPropagation()}
              >
                <TaskForm
                  setTasks={setTasks}
                  setTasksCopy={setTasksCopy}
                  setToggle={setIsModalOpen}
                />
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default App;
