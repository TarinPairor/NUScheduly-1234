import { ReactNode } from "react";
import { Link } from "react-router-dom";
//import "./Button.css";

type ButtonProps = {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  buttonStyle?: "btn--primary" | "btn--outline";
  buttonSize?: "btn--medium" | "btn--large";
};

const STYLES: string[] = ["btn--primary", "btn--outline"];
const SIZES: string[] = ["btn--medium", "btn--large"];

function Button({
  children,
  type = "button",
  onClick,
  buttonStyle = "btn--primary",
  buttonSize = "btn--medium",
}: ButtonProps) {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  return (
    <Link to="#">
      <button
        className={`btn ${checkButtonStyle} ${checkButtonSize}`}
        onClick={onClick}
        type={type}
      >
        {children}
      </button>
    </Link>
  );
}

export default Button;
