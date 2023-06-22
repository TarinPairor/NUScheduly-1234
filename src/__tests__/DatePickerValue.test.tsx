import { render } from "@testing-library/react";
import { test } from "@jest/globals";
import "@testing-library/jest-dom/extend-expect";
import DatePickerValue from "../components/DatePickerValue";

test("renders DatePickerValue without errors", () => {
  render(<DatePickerValue />);
});

/*test("displays the provided value correctly", () => {
  const value = new Date(2023, 5, 21); // Create a valid Date object
  render(<DatePickerValue value={value} />);

  // Add assertions to check if the value is displayed correctly
});*/

/*test("triggers onChange callback when a new date is selected", () => {
  const onChangeMock = jest.fn();
  render(<DatePickerValue onChange={onChangeMock} />);

  const datePicker = screen.getByRole("textbox"); // Assuming the DatePicker component renders a textbox element

  // Simulate selecting a new date using the DatePicker component
  fireEvent.change(datePicker, { target: { value: "2023-06-21" } });

  //expect(onChangeMock).toHaveBeenCalledTimes(1);
  expect(onChangeMock).toHaveBeenCalledWith(new Date("2023-06-21"));
});*/
