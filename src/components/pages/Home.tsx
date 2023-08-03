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
import TextField from "@mui/material/TextField";

// Interface for Home component's props
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
    // Fetch tasks from Firestore and subscribe to real-time changes
    const unsubscribe = onSnapshot(tasksRef, (snapshot) => {
      const tasks: Task[] = [];
      snapshot.forEach((doc) => {
        const task = doc.data() as Task;
        tasks.push(task);
      });
      setToDo(tasks);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [tasksRef, userId]);

  function compareDates(date1: string, date2: string): boolean {
    return date1 >= date2;
  }

  // Function to add a new task
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

  // Function to close the alert message
  const handleCloseAlert = () => {
    setAlertMessage("");
  };

  // Function to handle date change for the date picker
  const handleDateChange = (newDate: Date | null) => {
    setSelectedDate(newDate);
  };

  // Function to delete a task
  const deleteTask = async (documentId?: string) => {
    try {
      if (documentId) {
        await deleteDoc(doc(tasksRef, documentId));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // Function to extract formatted date from a string
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
      hour: "numeric",
      minute: "numeric",
    };
    const formattedDate = dateObj.toLocaleString("en-US", options);

    return formattedDate;
  }

  // Function to update a task
  const updateTask = async () => {
    if (updateData && updateData.documentId) {
      try {
        if (!updateData.title) {
          setAlertMessage("Task must not be empty!");
          return;
        }
        if (!selectedDate) {
          setAlertMessage("Must select a date!");
          return;
        }

        const currentDate = new Date();
        const currentDateString = currentDate.toISOString().substring(0, 10);
        const selectedDateString = selectedDate.toISOString().substring(0, 10);

        if (!compareDates(selectedDateString, currentDateString)) {
          setAlertMessage("Date must be after today!");
          return;
        }

        const { documentId, ...updatedData } = updateData; // Exclude the 'documentId' property
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
        setSelectedDate(null); // Clear selectedDate after update
        setAlertMessage(""); // Clear any previous error message
      } catch (error) {
        console.error("Error updating task:", error);
      }
    }
  };

  // Function to cancel the task update
  const cancelUpdate = () => {
    setUpdateData(null);
  };

  return (
    <div>
      <div className="container App">
        <br />
        <h2>ToDolist</h2>
        <br />

        {updateData ? (
          <div className="row">
            <div className="col">
              <label htmlFor="taskTitleInput">Task Title</label>
              <TextField
                id="taskTitleInput"
                label="New Title"
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
              <TextField
                id="descriptionInput"
                label="New Description"
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
            <div className="col">
              {/* Display DatePickerValue for the selected date */}
              <div className="datePickerContainer">
                <DatePickerValue
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </div>
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
              <label htmlFor="taskInput">Task</label>
              <TextField
                id="taskInput"
                label="Task title"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                className="form-control form-control-lg"
              />
              <br />
              <div className="description"></div>
              <label htmlFor="descriptionInput">Description</label>
              <TextField
                id="descriptionInput"
                label="Task description"
                multiline
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
        <div className="alert-message">
          {alertMessage && (
            <Alert onClose={handleCloseAlert}>{alertMessage}</Alert>
          )}
        </div>
        {toDo &&
          toDo
            .slice(0, 4)
            .sort((a, b) => {
              const dateA = new Date(a.date).getTime(); // Convert to milliseconds
              const dateB = new Date(b.date).getTime();

              return dateA - dateB;
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
