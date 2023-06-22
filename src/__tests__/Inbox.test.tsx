import { render, screen } from "@testing-library/react";
import Inbox from "../components/pages/Inbox";
//import firebase from "firebase/app";
import "firebase/firestore";
//import { initializeTestApp, loadFirestoreRules } from "@firebase/testing";
//import fs from "fs";

//const projectId = "fir-test1-d5129";

/*const app = initializeTestApp({
  projectId,
});*/

// Explicitly import the firestore module
//const firestore = app.firestore();

//const firestoreInstance = firestore(app);

// Load the Firestore security rules
/*beforeAll(async () => {
  const rules = fs.readFileSync("path/to/firestore.rules", "utf8"); // Replace with the path to your Firestore security rules
  await loadFirestoreRules({ projectId, rules });
});

// Cleanup resources after all tests are complete
afterAll(async () => {
  await app.delete();
});*/

test("displays 'No tasks found.' when there are no tasks", () => {
  render(<Inbox userId="sampleUserId" />);

  const noTasksMessage = screen.getByText("No tasks found.");
  expect(noTasksMessage).toBeInTheDocument();
});

/*test("renders tasks correctly", () => {
  const mockTasks = [
    {
      id: "task1",
      title: "Task 1",
      status: true,
      date: "2023-06-21",
    },
    {
      id: "task2",
      title: "Task 2",
      status: false,
      date: "2023-06-22",
    },
  ];

  render(<Inbox userId="sampleUserId" />);

  // Mock the snapshot data
  const snapshotMock = jest.fn();
  snapshotMock.mockReturnValueOnce(
    mockTasks.map((task) => ({ data: () => task }))
  );

  // Mock the onSnapshot function
  jest
    .spyOn(firestoreInstance, "collection")
    .mockReturnValueOnce({
      onSnapshot: jest.fn().mockImplementation((callback) => {
        callback({ docs: snapshotMock() });
        return jest.fn(); // Mock unsubscribe function
      }),
    });

  // Check if the tasks are rendered correctly
  const taskElements = screen.getAllByTestId("task");
  expect(taskElements).toHaveLength(mockTasks.length);
  expect(screen.getByText("Task 1 2023-06-21")).toBeInTheDocument();
  expect(screen.getByText("Task 2 2023-06-22")).toBeInTheDocument();
});*/
