import { useState } from "react";
import "./styles";
import { InputLogin } from "./styles";
import eye from "../../assets/ph_eye.svg";
import { useAuth } from "../../hooks/auth";
import { useForm } from "react-hook-form";
import ButtonComponent from "../buttons";

interface login {
  code: string;
  password: string;
}

export default function Input() {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };

  const { signIn } = useAuth();

  const { handleSubmit, register } = useForm<login>();


  const onSubmit = handleSubmit(({ code, password }) => {
    signIn(code, password);
  });

  return (
    <InputLogin>
      <form onSubmit={onSubmit}>
        <div className="input-login">
          <input type="text" placeholder="Login" {...register("code")} />
          <div className="pass-div">
            <input type={show ? "text" : "password"} placeholder="Senha" {...register("password")} />
            <img src={eye} onClick={handleShow} className="eye-svg" />
          </div>
        </div>
        <ButtonComponent type="submit">Enviar</ButtonComponent>
        <ButtonComponent type="button" buttonStyles="error">
          teste
        </ButtonComponent>
      </form>
    </InputLogin>
  );
}
