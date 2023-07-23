import dayjs from "dayjs";
import Task from "../components/Interfaces/Task";

const tasks: Task[] = [
  {
    documentId: "1",
    description: "Task 1 description",
    id: "task-1",
    title: "Task 1",
    date: "2023-07-01",
    time: "10:00 AM",
  },
  {
    documentId: "2",
    description: "Task 2 description",
    id: "task-2",
    title: "Task 2",
    date: "2023-07-02",
    time: "2:30 PM",
  },
  {
    documentId: "3",
    description: "Task 3 description",
    id: "task-3",
    title: "Task 3",
    date: "2023-07-02",
    time: "3:00 PM",
  },
  {
    documentId: "4",
    description: "Task 4 description",
    id: "task-4",
    title: "Task 4",
    date: "2023-07-03",
    time: "11:00 AM",
  },
];

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

test("should return tasks for a specific date", () => {
  const date = dayjs("2023-07-02").toDate();
  const result = getTasksForDate(date);
  expect(result).toEqual([
    {
      documentId: "2",
      description: "Task 2 description",
      id: "task-2",
      title: "Task 2",
      date: "2023-07-02",
      time: "2:30 PM",
    },
    {
      documentId: "3",
      description: "Task 3 description",
      id: "task-3",
      title: "Task 3",
      date: "2023-07-02",
      time: "3:00 PM",
    },
  ]);
});

test("should return an empty array for a date without tasks", () => {
  const date = dayjs("2023-07-04").toDate();
  const result = getTasksForDate(date);
  expect(result).toEqual([]);
});

describe("generateDays", () => {
  test("should generate an array of dates for the current month", () => {
    const monthStart = dayjs("2023-07-01").toDate();
    const monthEnd = dayjs("2023-07-31").toDate();
    const result = generateDays(monthStart, monthEnd);
    const expected = [
      dayjs("2023-07-01").toDate(),
      dayjs("2023-07-02").toDate(),
      dayjs("2023-07-03").toDate(),
      dayjs("2023-07-04").toDate(),
      dayjs("2023-07-05").toDate(),
      dayjs("2023-07-06").toDate(),
      dayjs("2023-07-07").toDate(),
      dayjs("2023-07-08").toDate(),
      dayjs("2023-07-09").toDate(),
      dayjs("2023-07-10").toDate(),
      dayjs("2023-07-11").toDate(),
      dayjs("2023-07-12").toDate(),
      dayjs("2023-07-13").toDate(),
      dayjs("2023-07-14").toDate(),
      dayjs("2023-07-15").toDate(),
      dayjs("2023-07-16").toDate(),
      dayjs("2023-07-17").toDate(),
      dayjs("2023-07-18").toDate(),
      dayjs("2023-07-19").toDate(),
      dayjs("2023-07-20").toDate(),
      dayjs("2023-07-21").toDate(),
      dayjs("2023-07-22").toDate(),
      dayjs("2023-07-23").toDate(),
      dayjs("2023-07-24").toDate(),
      dayjs("2023-07-25").toDate(),
      dayjs("2023-07-26").toDate(),
      dayjs("2023-07-27").toDate(),
      dayjs("2023-07-28").toDate(),
      dayjs("2023-07-29").toDate(),
      dayjs("2023-07-30").toDate(),
      dayjs("2023-07-31").toDate(),
    ];
    expect(result).toEqual(expected);
  });
});
