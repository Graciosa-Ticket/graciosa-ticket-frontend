import { ButtonHTMLAttributes } from "react";
import { ButtonsLoginContainer } from "./styles";

export type buttonStyles = "primary" | "error";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  //tipos personalizados
  buttonStyles?: buttonStyles;
}

const ButtonComponent = ({
  buttonStyles = "primary",
  ...props
}: ButtonProps) => {
  return (
    <ButtonsLoginContainer $buttonStyles={buttonStyles}>
      {props.children}
    </ButtonsLoginContainer>
  );
};

export default ButtonComponent;
