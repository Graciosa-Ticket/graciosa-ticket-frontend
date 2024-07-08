import { useState, useMemo } from "react";
import ButtonComponent from "../../components/buttons";
import { UserModel } from "../../models/user";
import { UserContainer } from "./styles";
import Modal from "../../components/modal";
import { fakeUserData } from "./fakeData";
import CreateUserModal from "./components/createUserModal";
import UserCard from "./components/userCard";
import PageHeaderComponent from "../../components/pagesHeader";




export default function User() {
  const [selectedBtn, setSelectedBtn] = useState<UserModel["role"]>("Administrator");

  const handleBtnClick = (role: UserModel["role"]) => {
    setSelectedBtn(role);
  };

  const userList = useMemo(() => {
    return fakeUserData.filter(user => user.role === selectedBtn);
  }, [selectedBtn]);

  
const [open, setOpen] = useState(false)

  return (

    <><Modal open={open} onOpenChange={() => setOpen(!open)}>
      <CreateUserModal onClose={() => setOpen(false)} />
    </Modal><UserContainer>

        <div className="user-header">
          <h1>Usuários</h1>
          <PageHeaderComponent.button title="Criar novo Usuario" className="btn" onClick={() => setOpen(true)}></PageHeaderComponent.button>
        </div>

        <div className="sector-selector">
          <ButtonComponent
            buttonStyles={selectedBtn === "Administrator" ? "primary" : "text"}
            onClick={() => handleBtnClick("Administrator")}
            className="seletor"
          >
            Administradores
          </ButtonComponent>
          <ButtonComponent
            buttonStyles={selectedBtn === "Supervisor" ? "primary" : "text"}
            onClick={() => handleBtnClick("Supervisor")}
            className="seletor"
          >
            Supervisores
          </ButtonComponent>
          <ButtonComponent
            buttonStyles={selectedBtn === "Collaborator" ? "primary" : "text"}
            onClick={() => handleBtnClick("Collaborator")}
            className="seletor"
          >
            Colaboradores
          </ButtonComponent>
        </div>

        <div className="user-cards">
          {userList.map((e, i) => (
            <UserCard data={e} key={i} />
          ))}
        </div>
      </UserContainer></>
  );
}
