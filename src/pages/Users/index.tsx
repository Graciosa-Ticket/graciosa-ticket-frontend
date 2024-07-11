import { useState, useMemo } from "react";
import ButtonComponent from "../../components/buttons";
import { UserModel } from "../../models/user";
import { UserContainer } from "./styles";
import Modal from "../../components/modal";
import PageHeaderComponent from "../../components/pagesHeader";
import CreateUserModal from "./components/createUserModal";
import UserCard from "./components/userCard";
import { useFetch } from "../../services/hooks/getQuery";
import NotFoundComponent from "../../components/notFound";

export default function User() {

  const [dataSource, setDataSource] = useState<UserModel[]>([]);

  const { isLoading, isFetching } = useFetch<UserModel[]>(
    "/users",
    ["users"],
    {
      onSuccess: (data) => {
        console.log(data);
        setDataSource(data);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  const isLoadingFecth = isLoading || isFetching;

  const [selectedBtn, setSelectedBtn] = useState<UserModel["role"]>("Administrator");

  const handleBtnClick = (role: UserModel["role"]) => {
    setSelectedBtn(role);
  };

  const [open, setOpen] = useState(false);

  const userlist = useMemo(() => {
    if (dataSource.length) {
      return dataSource.filter((user) => user.role === selectedBtn);  
    }
    return [];
  }, [dataSource, selectedBtn]);

  return (
    <>
      <Modal open={open} onOpenChange={() => setOpen(!open)}>
        <CreateUserModal onClose={() => setOpen(false)} />
      </Modal>

      <UserContainer>
        <PageHeaderComponent.container>
          <PageHeaderComponent.title>Usuários</PageHeaderComponent.title>
          <PageHeaderComponent.button className="btn" title="Cadastrar Novo Usuario" onClick={() => setOpen(true)} />
        </PageHeaderComponent.container>

        <div className="select-buttons-area">
          <ButtonComponent
            buttonStyles={selectedBtn === "Administrator" ? "primary" : "text"}
            onClick={() => handleBtnClick("Administrator")}
            className="select-button"
          >
            Administradores
          </ButtonComponent>
          <ButtonComponent
            buttonStyles={selectedBtn === "Supervisor" ? "primary" : "text"}
            onClick={() => handleBtnClick("Supervisor")}
            className="select-button"
          >
            Supervisores
          </ButtonComponent>
          <ButtonComponent
            buttonStyles={selectedBtn === "Collaborator" ? "primary" : "text"}
            onClick={() => handleBtnClick("Collaborator")}
            className="select-button"
          >
            Colaboradores
          </ButtonComponent>
        </div>

        <div className="user-cards">
          {!dataSource.length && !isLoadingFecth ? (
            <NotFoundComponent />
          ) : isLoadingFecth ? (
            <p>Carregando...</p>
          ) : (
            userlist.map((user, index) => (
              <UserCard data={user} key={index} />
            ))
          )}
        </div>
      </UserContainer>
    </>
  );
}
