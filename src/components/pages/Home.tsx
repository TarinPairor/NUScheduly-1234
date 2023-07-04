import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
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
import Task from "../Interfaces/Task";

interface HomeProps {
  userId: string;
}

function Home({ userId }: HomeProps) {
  const [toDo, setToDo] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const db = getFirestore();
  const tasksRef = collection(db, `users/${userId}/tasks`); //path

  //add userId ass dependency
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

  //compare 2 dates
  function compareDates(date1: string, date2: string): boolean {
    return date1 >= date2;
  }

  //add task to database
  const addTask = async () => {
    if (newTask && selectedDate) {
      const currentDate = new Date();
      const currentDateString = currentDate.toISOString().substring(0, 10);
      const selectedDateString = selectedDate.toISOString().substring(0, 10);
      if (compareDates(selectedDateString, currentDateString)) {
        const num = toDo.length + 1;
        const newEntry: Task = {
          id: num.toString(),
          title: newTask,
          date: selectedDate.toISOString(),
        };
        const docRef = await addDoc(tasksRef, newEntry);
        const documentId = docRef.id;
        const taskWithDocumentId: { [key: string]: any } = {
          ...newEntry,
          documentId: documentId,
        };
        await updateDoc(doc(tasksRef, documentId), taskWithDocumentId);
        setNewTask("");
        setSelectedDate(null);
      } else {
        console.log("date must be after today!");
      }
    } else if (!newTask) {
      console.log("can not have empty task input!");
    } else if (!selectedDate) {
      console.log("must select date!");
    }
  };

  const handleDateChange = (newDate: Date | null) => {
    setSelectedDate(newDate);
  };

  //delete task from database
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
    const date = str.substring(2, 10);
    return date;
  }

  return (
    <div className="container App">
      <br></br>
      <h2>ToDolist</h2>
      <br></br>
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

      {toDo && toDo.length ? "" : "No Tasks..."}
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
                      {task.title} <br></br>
                      {extractDate(task.date)}
                    </span>
                  </div>
                  <div className="iconsWrap">
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
  );
}

export default Home;
