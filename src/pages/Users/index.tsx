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
    setor: "1"
  },
  {
    email: "teste@teste.com",
    id: "1",
    name: "Teste da silva 2",
    type: "collaborator",
    status: true,
    setor: "administrativo"

  },
  {
    email: "teste@teste.com",
    id: "1",
    name: "Teste da manutenção",
    type: "collaborator",
    status: true,
    setor: "manutenção"

  },
  {
    email: "teste@teste.com",
    id: "1",
    name: "Teste da produção",
    type: "collaborator",
    status: true,
    setor: "produção"

  },
  {
    email: "teste@teste.com",
    id: "1",
    name: "Teste da silva 3",
    type: "supervisor",
    status: true,
    setor: "produção"
  },
  {
    email: "teste@teste.com",
    id: "1",
    name: "Teste da silva 4",
    type: "admin",
    status: false,
    setor: "3"
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
        <ButtonComponent buttonStyles="add">+</ButtonComponent>
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
