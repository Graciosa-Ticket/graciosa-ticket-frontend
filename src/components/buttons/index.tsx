import { ButtonHTMLAttributes } from "react";
import { ButtonsLoginContainer } from "./styles";

export type buttonStyles = "primary" | "error" | "text" | "add" | "delete" | "edit";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  //tipos personalizados
  buttonStyles?: buttonStyles;
}

const ButtonComponent = ({
  buttonStyles = "primary",
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <ButtonsLoginContainer $buttonStyles={buttonStyles} {...props}>
      {props.children}
    </ButtonsLoginContainer>
  );
};

export default ButtonComponent;
