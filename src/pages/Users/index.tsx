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

export default function User() {
  const [dataSource, setDataSource] = useState<UserModel[]>([]);
  const [foundUser, setfoundUser] = useState<UserModel>();

  const [selectedBtn, setSelectedBtn] =
    useState<UserModel["role"]>("Administrator");

  const handleBtnClick = (role: UserModel["role"]) => {
    setSelectedBtn(role);
  };

  useEffect(() => {
    refetch();
  }, [selectedBtn]);
  //getUsersByRole/${selectedBtn}
  const { isLoading, isFetching, refetch } = useFetch<UserModel[]>(
    `/users`,
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
      return dataSource.filter((user) => !user.deleted_at);
    }
    return [];
  }, [dataSource, selectedBtn]);

  const deletedUserlist = useMemo(() => {
    if (dataSource.length) {
      return dataSource.filter((user) => user.deleted_at);
    }
    return [];
  }, [dataSource, selectedBtn]);

  const handleUserSelect = (data: UserModel) => {
    setfoundUser(data);
  };

  return (
    <>
      <UserContainer>
        <PageHeaderComponent.container>
          <PageHeaderComponent.title>Usuários</PageHeaderComponent.title>
          <AddNewButton onUpdate={refetch} />

          <div className="search-user">
            <SelectUsers
              title="Buscar"
              onChange={handleUserSelect}
              filterCollaborators={false}
              showPicturePlaceholder={true}
              showSearchIcon={true}
            />
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
          {!foundUser ? (
            isLoadingFecth ? (
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
            )
          ) : (
            <div>
              <UserCard data={foundUser} key={foundUser.id} refetch={refetch} />
            </div>
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
