import { useState } from "react";
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

const TicketsPage = () => {
  const [dataSource, setDataSource] = useState<TicketModel[]>([]);

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
    <TicketsPageContainer>
      <PageHeaderComponent.container>
        <PageHeaderComponent.title>Chamados</PageHeaderComponent.title>
        <AddNewButton onUpdate={handleUpdate} />
      </PageHeaderComponent.container>

      {!dataSource.length && !isLoadingFecth ? (
        <NotFoundComponent />
      ) : isLoadingFecth ? (
        <TicketSkeletonLoading />
      ) : (
        <AdminTicketsView tickets={dataSource} onUpdate={handleUpdate} />
      )}
    </TicketsPageContainer>
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
