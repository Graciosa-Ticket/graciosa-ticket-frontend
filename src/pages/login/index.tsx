import { LoginContainer } from "./styles";
import Logo from "../../assets/graciosa-logo 2.svg";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks/auth";
import eye from "../../assets/ph_eye.svg";


interface login {
  code: string;
  password: string;
}


export default function LoginPage() {

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
    <LoginContainer>
      <div className="left-container">
        <h1>Gestão de chamados graciosa country club</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim.
        </p>
      </div>


      <div className="right-container">

        <div className="logo-container">
          <img src={Logo} />
          <h1>Bem vindo</h1>
          <p>ao sistema de chamados graciosa country club</p>
        </div>


        <div className="div-login-ib">
          <form onSubmit={onSubmit}>
            <div className="input-login">
              <input type="text" placeholder="Login" {...register("code")} />
                <div className="pass-div">
                  <input type={show ? "text" : "password"} placeholder="Senha" {...register("password")} />
                  <img src={eye} onClick={handleShow} className="eye-svg" />
                </div>
            </div>
          </form>
          <a href="/setor">Esqueci minha senha</a>
        </div>
      </div>
    </LoginContainer>
  );
}
