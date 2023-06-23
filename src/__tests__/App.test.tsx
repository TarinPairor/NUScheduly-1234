import { fireEvent, render, screen } from "@testing-library/react";
import App from "../App";
import "@testing-library/jest-dom/extend-expect";
import "firebase/auth";
import { getAuth, User, NextOrObserver } from "firebase/auth";

test("renders email input field", () => {
  render(<App />);
  const emailInput = screen.getByPlaceholderText("Email");
  expect(emailInput).toBeInTheDocument();
});

// Mock Firebase authentication and Firestore API functions
jest.mock("firebase/auth", () => ({
  __esModule: true,
  getAuth: jest.fn(() => ({
    signInWithEmailAndPassword: jest
      .fn()
      .mockResolvedValue({ user: { uid: "mock-uid" } }),
    signOut: jest.fn(() => Promise.resolve()),
    onAuthStateChanged: jest.fn(),
  })),
}));
jest.mock("firebase/firestore", () => ({
  __esModule: true,
  collection: jest.fn(),
  getDoc: jest.fn(),
  getDocs: jest.fn(),
  setDoc: jest.fn(),
  doc: jest.fn(),
  addDoc: jest.fn(),
}));

test("renders login form and performs authentication", async () => {
  render(<App />);

  // Check if the login form is rendered
  expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Log In" })).toBeInTheDocument();

  // Perform authentication by entering email and password and clicking the login button
  fireEvent.change(screen.getByPlaceholderText("Email"), {
    target: { value: "test@example.com" },
  });
  fireEvent.change(screen.getByPlaceholderText("Password"), {
    target: { value: "test123" },
  });
  fireEvent.click(screen.getByRole("button", { name: "Log In" }));

  // Wait for authentication and check if the Home component is rendered
  await screen.findByText("Welcome to the Home page");
  expect(screen.getByText("Welcome to the Home page")).toBeInTheDocument();
});

it("renders logged-in state and performs logout", async () => {
  render(<App />);

  // Simulate the logged-in state
  const authStateChangedCallback = jest.fn();
  const onAuthStateChangedMock = jest.spyOn(getAuth(), "onAuthStateChanged");
  onAuthStateChangedMock.mockImplementation(
    (callback: NextOrObserver<User | null> | ((user: User | null) => void)) => {
      if (typeof callback === "function") {
        callback({ uid: "mock-uid" } as User);
      } else if (callback && typeof callback.next === "function") {
        callback.next({ uid: "mock-uid" } as User);
      }
      return authStateChangedCallback;
    }
  );

  // Check if the logout button is rendered
  expect(screen.getByRole("button", { name: "Log out" })).toBeInTheDocument();

  // Perform logout by clicking the logout button
  fireEvent.click(screen.getByRole("button", { name: "Log out" }));

  // Wait for logout and check if the login form is rendered again
  await screen.findByPlaceholderText("Email");
  expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
  expect(screen.getByRole("button", { name: "Log In" })).toBeInTheDocument();
});
