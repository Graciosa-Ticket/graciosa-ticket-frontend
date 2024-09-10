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
import UserSkeletonLoading from "./skeleton";
import { modalActions } from "../../shared/global.interface";
import EditedFormPopUp from "../../components/EditedFormPopUp";
import SearchBarComponent from "../../components/searchBarComponent";
import { chain } from "lodash";

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

  const { isLoading, isFetching, refetch } = useFetch<UserModel[]>(
    `/users`,
    ["users"],
    {
      onSuccess: (data) => {
        setDataSource(data);
      },
    }
  );

  const isLoadingFecth = isLoading || isFetching;

  const userlist = useMemo(() => {
    if (dataSource.length) {
      let filteredUsers = dataSource.filter(
        (user) => !user.deleted_at && user.role === selectedBtn
      );

      if (searchUser) {
        filteredUsers = searchUsers(searchUser, filteredUsers);
      }

      const groupByLetter = chain(filteredUsers)
        .groupBy((e) => e?.name?.toLocaleUpperCase?.()?.slice?.(0, 1))
        .map((data, key) => {
          return {
            letter: key,
            data,
          };
        })
        .sort((a, b) => {
          if (a.letter > b.letter) {
            return 1;
          }
          return -1;
        })
        .value();

      return groupByLetter;
    }
    return [];
  }, [dataSource, selectedBtn, searchUser]);

  const deletedUserlist = useMemo(() => {
    if (dataSource.length) {
      return dataSource.filter(
        (user) => user.deleted_at && user.role === selectedBtn
      );
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
            <section className="letter-section">
              {userlist.map((e, i) => (
                <div key={e.letter} className="letter-box">
                  <div className="box-title">
                    <h6>{e.letter}</h6>

                    <span className="line" />
                  </div>

                  <ul>
                    {e.data.map((user, key) => (
                      <UserCard
                        data={user}
                        key={user.id + "" + key}
                        refetch={refetch}
                      />
                    ))}
                  </ul>
                </div>
              ))}
              {deletedUserlist.map((user) => (
                <UserCard data={user} key={user.id} refetch={refetch} />
              ))}
            </section>
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
