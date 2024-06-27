import { MenuHeaderHome } from "./styles";
import Logo from "../../assets/graciosa-logo 2.svg";

export default function MenuHeader() {
  return (
    <MenuHeaderHome>
      <header>
        <nav className="menu">
          <img src={Logo} alt="" />

          <ul>
            <li>
              <a href="">Inicio</a>
            </li>
            <li>
              <a href="">Setores</a>
            </li>
            <li>
              <a href="">Chamados</a>
            </li>
            <li>
              <a href="">Usuários</a>
            </li>
            <li>
              <a href="">Configurações</a>
            </li>
          </ul>
        </nav>
      </header>
    </MenuHeaderHome>
  );
}
