import React, { useState } from "react";
import { FilterTypeValue } from "../App";
import { Button } from "./Button";

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
  date: string;
};

type PropsType = {
  title: string;
  tasks: Array<TaskType>;
  deleteTask: (id: string) => void;
  changeFilter: (value: FilterTypeValue) => void;
  addNewTask: (title: string) => void;
  setTasks: (tasks: TaskType[]) => void;
  onEditNoteTitle: (id: string, title: string) => void;
};

export function Card(props: PropsType) {
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [editingNoteId, setEditingNoteId] = useState("");

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

  const AddNewTaskHandler = () => {
    props.addNewTask(newTaskTitle);
    setNewTaskTitle("");
  };

  const onEditHandler = (id: string) => {
    setEditingNoteId(id);
  };

  const onSaveEditHandler = (id: string, title: string) => {
    props.onEditNoteTitle(id, title);
    setEditingNoteId(id);
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
        <Button onClick={filterAllHandle} text="All" />
        <Button onClick={filterInProgressHandle} text="In Progress" />
        <Button onClick={filterCompletedlHandle} text="Completed" />
      </div>

      <div className="flex-auto my-4">
        <input
          type="text"
          placeholder="Введите текст"
          value={newTaskTitle}
          className="bg-white outline-slate-800  py-5 px-12 mx-8"
          onChange={onNewTaskChangeHanddler}
          onKeyDown={onClickEnterHandler}
        />

        <Button onClick={AddNewTaskHandler} text=" Add new task" />
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
                className=" flex-wrap px-5 py-7 border-b-2 flex items-center  bg-gradient-to-r from-yellow-300
                 via-yellow-400 to-orange-400 rounded border-gray-300 focus:outline-none 
                 focus:ring-2 focus:ring-yellow-400 focus:border-transparent hover:scale-105 duration-700"
              >
                <input
                  type="checkbox"
                  className="form-checkbox mx-10 h-10 w-10
                   rounded-md border-gray-300"
                  checked={t.isDone}
                  onChange={onCheckedHandler}
                />
                {t.id === editingNoteId ? (
                  <input
                    className="bg-white outline-slate-800  py-5 px-12 mx-8"
                    value={t.title}
                    onChange={(e) => onSaveEditHandler(t.id, e.target.value)}
                  />
                ) : (
                  <p
                    onClick={() => onEditHandler(t.id)}
                    className="mt-4 px-2 py-2  text-2xl text-black flex-wrap"
                  >
                    {t.title}
                  </p>
                )}
                <Button onClick={onRemoveHandler} text="X" />
                <p className="ml-4 text-2xl text-gray-500">{t.date}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
