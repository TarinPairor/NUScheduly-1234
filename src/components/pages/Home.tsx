import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
//import useFirebaseConfig from "../Firebase/useFirebaseConfig";
import DatePickerValue from "../DatePickerValue";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

interface Task {
  id: string;
  title: string;
  status: boolean;
  date: string;
}

interface HomeProps {
  userId: string;
}

function Home({ userId }: HomeProps) {
  const [toDo, setToDo] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [updateData, setUpdateData] = useState<Task | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  //const userId = "HdmmR2vQXmgdPX0uSdXHGuR93hG2";
  const db = getFirestore();
  const tasksRef = collection(db, `users/${userId}/tasks`); //path

  useEffect(() => {
    const unsubscribe = onSnapshot(tasksRef, (snapshot) => {
      const tasks: Task[] = [];
      snapshot.forEach((doc) => {
        const task = doc.data() as Task;
        tasks.push(task);
      });
      setToDo(tasks);
    });

    return () => unsubscribe();
  }, [tasksRef, userId]); // Add userId as a dependency

  const addTask = async () => {
    if (newTask && selectedDate) {
      const num = toDo.length + 1;
      const newEntry: Task = {
        id: num.toString(),
        title: newTask,
        status: false,
        date: selectedDate.toISOString(), // Convert the selected date to a string representation
      };
      await addDoc(tasksRef, newEntry);
      setNewTask("");
      setSelectedDate(null);
    }
  };

  const handleDateChange = (newDate: Date | null) => {
    setSelectedDate(newDate);
  };

  const deleteTask = async (id: string) => {
    try {
      await deleteDoc(doc(tasksRef, id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const cancelUpdate = () => {
    setUpdateData(null);
  };

  const changeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updateData) {
      const newEntry: Task = {
        id: updateData.id,
        title: e.target.value,
        status: updateData.status,
        date: updateData.date, // Retain the existing date value
      };
      setUpdateData(newEntry);
    }
  };

  const updateTask = async () => {
    if (updateData) {
      const { title, status } = updateData; //const { id, title, status } = updateData;
      const updatedTask = { title, status };
      await updateDoc(doc(tasksRef, updateData.id), updatedTask);
      setUpdateData(null);
    }
  };

  return (
    <div className="container App">
      <br></br>
      <h2>ToDolist</h2>
      <br></br>
      {/* Update task */}
      {updateData && updateData ? (
        <div className="row">
          <div className="col">
            <input
              value={updateData && updateData.title}
              onChange={(e) => changeTask(e)}
              className="form-control form-control-lg"
            />
          </div>
          <div className="col-auto">
            <button
              onClick={updateTask}
              className="btn btn-lg btn-success mr-20"
            >
              Update Task
            </button>
            <button onClick={cancelUpdate} className="btn btn-lg btn-warning">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col">
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="form-control form-control-lg"
            />
          </div>
          <div className="col">
            <DatePickerValue value={selectedDate} onChange={handleDateChange} />
          </div>
          <div className="col-auto">
            <button onClick={addTask} className="btn btn-lg btn-success">
              Add Task
            </button>
          </div>
        </div>
      )}

      {toDo && toDo.length ? "" : "No Tasks..."}
      {toDo &&
        toDo.map((task) => {
          return (
            <React.Fragment key={task.id}>
              <div className="col taskBg">
                <div className={task.status ? "done" : ""}>
                  {/*<span className="taskNumber">{i + 1}</span>*/}
                  <span className="taskText">{task.title}</span>
                </div>
                <div className="iconsWrap">
                  {task.status ? null : (
                    <span
                      title="Edit"
                      onClick={() =>
                        setUpdateData({
                          id: task.id,
                          title: task.title,
                          status: task.status,
                          date: task.date, // Include the date in the updateData state
                        })
                      }
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </span>
                  )}

                  <span title="Trash" onClick={() => deleteTask(task.id)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </span>
                </div>
              </div>
            </React.Fragment>
          );
        })}
    </div>
  );
}

export default Home;
/*

import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";

function Home() {
  interface Task {
    id: number;
    title: string;
    status: boolean;
  }
  const [toDo, setToDo] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [updateData, setUpdateData] = useState<Task | null>(null);

  const addTask = () => {
    if (newTask) {
      const num = toDo.length + 1;
      const newEntry: Task = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask("");
    }
  };

  const deleteTask = (id: number) => {
    const newTaskList = toDo.filter((task) => task.id !== id);
    setToDo(newTaskList);
  };

  /*const markDone = (id: number) => {
    const newTaskList = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(newTaskList);
  };

  const cancelUpdate = () => {
    setUpdateData(null);
  };

  const changeTask = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (updateData) {
      const newEntry: Task = {
        id: updateData.id,
        title: e.target.value,
        status: updateData.status,
      };
      setUpdateData(newEntry);
    }
  };

  const updateTask = () => {
    if (updateData) {
      const updatedObject = [...toDo].filter(
        (task) => task.id !== updateData.id
      );
      updatedObject.push(updateData);
      setToDo(updatedObject);
      setUpdateData(null);
    }
  };

  return (
    <div className="container App">
      <br></br>
      <h2>ToDolist</h2>
      <br></br>
      {/*Update task}
      {updateData && updateData ? (
        <div className="row">
          <div className="col">
            <input
              value={updateData && updateData.title}
              onChange={(e) => changeTask(e)}
              className="form-control form-control-lg"
            />
          </div>
          <div className="col-auto">
            <button
              onClick={updateTask}
              className="btn btn-lg btn-success mr-20"
            >
              Update Task
            </button>
            <button onClick={cancelUpdate} className="btn btn-lg btn-warning">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <div className="row">
          <div className="col">
            <input
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="form-control form-control-lg"
            />
          </div>
          <div className="col-auto">
            <button onClick={addTask} className="btn btn-lg btn-success">
              Add Task
            </button>
          </div>
        </div>
      )}

      {toDo && toDo.length ? "" : "No Tasks..."}
      {toDo &&
        toDo.map((task, i) => {
          return (
            <React.Fragment key={task.id}>
              <div className="col taskBg">
                <div className={task.status ? "done" : ""}>
                  <span className="taskNumber">{i + 1}</span>
                  <span className="taskText">{task.title}</span>
                </div>
                <div className="iconsWrap">
                  {task.status ? null : (
                    <span
                      title="Edit"
                      onClick={() =>
                        setUpdateData({
                          id: task.id,
                          title: task.title,
                          status: task.status,
                        })
                      }
                    >
                      <FontAwesomeIcon icon={faPen} />
                    </span>
                  )}

                  <span title="Trash" onClick={() => deleteTask(task.id)}>
                    <FontAwesomeIcon icon={faTrashCan} />
                  </span>
                </div>
              </div>
            </React.Fragment>
          );
        })}
    </div>
  );
}

export default Home;*/
