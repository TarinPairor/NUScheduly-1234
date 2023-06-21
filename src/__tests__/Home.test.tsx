import { expect, test } from "@jest/globals";
import { render } from "@testing-library/react";
import Home from "../components/pages/Home";

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

test("as", () => {
  const userId = "HdmmR2vQXmgdPX0uSdXHGuR93hG2";
  render(<Home userId={userId} />);
});
