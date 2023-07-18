import { ReactNode, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { styled } from "@mui/system";

interface Props {
  children: ReactNode;
  onClose: () => void;
  severity?: "error" | "warning" | "info" | "success"; // Made the severity prop optional
}

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

export default function BasicAlerts({
  children,
  onClose,
  severity = "error", // Set the default value as "error"
}: Props) {
  useEffect(() => {
    const timeout = setTimeout(onClose, 700);

    return () => clearTimeout(timeout);
  }, [onClose]);

  return (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <AnimatedAlert variant="outlined" severity={severity} onClose={onClose}>
        {children}
      </AnimatedAlert>
    </Stack>
  );
}
