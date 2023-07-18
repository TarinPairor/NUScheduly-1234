import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPen } from "@fortawesome/free-solid-svg-icons";
import DatePickerValue from "../DateTimePickerValue";
import Alert from "../Alert";
import "./Home.css";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import Task from "../Interfaces/Task";
import dayjs from "dayjs";
import "dayjs/locale/en";

interface HomeProps {
  userId: string;
}

function Home({ userId }: HomeProps) {
  dayjs.locale("en");
  const [toDo, setToDo] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [newDescription, setNewDescription] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const db = getFirestore();
  const tasksRef = collection(db, `users/${userId}/tasks`);
  const [updateData, setUpdateData] = useState<Task | null>(null);
  const [alertMessage, setAlertMessage] = useState("");

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
  }, [tasksRef, userId]);

  function compareDates(date1: string, date2: string): boolean {
    return date1 >= date2;
  }

  const addTask = async () => {
    if (!newTask) {
      setAlertMessage("Task must not be empty!");
    } else if (!selectedDate) {
      setAlertMessage("Must select a date!");
    } else {
      const currentDate = new Date();
      const currentDateString = currentDate.toISOString().substring(0, 10);
      const selectedDateString = selectedDate.toISOString().substring(0, 10);
      if (compareDates(selectedDateString, currentDateString)) {
        const num = toDo.length + 1;
        const newEntry: Task = {
          id: num.toString(),
          title: newTask,
          description: newDescription,
          date: selectedDate.toISOString(),
          time: "",
        };
        const docRef = await addDoc(tasksRef, newEntry);
        const documentId = docRef.id;
        const taskWithDocumentId: { [key: string]: any } = {
          ...newEntry,
          documentId: documentId,
        };
        await updateDoc(doc(tasksRef, documentId), taskWithDocumentId);
        setNewTask("");
        setNewDescription("");
        setSelectedDate(null);
      } else {
        setAlertMessage("Date must be after today!");
      }
    }
  };

  const handleCloseAlert = () => {
    setAlertMessage("");
  };

  const handleDateChange = (newDate: Date | null) => {
    setSelectedDate(newDate);
  };

  const deleteTask = async (documentId?: string) => {
    try {
      if (documentId) {
        await deleteDoc(doc(tasksRef, documentId));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  function extractDate(str: string): string {
    if (!str || typeof str !== "string") {
      return "";
    }

    const dateObj = new Date(str);
    const options: Intl.DateTimeFormatOptions = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    const formattedDate = dateObj.toLocaleString("en-US", options);

    return formattedDate;
  }
  const updateTask = async () => {
    if (updateData && updateData.documentId) {
      const { documentId, ...updatedData } = updateData; // Exclude the 'documentId' property
      try {
        await updateDoc(doc(tasksRef, documentId), updatedData);
        const updatedTasks = toDo.map((task) => {
          if (task.id === updateData.id) {
            return {
              ...task,
              ...updatedData,
            };
          }
          return task;
        });
        setToDo(updatedTasks);
        setUpdateData(null);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  const cancelUpdate = () => {
    setUpdateData(null);
  };

  return (
    <div>
      <div className="alert-message">
        {alertMessage && (
          <Alert onClose={handleCloseAlert}>{alertMessage}</Alert>
        )}
      </div>
      <div className="container App">
        <br />
        <h2>ToDolist</h2>
        <br />

        {updateData ? (
          <div className="row">
            <div className="col">
              <label htmlFor="taskTitleInput">Task Title</label>
              <input
                id="taskTitleInput"
                value={updateData.title}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    title: e.target.value,
                  })
                }
                className="form-control form-control-lg"
              />
              <br />
              <label htmlFor="descriptionInput">Description</label>
              <input
                id="descriptionInput"
                value={updateData.description}
                onChange={(e) =>
                  setUpdateData({
                    ...updateData,
                    description: e.target.value,
                  })
                }
                className="form-control form-control-lg"
              />
            </div>
            <div className="col"></div>
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
              <label htmlFor="taskInput">Task</label>
              <input
                id="taskInput"
                placeholder="Task title"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="form-control form-control-lg"
              />
              <br />
              <div className="description"></div>
              <label htmlFor="descriptionInput">Description</label>
              <input
                id="descriptionInput"
                placeholder="Task description"
                value={newDescription}
                onChange={(e) => setNewDescription(e.target.value)}
                className="form-control form-control-lg"
              />
            </div>
            <div className="col">
              <div className="datePickerContainer">
                <DatePickerValue
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </div>
            </div>
            <div className="col-auto">
              <button onClick={addTask} className="btn btn-lg btn-success">
                Add Task
              </button>
            </div>
          </div>
        )}

        {toDo &&
          toDo
            .slice(0, 4)
            .sort((a, b) => {
              const dateA = extractDate(a.date).split("-");
              const dateB = extractDate(b.date).split("-");

              const numA = Number(dateA[0] + dateA[1] + dateA[2]);
              const numB = Number(dateB[0] + dateB[1] + dateB[2]);

              return numA - numB;
            })
            .map((task) => {
              return (
                <React.Fragment key={task.id}>
                  <div className="col taskBg">
                    <div>
                      <span className="taskText">
                        {task.title}
                        <div className="taskDesc">
                          <span>{task.description}</span>
                        </div>
                        <br />
                        {extractDate(task.date)}
                      </span>
                      <br />
                    </div>
                    <div className="iconsWrap">
                      <span
                        title="Edit"
                        onClick={() =>
                          setUpdateData({
                            id: task.id,
                            title: task.title,
                            description: task.description,
                            date: task.date,
                            time: task.time,
                            documentId: task.documentId, // Add this line
                          })
                        }
                      >
                        <FontAwesomeIcon icon={faPen} />
                      </span>
                      <span
                        title="Trash"
                        onClick={() => deleteTask(task.documentId)}
                      >
                        <FontAwesomeIcon icon={faTrashAlt} />
                      </span>
                    </div>
                  </div>
                </React.Fragment>
              );
            })}
      </div>
    </div>
  );
}

export default Home;
