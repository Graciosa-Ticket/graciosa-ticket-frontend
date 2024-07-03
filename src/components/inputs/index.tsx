import { useState } from "react";
import "./styles";
import { InputLogin } from "./styles";
import eye from "../../assets/ph_eye.svg";
import { useAuth } from "../../hooks/auth";
import { useForm } from "react-hook-form";
import ButtonComponent from "../buttons";

interface login {
  email: string;
  password: string;
}

export default function Input() {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };

  const { signIn } = useAuth();

  const { handleSubmit } = useForm<login>();

  const onSubmit = handleSubmit(({ email, password }) => {
    signIn(email, password);
  });

  return (
    <InputLogin>
      <form onSubmit={onSubmit}>
        <div className="input-login">
          <p>Login</p>
          <input type="text" placeholder="Login" />
          <p>Senha</p>
          <div className="pass-div">
            <input type={show ? "text" : "password"} placeholder="Senha" />
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
