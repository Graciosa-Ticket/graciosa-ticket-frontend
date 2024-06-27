import { Link } from "react-router-dom";
import "./styles";
import { ButtonsLoginContainer } from "./styles";

export default function Button() {
  return (
    <ButtonsLoginContainer>
      <section>
        <div className="btn-login">
          <button className="btn-2">Entrar</button>
          <Link to="/home">Home</Link>
        </div>
      </section>
    </ButtonsLoginContainer>
  );
}
