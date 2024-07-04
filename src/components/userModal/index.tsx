import React from "react";
import { UserModel } from "../../models/user";
import { UserComponent } from "./styles";
import HenryCalvo from "../../assets/henrycalvo.svg"; 
import { FaRegBuilding, FaIndustry, FaClipboard } from "react-icons/fa";

interface userModalProps {
  data:UserModel;
  onClose:()=>void;
}

export default function UserModal({data, onClose}:userModalProps){



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
  
  return (
    <UserComponent>
      <div className="user-header">
        <button onClick={onClose}>X</button>        
        <div>Name: {data.name}</div>
        <h3>Status: {data.status ? "ativo" : "inativo"}</h3>
      </div>
      <div className="img-sector">
        <img src={HenryCalvo} alt="" className="user-avatar" />
      </div>
      <h1>informacoes Pessoais</h1>
      <div className="user-info-area">
        <div className="user-info-box"></div>
          <p>Codigo: {data.code}</p>
          <p>Nascimento: {data.birthdate}</p>
          <p>Cep: {data.postalCode}</p>
        <div className="user-info-box">
          <p>Nome: {data.name}</p>
          <p>Endereço: {data.address}</p>
          <p>Telefone/Ramal: {data.phone}</p>
      </div>
      <div className="function-area">
        <div>
          <p>Função</p>
          
        </div>

      </div>
      <div className="footer-buttons"></div>
        

      </div>
      
    </UserComponent>
  );
}
  