import { useMemo, useState } from "react";
import UserCard from "../../components/userCard";
import { UserContainer } from "./styles";
import { UserModel } from "../../models/user";
import ButtonComponent from "../../components/buttons";

const fakeUserData: UserModel[] = [
  {
    email: "teste@teste.com",
    id: "1",
    name: "Teste da silva",
    type: "admin",
    status: true,
    sector: "1",
    code: 1000,
    birthdate: "10/10/2010",
    postalCode: "88888-888",
    phone: "41 3333-3333",
    address: "BR,PR,Curitiba"
  },
  {
    email: "teste@teste.com",
    id: "2",
    name: "Teste da silva 2",
    type: "collaborator",
    status: true,
    sector: "administrativo",
    code: 1000,
    birthdate: "10/10/2010",
    postalCode: "88888-888",
    phone: "41 3333-3333",
    address: "BR,PR,Curitiba"  
  },
  {
    email: "teste@teste.com",
    id: "3",
    name: "Teste da manutenção",
    type: "collaborator",
    status: true,
    sector: "manutenção",
    code: 1000,
    birthdate: "10/10/2010",
    postalCode: "88888-888",
    phone: "41 3333-3333",
    address: "BR,PR,Curitiba"  
  },
  {
    email: "teste@teste.com",
    id: "4",
    name: "Teste da produção",
    type: "collaborator",
    status: true,
    sector: "produção",
    code: 1000,
    birthdate: "10/10/2010",
    postalCode: "88888-888",
    phone: "41 3333-3333",
    address: "BR,PR,Curitiba"
  },
  {
    email: "teste@teste.com",
    id: "5",
    name: "Teste da silva 3",
    type: "supervisor",
    status: true,
    sector: "produção",
    code: 1000,
    birthdate: "10/10/2010",
    postalCode: "88888-888",
    phone: "41 3333-3333",
    address: "BR,PR,Curitiba"
  },
  {
    email: "teste@teste.com",
    id: "6",
    name: "Teste da silva 4",
    type: "admin",
    status: false,
    sector: "3",
    code: 1000,
    birthdate: "10/10/2010",
    postalCode: "88888-888",
    phone: "41 3333-3333",
    address: "BR,PR,Curitiba"
  },
];


export default function User() {
  const [selectedBtn, setSelectedBtn] = useState<UserModel["type"]>("admin");

  const handleBtnClick = (type: UserModel["type"]) => {
    setSelectedBtn(type);
  };

  const userList = useMemo(() => {
    return fakeUserData.filter(user => user.type === selectedBtn);
  }, [selectedBtn]);

  return (
    <UserContainer>
      <div className="user-header">
        <h1>Usuários</h1>
        <ButtonComponent buttonStyles="add" title="Criar novo Usuario">+</ButtonComponent>
      </div>

      <div className="sector-selector">
        <ButtonComponent
          buttonStyles={selectedBtn === "admin" ? "primary" : "text"}
          onClick={() => handleBtnClick("admin")}
        >
          Administradores
        </ButtonComponent>
        <ButtonComponent
          buttonStyles={selectedBtn === "supervisor" ? "primary" : "text"}
          onClick={() => handleBtnClick("supervisor")}
        >
          Supervisores
        </ButtonComponent>
        <ButtonComponent
          buttonStyles={selectedBtn === "collaborator" ? "primary" : "text"}
          onClick={() => handleBtnClick("collaborator")}
        >
          Colaboradores
        </ButtonComponent>
      </div>

      <div className="user-cards">
        {userList.map((e, i) => (
          <UserCard data={e} key={i} />
        ))}
      </div>
    </UserContainer>
  );
}
