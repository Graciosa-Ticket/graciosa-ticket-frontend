import { ButtonHTMLAttributes } from "react";
import { ButtonsLoginContainer } from "./styles";

export type buttonStyles =
  | "primary"
  | "error"
  | "text"
  | "add"
  | "delete"
  | "edit"
  | "confirm";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  //tipos personalizados
  buttonStyles?: buttonStyles;
  isLoading?: boolean;
}

const ButtonComponent = ({
  buttonStyles = "primary",
  type = "button",
  ...props
}: ButtonProps) => {
  return (
    <ButtonsLoginContainer $buttonStyles={buttonStyles} {...{ type, ...props }}>
      {props.children}

      {props.isLoading && "Carregando..."}
    </ButtonsLoginContainer>
  );
};

export default ButtonComponent;
