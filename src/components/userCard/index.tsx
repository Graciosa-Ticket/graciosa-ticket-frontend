import React from 'react';
import { FaRegBuilding, FaIndustry, FaClipboard } from 'react-icons/fa'; 
import HenryCalvo from "../../assets/henrycalvo.svg"; 
import { UserModel } from "../../models/user";
import { UserComponent } from "./styles";

interface UserCardProps {
  data: UserModel;
}

const UserCard: React.FC<UserCardProps> = ({ data }) => {
  // Função para renderizar o ícone do setor com base no nome do setor
  const renderSectorIcon = (setor: string) => {
    switch (setor.toLowerCase()) {
      case 'administrativo':
        return <FaRegBuilding className="sector-icon" />;
      case 'manutenção':
        return <FaIndustry className="sector-icon" />;
      case 'produção':
        return <FaClipboard className="sector-icon" />;
      default:
        return null;
    }
  };
  if (data.type === 'admin') {
    return (
      <UserComponent>
        <div className="h3-container">
          <h3>{data.status ? "ativo" : "inativo"}</h3>
          <div className={`status-ball ${data.status ? 'active' : 'inactive'}`} />
        </div>
        <div className="header-sector">
          <img src={HenryCalvo} alt="" className="user-avatar" />
        </div>
        <div className="text-container">
          <h2>{data.name}</h2>
          <p>{data.type}</p>
        </div>
      </UserComponent>
    );
  }

  return (
    <UserComponent>
      <div className="h3-container">
        <h3>{data.status ? "ativo" : "inativo"}</h3>
        <div className={`status-ball ${data.status ? 'active' : 'inactive'}`} />
      </div>
      <div className="header-sector">
        <img src={HenryCalvo} alt="" className="user-avatar" />
      </div>
      <div className="text-container">
        <h2>{data.name}</h2>
        <p>{data.type}</p>
      </div>
      <div className="sector-container">
        {renderSectorIcon(data.setor)}
        <div className="p-sector">
          <h2>Setor</h2>
          <p className="sector-text">{data.setor}</p>
        </div>
      </div>
    </UserComponent>
  );
};

export default UserCard;