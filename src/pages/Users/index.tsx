import { useState, useMemo } from "react";
import ButtonComponent from "../../components/buttons";
import { UserModel } from "../../models/user";
import { UserContainer } from "./styles";
import Modal from "../../components/modal";
import PageHeaderComponent from "../../components/pagesHeader";
import CreateUserModal from "./components/createUserModal";
import UserCard from "./components/userCard";

const fakeUserData: UserModel[] = [
  {
    email: "teste@teste.com",
    id: "1",
    name: "Teste da silva",
    role: "Administrator",
    status: true,
    code: "1000",
    birth_date: "10/10/2010",
    address: "Rua jose carlos",
    cep: "00000-22",
    phone_number: "41 3333-3333",
  },
];

export default function User() {
  const [selectedBtn, setSelectedBtn] =
    useState<UserModel["role"]>("Administrator");

  const handleBtnClick = (role: UserModel["role"]) => {
    setSelectedBtn(role);
  };

  const userList = useMemo(() => {
    return fakeUserData.filter((user) => user.role === selectedBtn);
  }, [selectedBtn]);

  const [open, setOpen] = useState(false);

  return (
    <>
      <Modal open={open} onOpenChange={() => setOpen(!open)}>
        <CreateUserModal onClose={() => setOpen(false)} />
      </Modal>
      <UserContainer>
        <PageHeaderComponent.container>
          <PageHeaderComponent.title>Usuários</PageHeaderComponent.title>
          <PageHeaderComponent.button onClick={() => console.log("aaa")} />
        </PageHeaderComponent.container>

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
      </UserContainer>
    </>
  );
}
