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

interface InboxProps {
  userId: string;
}

function Inbox({ userId }: InboxProps) {
  const [, setToDo] = useState<Task[]>([]);

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

  const [tasks, setTasks] = useState<Task[]>([]);
  const db = getFirestore();
  const tasksRef = collection(db, `users/${userId}/tasks`);

  useEffect(() => {
    const unsubscribe = onSnapshot(tasksRef, (snapshot) => {
      const tasks: Task[] = [];
      snapshot.forEach((doc) => {
        const task = doc.data() as Task;
        tasks.push(task);
      });
      setTasks(tasks);
    });

    return () => unsubscribe();
  }, [tasksRef, userId, tasks]);

  function extractDate(str: string): string {
    // Extract the date part from the string
    const date = str.substring(2, 10);

    return date;
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
            <span title="Trash" onClick={() => deleteTask(task.documentId)}>
              <FontAwesomeIcon icon={faTrashAlt} />
            </span>
          </div>
        ))
      )}
    </div>
  );
}

export default Inbox;
