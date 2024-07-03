import HenryCalvo from "../../assets/henrycalvo.svg";
import { UserModel } from "../../models/user";
import { UserComponent } from "./styles";


interface userCardProps {
  data: UserModel;
}

export default function UserCard({ data }: userCardProps) {
  return (
    <UserComponent>
        {/* WIP: adicionar leitura de valores do objeto */}
        <h3>satus {data.status ? "ativo" :"inativo"} </h3>
        <div className="header-sector">
          <img src={HenryCalvo} alt="" className="user-avatar"/>
        </div>
        <div className="p-sector">          
        </div>
        <h2>{data.name}</h2>
        <p>{data.type}</p>    
  </UserComponent>
  );
}
