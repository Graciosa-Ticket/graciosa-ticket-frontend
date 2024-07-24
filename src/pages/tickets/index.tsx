import { useEffect, useState } from "react";
import PageHeaderComponent from "../../components/pagesHeader";
import AdminTicketsView from "./components/adminView";
import { TicketsPageContainer } from "./styles";
import { TicketModel } from "../../models/ticket";
import { useFetch } from "../../services/hooks/getQuery";
import NotFoundComponent from "../../components/notFound";
import TicketSkeletonLoading from "./skeleton";
import EditedFormPopUp from "../../components/EditedFormPopUp";
import CreateTicketModal from "./components/createTicketModal";
import { modalActions } from "../../shared/global.interface";
import Modal from "../../components/modal";
import UserTicketsView from "./components/userView";
import { useAuth } from "../../hooks/auth";
import TicketModal from "./components/ticketModal";

const TicketsPage = () => {
  const { user } = useAuth();
  const [dataSource, setDataSource] = useState<TicketModel[]>([]);

  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState<TicketModel>();

  const handleOpenModal = (data: TicketModel) => {
    setModalData(data);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const { isLoading, isFetching, refetch } = useFetch<TicketModel[]>(
    "/ticket",
    ["ticket"],
    {
      onSuccess: (data) => {
        setDataSource(data);
      },
      onError: (error) => {},
    }
  );

  const isLoadingFecth = isLoading || isFetching;

  const handleUpdate = () => {
    refetch();
  };

  return (
    <>
      <Modal open={openModal} onOpenChange={handleModalClose}>
        <TicketModal
          data={modalData as TicketModel}
          onClose={handleModalClose}
          onUpdate={() => refetch()}
        />
      </Modal>
      <TicketsPageContainer>
        <PageHeaderComponent.container>
          <PageHeaderComponent.title>Chamados</PageHeaderComponent.title>
          <AddNewButton onUpdate={handleUpdate} />
        </PageHeaderComponent.container>

        {!dataSource.length && !isLoadingFecth ? (
          <NotFoundComponent />
        ) : isLoadingFecth ? (
          <TicketSkeletonLoading />
        ) : user?.role === "Administrator" ? (
          <AdminTicketsView
            tickets={dataSource}
            onOpenModal={handleOpenModal}
          />
        ) : (
          <UserTicketsView tickets={dataSource} onOpenModal={handleOpenModal} />
        )}
      </TicketsPageContainer>
    </>
  );
};

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
        <CreateTicketModal
          onClose={onOpenChange}
          onUpdate={handleSuccess}
          onSetEditedData={setHasEditedData}
        />
      </Modal>
      <PageHeaderComponent.button
        title="Cadastrar Novo Ticket"
        onClick={handleOpenModal}
      />
    </>
  );
};

export default TicketsPage;
