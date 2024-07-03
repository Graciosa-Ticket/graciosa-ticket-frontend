import React, { useMemo, useState } from "react";
import MenuHeader from "../../components/menu";
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
  
  },
  {
    email: "teste@teste.com",
    id: "1",
    name: "Teste da silva 2",
    type: "collaborator",
  
  },
  {
    email: "teste@teste.com",
    id: "1",
    name: "Teste da silva 3",
    type: "supervisor",
  
  },
  {
    email: "teste@teste.com",
    id: "1",
    name: "Teste da silva 4",
    type: "admin",
  
  },
]




export default function Sector() {
  const [selectedBtn, setSelectedBtn] = useState<UserModel["type"]>("admin");

  const handleBtnClick = (type: UserModel["type"]) => {
    setSelectedBtn(type);
  };


const userList = useMemo(() => {

  return fakeUserData.filter(user => user.type === selectedBtn)
}, [selectedBtn])


  return (
    <UserContainer>
        <div className="user-header">
          <h1>Usuários</h1>

          <ButtonComponent buttonStyles="text">+</ButtonComponent>
          </div>

          <div className="sector-selector">
            <ButtonComponent
              // className={selectedBtn === "admin" ? "btn selected" : "btn"}
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
              <UserCard data={e} key={i}/>

            ))}
           
          </div>
        
    </UserContainer>
  );
}
