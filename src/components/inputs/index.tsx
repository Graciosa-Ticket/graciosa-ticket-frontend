import { useState } from "react";
import "./styles";
import { InputLogin } from "./styles";
import eye from "../../assets/ph_eye.svg";

export default function Input() {
  const [show, setShow] = useState(false);
  const handleShow = () => {
    setShow(!show);
  };
  return (
    <InputLogin>
      <section>
        <div className="input-login">
          <p>Login</p>
          <input type="text" placeholder="Login" />
          <p>Senha</p>
          <div className="pass-div">
            <input type={show ? "text" : "password"} placeholder="Senha" />
            <img src={eye} onClick={handleShow} className="eye-svg" />
          </div>
        </div>
      </section>
    </InputLogin>
  );
}
