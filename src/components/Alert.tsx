import { ReactNode, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";

// Interface to define the props for the BasicAlerts component
interface Props {
  children: ReactNode; // ReactNode type allows any valid JSX to be passed as children
  onClose: () => void; // Function to be called when the alert is closed
  severity?: "error" | "warning" | "info" | "success"; // Optional prop to specify the severity of the alert, default is "error"
}

// Styled component using the MUI's styled function to add custom animation
const AnimatedAlert = styled(Alert)`
  animation: fadeOut 5s ease-in-out forwards;

  @keyframes fadeOut {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
`;

// BasicAlerts component is a functional component that displays an animated alert
export default function BasicAlerts({
  children,
  onClose,
  severity = "error", // Set the default value of severity as "error" if not provided
}: Props) {
  // useEffect hook to set a timer for auto-closing the alert after 2000ms (2 seconds)
  useEffect(() => {
    const timeout = setTimeout(onClose, 2000);

    // Return a cleanup function to clear the timeout when the component is unmounted
    return () => clearTimeout(timeout);
  }, [onClose, children]);

  // The component renders an Alert from MUI inside a Stack to apply spacing
  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <AnimatedAlert variant="outlined" severity={severity} onClose={onClose}>
        {children}
      </AnimatedAlert>
    </Stack>
  );
}
