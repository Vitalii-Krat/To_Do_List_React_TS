import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Card, TaskType } from "./components/Сard";
import { RotatingLines } from "react-loader-spinner";

export type FilterTypeValue = "All" | "In progress" | "Completed";

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [tasks, setTask] = useState<Array<TaskType>>([]);
  const [filter, setFilter] = useState<FilterTypeValue>("All");

  useEffect(() => {
    const taskLocalStorage = JSON.parse(localStorage.getItem("tasks") || "[]");
    setTask(taskLocalStorage);
    setIsLoading(false);
  }, []);

  function addNewTask(title: string) {
    if (title.length > 0 && title.trim()) {
      const newTask = {
        id: uuidv4(),
        title: title,
        isDone: false,
        date: new Date().toLocaleString(),
      };
      const taskLocalStorage = JSON.parse(
        localStorage.getItem("tasks") || "[]"
      );
      const newTasksArr = [...taskLocalStorage, newTask];
      setTask(newTasksArr);
      localStorage.setItem("tasks", JSON.stringify(newTasksArr));
    } else {
      alert("Empty imput field. You need write something");
    }
  }

  function deleteTask(id: string) {
    const taskLocalStorage = JSON.parse(localStorage.getItem("tasks") || "[]");
    const filteredTasks = taskLocalStorage.filter(
      (t: { id: string }) => t.id !== id
    );
    localStorage.setItem("tasks", JSON.stringify(filteredTasks));
    setTask(filteredTasks);
  }

  const onEditNoteTitle = (id: string, title: string) => {
    const editedTask = tasks.map((task) =>
      task.id === id ? { ...task, title } : task
    );

    setTask(editedTask);
    localStorage.setItem("tasks", JSON.stringify(editedTask));
  };

  function changeFilter(value: FilterTypeValue) {
    setFilter(value);
  }

  let taskStatus = tasks;
  if (filter === "In progress") {
    taskStatus = tasks.filter((t) => t.isDone === false);
  }
  if (filter === "Completed") {
    taskStatus = tasks.filter((t) => t.isDone === true);
  }

  return (
    <div className="container mx-auto">
      {isLoading ? (
        <div className="flex justify-center items-center h-screen">
          <RotatingLines
            strokeColor="orange"
            strokeWidth="5"
            animationDuration="0.75"
            width="200"
            visible={true}
          />
        </div>
      ) : (
        <Card
          title="My to do List"
          tasks={taskStatus}
          deleteTask={deleteTask}
          changeFilter={changeFilter}
          addNewTask={addNewTask}
          setTasks={setTask}
          onEditNoteTitle={onEditNoteTitle}
        />
      )}
    </div>
  );
}

export default App;
