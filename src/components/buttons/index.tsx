import { ButtonHTMLAttributes } from "react";
import { ButtonsLoginContainer } from "./styles";
import { AiOutlineLoading } from "react-icons/ai";

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

      {props.isLoading && (
        <div className="loading-button">
          <AiOutlineLoading className="load-icon"/>
        </div>
      )}
    </ButtonsLoginContainer>
  );
};

export default ButtonComponent;
