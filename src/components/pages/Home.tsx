import React, { useState } from "react";
//import "bootstrap/dist/css/bootstrap.min.css";
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

  const markDone = (id: number) => {
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
