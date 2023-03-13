import React, { useState } from "react";
import { FilterTypeValue } from "../App";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  deleteTask: (id: string) => void;
  changeFilter: (value: FilterTypeValue) => void;
  addNewTask: (title: string) => void;
  setTasks: (tasks: TaskType[]) => void;
};

export function Card(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");

  const onNewTaskChangeHanddler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewTaskTitle(e.currentTarget.value);
  };

  const filterAllHandle = () => props.changeFilter("All");

  const filterInProgressHandle = () => props.changeFilter("In progress");

  const filterCompletedlHandle = () => props.changeFilter("Completed");

  const onClickEnterHandler = (e: { key: string }) => {
    if (e.key === "Enter") {
      props.addNewTask(newTaskTitle);
      setNewTaskTitle("");
    }
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 border 
                 border-gray-300 hover:bg-gray-100 
                transition-colors duration-300 ease-in-out"
    >
      <h1 className="font-bold text-5xl text-black mb-4 text-center">
        {props.title}
      </h1>

      <div className="my-5 mx-auto flex justify-items-start">
        <button
          className="bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2
                     focus:ring-red-600 focus:ring-opacity-50 
                     shadow-md rounded-md py-6 px-9 text-white"
          onClick={filterAllHandle}
        >
          All
        </button>

        <button
          className="bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2
                     focus:ring-red-600 focus:ring-opacity-50 
                     shadow-md rounded-md py-6 px-9 text-white"
          onClick={filterInProgressHandle}
        >
          In Progress
        </button>

        <button
          className="bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2
                     focus:ring-red-600 focus:ring-opacity-50 
                     shadow-md rounded-md py-6 px-9 text-white"
          onClick={filterCompletedlHandle}
        >
          Completed
        </button>
      </div>

      <div className="flex-auto my-4">
        <input
          type="text"
          placeholder="Введите текст"
          value={newTaskTitle}
          className="bg-gradient-to-r focus:outline-none focus:ring-2
           focus:ring-yellow-500 focus:border-transparent py-5 px-12 mx-8"
          onChange={onNewTaskChangeHanddler}
          onKeyDown={onClickEnterHandler}
        />

        <button
          onClick={() => {
            props.addNewTask(newTaskTitle);
            setNewTaskTitle("");
          }}
          className="bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2
                     focus:ring-red-600 focus:ring-opacity-50 
                     shadow-md rounded-md py-6 px-9 text-white"
        >
          Add new task
        </button>
      </div>

      <div>
        <ul>
          {props.tasks.map((t) => {
            const onCheckedHandler = (e: { target: { checked: any } }) => {
              const updatedTasks = props.tasks.map((task) => {
                if (task.id === t.id) {
                  return { ...task, isDone: e.target.checked };
                }
                return task;
              });
              props.setTasks(updatedTasks);
              localStorage.setItem("tasks", JSON.stringify(updatedTasks));
            };

            const onRemoveHandler = () => props.deleteTask(t.id);

            return (
              <li
                key={t.id}
                className="border-b-2 flex items-center  bg-gradient-to-r from-yellow-300
                 via-yellow-400 to-orange-400 rounded border-gray-300 focus:outline-none 
                 focus:ring-2 focus:ring-yellow-400 focus:border-transparent"
              >
                <input
                  type="checkbox"
                  className="form-checkbox mx-10 h-10 w-10
                   bg-green-600 text-green-500 rounded-md border-gray-300"
                  checked={t.isDone}
                  onChange={onCheckedHandler}
                />

                <p className="mt-4 mb-8 text-4xl text-black">{t.title}</p>

                <button
                  onClick={onRemoveHandler}
                  className="bg-red-500 hover:bg-red-600 focus:outline-none 
                  focus:ring-2 focus:ring-red-600 focus:ring-opacity-50 shadow-md 
                  rounded-md mx-10 h-10 w-10 text-white"
                >
                  X
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
