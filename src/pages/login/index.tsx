import Button from "../../components/buttons";
import Input from "../../components/inputs";
import { LoginContainer } from "./styles";
import Logo from "../../assets/graciosa-logo 2.svg";

export default function Login() {
  return (
    <LoginContainer>
      <div className="login-left">
        <h1>Gestão de chamados graciosa country club</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim.
        </p>
      </div>
      <div className="login-right">
        <div className="top-right">
          <img src={Logo} />
          <h1>Bem vindo</h1>
          <p>Lorem Ipsum dolor asimet</p>
        </div>
        <div className="div-login-ib">
          <Input />
          <a href="/setor">Esqueci minha senha</a>
        </div>
      </div>
    </LoginContainer>
  );
}
