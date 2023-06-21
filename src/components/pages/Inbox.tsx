import { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";

interface Task {
  id: string;
  title: string;
  status: boolean;
  date: string;
}
interface InboxProps {
  userId: string;
}

function Inbox({ userId }: InboxProps) {
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
            {/* <div className="iconsWrap">
              <span title="Edit">
                <FontAwesomeIcon icon={faPen} />
              </span>
              <span title="Trash">
                <FontAwesomeIcon icon={faTrashAlt} />
              </span>
        </div>*/}
          </div>
        ))
      )}
    </div>
  );
}

export default Inbox;
