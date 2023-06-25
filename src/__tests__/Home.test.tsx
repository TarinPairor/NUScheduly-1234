import { expect, test } from "@jest/globals";
//import useFirebaseConfig from "../components/Firebase/useFirebaseConfig";
//useFirebaseConfig();
//const db = getFirestore();
//const tasksRef = collection(db, `users/HdmmR2vQXmgdPX0uSdXHGuR93hG2/tasks`); //path

function extractDate(str: string): string {
  const date = str.substring(2, 10);
  return date;
}

function compareDates(date1: string, date2: string): boolean {
  return date1 >= date2;
}

test("extractDate should return the correct date", () => {
  const input = "2023-06-20T12:34:56.789Z";
  const expected = "23-06-20"; // Fill in the expected output

  const result = extractDate(input);

  expect(result).toBe(expected);
});

test("extractDate should return the correct date", () => {
  const input = "2024-05-14T17:00:00.000Z";
  const expected = "24-05-14"; // Fill in the expected output

  const result = extractDate(input);

  expect(result).toBe(expected);
});

test("extractDate should return the correct date", () => {
  const input = "2023-06-29T17:00:00.000Z";
  const expected = "23-06-29"; // Fill in the expected output

  const result = extractDate(input);

  expect(result).toBe(expected);
});

test("compareDates should return the correct boolean value", () => {
  const anotherDate = "2023-06-20T12:34:56.789Z".substring(0, 10);
  const currentDate = new Date().toISOString().substring(0, 10);
  const expected = true;
  const result = compareDates(currentDate, anotherDate);
  expect(result).toBe(expected);
});

test("compareDates should return the correct boolean value", () => {
  const anotherDate = "2100-06-20T12:34:56.789Z".substring(0, 10);
  const currentDate = new Date().toISOString().substring(0, 10);
  const expected = false;
  const result = compareDates(currentDate, anotherDate);
  expect(result).toBe(expected);
});

test("Sorts dates correctly", () => {
  const dateA = "2023-06-20";
  const dateB = "2023-06-21";
  const sortResult = (() => {
    const dateASplit = dateA.split("-");
    const dateBSplit = dateB.split("-");
    const numA = Number(dateASplit[0] + dateASplit[1] + dateASplit[2]);
    const numB = Number(dateBSplit[0] + dateBSplit[1] + dateBSplit[2]);
    return numA - numB;
  })();
  expect(sortResult).toBeLessThan(0);
});

test("Sorts dates correctly", () => {
  const dateA = "2023-06-21";
  const dateB = "2023-06-20";
  const sortResult = (() => {
    const dateASplit = dateA.split("-");
    const dateBSplit = dateB.split("-");
    const numA = Number(dateASplit[0] + dateASplit[1] + dateASplit[2]);
    const numB = Number(dateBSplit[0] + dateBSplit[1] + dateBSplit[2]);
    return numA - numB;
  })();
  expect(sortResult).toBeGreaterThan(0);
});

/*test("adds a new task when newTask and selectedDate are provided", async () => {
  // Mock the required functions and data
  const mockAddDoc = jest.fn(addDoc);
  const mockUpdateDoc = jest.fn(updateDoc);
  const mockReload = jest.spyOn(window.location, "reload");
  const mockNewTask = "Task Title";
  const mockSelectedDate = new Date("2023-06-21");

  // Render the component or trigger the addTask function in the desired test scenario
  // ...

  // Assert that addTask was called
  expect(mockAddDoc).toHaveBeenCalled();

  // Assert that the correct arguments were passed to addDoc
  expect(mockAddDoc).toHaveBeenCalledWith(
    tasksRef,
    expect.objectContaining({
      title: mockNewTask,
      date: mockSelectedDate.toISOString(),
    })
  );

  // Mock the document ID generated by addDoc
  const mockDocumentId = "mock-document-id";
  jest
    .spyOn(mockAddDoc.mock.results[0].value, "id", "get")
    .mockReturnValueOnce(mockDocumentId);

  // Assert that updateDoc was called with the correct arguments
  expect(mockUpdateDoc).toHaveBeenCalledWith(
    doc(tasksRef, mockDocumentId),
    expect.objectContaining({
      title: mockNewTask,
      date: mockSelectedDate.toISOString(),
      documentId: mockDocumentId,
    })
  );

  // Assert that setNewTask and setSelectedDate were called with the expected values
  // ...

  // Assert that window.location.reload was called
  expect(mockReload).toHaveBeenCalled();
});*/