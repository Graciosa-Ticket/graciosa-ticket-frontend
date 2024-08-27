import { useState, useMemo, useEffect } from "react";
import ButtonComponent from "../../components/buttons";
import { UserModel } from "../../models/user";
import { UserContainer } from "./styles";
import Modal from "../../components/modal";
import PageHeaderComponent from "../../components/pagesHeader";
import CreateUserModal from "./components/createUserModal";
import UserCard from "./components/userCard";
import { useFetch } from "../../services/hooks/getQuery";
import NotFoundComponent from "../../components/notFound";
import UserSkeletonLoading from "./skeleton";
import { modalActions } from "../../shared/global.interface";
import EditedFormPopUp from "../../components/EditedFormPopUp";
import SelectUsers from "../../components/form/selectUsers";
import SearchBarComponent from "../../components/searchBarComponent";

const searchUsers = (value: string, data: UserModel[]): UserModel[] => {
  const searchRegex = new RegExp(value, "i");

  return data.filter((user) => {
    const code = user?.code || "";
    const name = user?.name || "";
    const email = user?.email || "";

    return (
      searchRegex.test(code) ||
      searchRegex.test(name) ||
      searchRegex.test(email)
    );
  });
};

export default function User() {
  const [dataSource, setDataSource] = useState<UserModel[]>([]);
  const [searchUser, setSearchUser] = useState("");
  const [selectedBtn, setSelectedBtn] =
    useState<UserModel["role"]>("Administrator");

  const handleBtnClick = (role: UserModel["role"]) => {
    setSelectedBtn(role);
  };

  useEffect(() => {
    refetch();
  }, [selectedBtn]);

  const { isLoading, isFetching, refetch } = useFetch<UserModel[]>(
    `/users/getUsersByRole/${selectedBtn}`,
    ["users", selectedBtn],
    {
      onSuccess: (data) => {
        setDataSource(data);
      },
    }
  );

  const isLoadingFecth = isLoading || isFetching;

  const userlist = useMemo(() => {
    if (dataSource.length) {
      if (searchUser) {
        return searchUsers(searchUser, dataSource);
      }
      return dataSource.filter((user) => !user.deleted_at);
    }
    return [];
  }, [dataSource, selectedBtn, searchUser]);

  const deletedUserlist = useMemo(() => {
    if (dataSource.length) {
      return dataSource.filter((user) => user.deleted_at);
    }
    return [];
  }, [dataSource, selectedBtn]);

  return (
    <>
      <UserContainer>
        <PageHeaderComponent.container>
          <PageHeaderComponent.title>Usuários</PageHeaderComponent.title>
          <AddNewButton onUpdate={refetch} />

          <div className="search-user">
            <SearchBarComponent onValueChange={setSearchUser} />
          </div>
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
          {isLoadingFecth ? (
            <UserSkeletonLoading />
          ) : !dataSource.length ? (
            <NotFoundComponent />
          ) : (
            <>
              {userlist.map((user, key) => (
                <UserCard
                  data={user}
                  key={user.id + "" + key}
                  refetch={refetch}
                />
              ))}
              {deletedUserlist.map((user) => (
                <UserCard data={user} key={user.id} refetch={refetch} />
              ))}
            </>
          )}
        </div>
      </UserContainer>
    </>
  );
}

const AddNewButton = ({ onUpdate }: modalActions) => {
  const [openModal, setOpenModal] = useState(false);
  const [openConfirmCloseModal, setOpenConfirmCloseModal] = useState(false);
  const [hasEditedData, setHasEditedData] = useState(false);

  const onOpenChange = () => {
    if (hasEditedData) {
      setOpenConfirmCloseModal(true);
      return;
    }

    setOpenModal(!openModal);
  };

  const onConfirmCloseModal = () => {
    setHasEditedData(false);
    setOpenConfirmCloseModal(false);
    setOpenModal(false);
  };

  const handleOpenModal = () => {
    setOpenModal(true);
    setHasEditedData(false);
    setOpenConfirmCloseModal(false);
  };

  const handleSuccess = () => {
    onUpdate?.();
    onConfirmCloseModal();
  };

  return (
    <>
      <EditedFormPopUp
        open={hasEditedData && openConfirmCloseModal}
        onOpenChange={() => setOpenConfirmCloseModal(!openConfirmCloseModal)}
        onConfirmCloseModal={onConfirmCloseModal}
      />
      <Modal open={openModal} onOpenChange={onOpenChange}>
        <CreateUserModal
          onClose={onOpenChange}
          onUpdate={handleSuccess}
          onSetEditedData={setHasEditedData}
        />
      </Modal>
      <PageHeaderComponent.button
        title="Cadastrar Novo Usuario"
        onClick={handleOpenModal}
      />
    </>
  );
};
