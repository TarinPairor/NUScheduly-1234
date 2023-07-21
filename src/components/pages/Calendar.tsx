import { useState, useEffect } from "react";
import "./Calendar.css";
import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import Task from "../Interfaces/Task";
import dayjs from "dayjs";
import "dayjs/locale/en";

interface MonthlyCalendarProps {
  userId: string;
}

function Calendar({ userId }: MonthlyCalendarProps) {
  dayjs.locale("en");
  const [tasks, setTasks] = useState<Task[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
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
  }, [tasksRef, userId]);

  // Function to get tasks assigned to a specific date
  const getTasksForDate = (date: Date): Task[] => {
    return tasks.filter(
      (task) => dayjs(task.date).isSame(date, "day") && task.title !== ""
    );
  };

  // Function to generate the days for the current month
  const generateDays = (monthStart: Date, monthEnd: Date): Date[] => {
    const days: Date[] = [];
    let currentDate = dayjs(monthStart).startOf("day");

    while (
      currentDate.isSame(monthEnd, "day") ||
      currentDate.isBefore(monthEnd, "day")
    ) {
      days.push(currentDate.toDate());
      currentDate = currentDate.add(1, "day");
    }

    return days;
  };

  // Function to handle the click on a date
  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
  };

  // Get the start and end date of the current month
  const today = dayjs().startOf("day");
  const monthStart = today.startOf("month");
  const monthEnd = today.endOf("month");

  // Generate days for the current month
  const days = generateDays(monthStart.toDate(), monthEnd.toDate());

  return (
    <div className="monthly-calendar-container">
      {/* ... (rest of the code) */}

      <div className="calendar-grid">
        {days.map((date) => {
          const tasksForDate = getTasksForDate(date);

          return (
            <div
              key={date.toISOString()} // Convert toISOString() to toDateString()
              className={`calendar-cell ${
                today.isSame(date, "day") ? "current-day" : ""
              }`}
              onClick={() => handleDateClick(date)} // Remove .toDate()
            >
              <div className="date-container">
                <span className="date-text">{dayjs(date).format("D")}</span>
              </div>
              <div className="task-container">
                {tasksForDate.map((task) => (
                  <div key={task.id} className="task-item">
                    <span className="task-title">{task.title}</span>
                    <span className="task-time">
                      {dayjs(task.date).format("HH:mm")}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {selectedDate && (
        <div className="selected-date-info">
          <h3>{dayjs(selectedDate).format("dddd, MMMM D, YYYY")}</h3>
          <div className="selected-date-tasks">
            {getTasksForDate(selectedDate).map((task) => (
              <div key={task.id} className="task-item">
                <span className="task-title">{task.title}</span>
                <br />
                <span className="task-time">
                  {dayjs(task.date).format("HH:mm")}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Calendar;
