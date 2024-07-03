import HenryCalvo from "../../assets/henrycalvo.svg";
import { UserComponent } from "./styles";

export default function UserCard() {
  return (
    <UserComponent>
    <section>
        {/* WIP: adicionar leitura de valores do objeto */}
      <div className="all-sector">
        <h3>satus</h3>
        <div className="header-sector">
          <img src={HenryCalvo} alt="" className="user-avatar"/>
        </div>
        <div className="p-sector">          
        </div>
        <h2>User name</h2>
        <p>role</p>    
      </div>
    </section>
  </UserComponent>
  );
}
