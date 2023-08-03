import { useEffect, useState } from "react";
import {
  getFirestore,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import Task from "../Interfaces/Task";
import "./Inbox.css";

// Interface for Inbox component's props
interface InboxProps {
  userId: string;
}

function Inbox({ userId }: InboxProps) {
  const [, setToDo] = useState<Task[]>([]); // Unused state variable, consider removing it

  // Function to delete a task
  const deleteTask = async (documentId?: string) => {
    try {
      if (documentId) {
        await deleteDoc(doc(tasksRef, documentId));
        //await window.location.reload();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  // State to store the tasks
  const [tasks, setTasks] = useState<Task[]>([]);
  const db = getFirestore();
  const tasksRef = collection(db, `users/${userId}/tasks`);

  // Fetch tasks from Firestore and subscribe to real-time changes
  useEffect(() => {
    const unsubscribe = onSnapshot(tasksRef, (snapshot) => {
      const tasks: Task[] = [];
      snapshot.forEach((doc) => {
        const task = doc.data() as Task;
        tasks.push(task);
      });
      setTasks(tasks);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, [tasksRef, userId, tasks]); // Add userId as a dependency

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
    };
    const formattedDate = dateObj.toLocaleString("en-US", options);

    return formattedDate;
  }

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

  return (
    <div className="container Inbox">
      <br />
      <h2>Inbox</h2>
      <br />

      {tasks.length === 0 ? (
        <div>No tasks found.</div>
      ) : (
        tasks.map((task) => (
          <div className="task" key={task.id}>
            <span className="taskText">
              {task.title} {extractDate(task.date)}
            </span>
            <br />

            <span
              title="Trash"
              onClick={() => deleteTask(task.documentId)}
              className="trash-icon"
            >
              <FontAwesomeIcon icon={faTrashAlt} />
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default Inbox;
