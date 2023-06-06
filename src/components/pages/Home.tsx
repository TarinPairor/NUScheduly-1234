import React from "react";
import { ChangeEvent, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {
  collection,
  query,
  where,
  onSnapshot,
  updateDoc,
  doc,
} from "firebase/firestore";

interface Task {
  id: number;
  title: string;
  status: boolean;
}

function Home({ db, user }) {
  const [toDo, setToDo] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [updateData, setUpdateData] = useState<Task | null>(null);

  useEffect(() => {
    const q = query(
      collection(db, "taskLists"),
      where("userId", "==", user.uid)
    );
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const tasks = snapshot.docs[0].data().tasks;
      setToDo(tasks);
    });

    return () => unsubscribe();
  }, [db, user]);

  const addTask = async () => {
    if (newTask) {
      const num = toDo.length + 1;
      const newEntry: Task = { id: num, title: newTask, status: false };
      setToDo([...toDo, newEntry]);
      setNewTask("");

      // Update the task list in Firestore
      const taskListRef = doc(db, "taskLists", user.uid);
      await updateDoc(taskListRef, { tasks: [...toDo, newEntry] });
    }
  };

  const deleteTask = async (id: number) => {
    const newTaskList = toDo.filter((task) => task.id !== id);
    setToDo(newTaskList);

    // Update the task list in Firestore
    const taskListRef = doc(db, "taskLists", user.uid);
    await updateDoc(taskListRef, { tasks: newTaskList });
  };

  /*const markDone = (id: number) => {
    const newTaskList = toDo.map((task) => {
      if (task.id === id) {
        return { ...task, status: !task.status };
      }
      return task;
    });
    setToDo(newTaskList);
  };*/

  const cancelUpdate = () => {
    setUpdateData(null);
  };

  const changeTask = (e: ChangeEvent<HTMLInputElement>) => {
    if (updateData) {
      const newEntry: Task = {
        id: updateData.id,
        title: e.target.value,
        status: updateData.status,
      };
      setUpdateData(newEntry);
    }
  };

  const updateTask = async () => {
    if (updateData) {
      const updatedObject = [...toDo].filter(
        (task) => task.id !== updateData.id
      );
      updatedObject.push(updateData);
      setToDo(updatedObject);
      setUpdateData(null);

      // Update the task list in Firestore
      const taskListRef = doc(db, "taskLists", user.uid);
      await updateDoc(taskListRef, { tasks: updatedObject });
    }
  };

  return (
    <div className="container App">
      <br></br>
      <h2>ToDolist</h2>
      <br></br>
      {/*Update task*/}
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

export default Home;

/*import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import {
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import useFirebaseConfig from "../Firebase/useFirebaseConfig";
import { collection, doc, getDocs, getDoc, setDoc } from "firebase/firestore";

function Home() {
  interface Task {
    id: number;
    title: string;
    status: boolean;
  }
  const { app, analytics, db } = useFirebaseConfig();
const [uid, setUid] = useState<string>("");


  const [users, setUsers] = useState<{ id: string }[]>([]);
  const [toDo, setToDo] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [updateData, setUpdateData] = useState<Task | null>(null);

  const addTask = () => {
    if (newTask) {
      const num = toDo.length + 1;
      const newEntry: Task = { id: num, title: newTask, status: false };
  
      // Get the user's ID
      const uid = firebase.auth().currentUser?.uid;
  
      // Update the document in the "users" collection with the new task
      db.collection("users").doc(uid).update({
        tasks: firebase.firestore.FieldValue.arrayUnion(newEntry),
      });
  
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
