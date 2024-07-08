import { useState, useMemo } from "react";
import ButtonComponent from "../../components/buttons";
import { UserModel } from "../../models/user";
import { UserContainer } from "./styles";
import Modal from "../../components/modal";
import { AiOutlinePlus } from "react-icons/ai";
import { fakeUserData } from "./fakeData";
import CreateUserModal from "./components/createUserModal";
import UserCard from "./components/userCard";
import PageHeaderComponent from "../../components/pagesHeader";




export default function User() {
  const [selectedBtn, setSelectedBtn] = useState<UserModel["type"]>("admin");

  const handleBtnClick = (type: UserModel["type"]) => {
    setSelectedBtn(type);
  };

  const userList = useMemo(() => {
    return fakeUserData.filter(user => user.type === selectedBtn);
  }, [selectedBtn]);

  
const [open, setOpen] = useState(false)

  return (

    <><Modal open={open} onOpenChange={() => setOpen(!open)}>
      <CreateUserModal onClose={() => setOpen(false)} />
    </Modal><UserContainer>

        <div className="user-header">
          <h1>Usuários</h1>
          <PageHeaderComponent.button buttonStyles="add" title="Criar novo Usuario" onClick={() => setOpen(true)}><AiOutlinePlus /></PageHeaderComponent.button>

        </div>

        <div className="sector-selector">
          <ButtonComponent
            buttonStyles={selectedBtn === "admin" ? "primary" : "text"}
            onClick={() => handleBtnClick("admin")}
            className="seletor"
          >
            Administradores
          </ButtonComponent>
          <ButtonComponent
            buttonStyles={selectedBtn === "supervisor" ? "primary" : "text"}
            onClick={() => handleBtnClick("supervisor")}
            className="seletor"
          >
            Supervisores
          </ButtonComponent>
          <ButtonComponent
            buttonStyles={selectedBtn === "collaborator" ? "primary" : "text"}
            onClick={() => handleBtnClick("collaborator")}
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
