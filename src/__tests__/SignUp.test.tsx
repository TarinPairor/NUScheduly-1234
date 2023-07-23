import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Auth, getAuth } from "firebase/auth";
import "@testing-library/jest-dom/extend-expect";
import SignUp from "../components/pages/Signup";

jest.mock("firebase/auth", () => {
  return {
    getAuth: jest.fn(),
    createUserWithEmailAndPassword: jest.fn(),
  };
});

// Helper function to simulate typing into the email and password inputs
const typeIntoInputs = async (emailValue: string, passwordValue: string) => {
  const emailInput: HTMLInputElement = screen.getByLabelText(
    "Email Address"
  ) as HTMLInputElement;
  const passwordInput: HTMLInputElement = screen.getByLabelText(
    "Password"
  ) as HTMLInputElement;

  fireEvent.change(emailInput, { target: { value: emailValue } });
  fireEvent.change(passwordInput, { target: { value: passwordValue } });
};

test("renders Sign Up component", () => {
  render(<SignUp setIsSignUp={jest.fn()} />);
});

test("email input element renders and updates correctly", () => {
  render(<SignUp setIsSignUp={jest.fn()} />);
  const emailInput: HTMLInputElement = screen.getByLabelText(
    "Email Address"
  ) as HTMLInputElement;
  fireEvent.change(emailInput, { target: { value: "test@example.com" } });
  expect(emailInput.value).toBe("test@example.com");
});

test("password input element renders and updates correctly", () => {
  render(<SignUp setIsSignUp={jest.fn()} />);
  const passwordInput: HTMLInputElement = screen.getByLabelText(
    "Password"
  ) as HTMLInputElement;
  fireEvent.change(passwordInput, { target: { value: "test1234" } });
  expect(passwordInput.value).toBe("test1234");
});

// Test case 4: Test whether the "Sign Up" button is rendered and functioning correctly
test("Sign Up button renders and triggers form submission", async () => {
  // Mock createUserWithEmailAndPassword to resolve with a dummy user
  const createUserWithEmailAndPasswordMock = jest.fn().mockResolvedValue({
    user: {
      uid: "testUid",
    },
  });

  // Mock getAuth and set its return value to an object containing the mock function
  const getAuthMock = getAuth as jest.MockedFunction<typeof getAuth>; // Cast getAuth to the mocked function type
  getAuthMock.mockReturnValue({
    createUserWithEmailAndPassword: createUserWithEmailAndPasswordMock,
  } as unknown as Auth); // Cast the return value to Auth type

  // Render the component
  render(<SignUp setIsSignUp={jest.fn()} />);

  // Type valid email and password into the input fields
  await typeIntoInputs("test@example.com", "test1234");

  // Click the "Sign Up" button
  const signUpButton = screen.getByRole("button", { name: "Sign Up" });
  fireEvent.click(signUpButton);

  // Wait for the createUserWithEmailAndPasswordMock to be called
  await waitFor(() =>
    expect(createUserWithEmailAndPasswordMock).toHaveBeenCalled()
  );

  // Assert that the createUserWithEmailAndPasswordMock was called with the correct arguments
  expect(createUserWithEmailAndPasswordMock).toHaveBeenCalledWith(
    "test@example.com",
    "test1234"
  );
});
