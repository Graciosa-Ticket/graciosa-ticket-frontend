import { TicketModel } from "../../../../models/ticket";
import ButtonComponent from "../../../../components/buttons";
import { ModalHeader, ModalTitle } from "../../../../components/modal";
import { FaAngleLeft } from "react-icons/fa";
import { ModalContentBody, ModalHeaderSection } from "./styles";
import { formatDate } from "date-fns";
import { Select, SelectItem } from "../../../../components/form/select";
import { theme, ticketStatus } from "../../../../styles/theme";
import { CSSProperties, useEffect, useState } from "react";
import ChatComponent from "./chat";
import { modalActions } from "../../../../shared/global.interface";
import { useMutationQuery } from "../../../../services/hooks/useMutationQuery";
import { toast } from "sonner";
import { useAuth } from "../../../../hooks/auth";
import { useForm } from "react-hook-form";
import TicketUserCard from "./components/userCard";
import { UserModel } from "../../../../models/user";
import CenterModal from "../../../../components/centerModal";
import TicketConclusionModal from "../ticketConclusionModal";
import TicketFileViewer from "./components/ticketFileViewer";
import DeletePopUp from "../../../../components/deleteTicketPopUp";
import { AiOutlineShareAlt } from "react-icons/ai";

const selectItemStyle = (status: TicketModel["status"]): CSSProperties => {
  const statusStyle = {
    ["Aberto"]: "open",
    ["Em andamento"]: "on_going",
    ["Aguardando aprovação"]: "waiting_approval",
    ["Cancelado"]: "canceled",
    ["Reaberto"]: "re_open",
    ["Impeditivo"]: "impediment",
    ["Concluído"]: "done",
  };
  return {
    color: "white",
    padding: "0.4em 0.8em",
    backgroundColor:
      theme().colors.ticket_status[statusStyle[status] as ticketStatus],
  };
};

const TicketModal = ({
  onClose,
  data,
  onUpdate,
}: modalActions<TicketModel>) => {
  const { user } = useAuth();
  const [currentTicket, setCurrentTicket] = useState<TicketModel>(
    data as TicketModel
  );

  const ticketDone = currentTicket?.status === "Concluído";

  useEffect(() => {
    if (data) {
      setCurrentTicket(data);
    }
  }, [data]);

  const { setValue } = useForm<{ status: TicketModel["status"] }>({
    defaultValues: data,
  });

  const { mutate: updateTicket, isLoading: isLoadingUpdate } = useMutationQuery(
    "/ticket/setStatus",
    "put"
  );

  const handleStatusChange = (newStatus: TicketModel["status"]) => {
    if (currentTicket) {
      const ticketToUpdate = {
        code: currentTicket.code,
        status: newStatus,
      };

      setCurrentTicket((prev) => ({
        ...prev,
        status: newStatus,
      }));

      updateTicket(ticketToUpdate, {
        onSuccess: () => {
          toast.success("Status Alterado!", { position: "bottom-left" });
          setValue("status", newStatus);
          onUpdate?.();
        },
        onError: () => {},
      });
    }
  };

  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const handleOpenDeleteModal = () => setOpenDeleteModal(true);

  const { mutate: deleteTicket, isLoading: isLoadingDelete } = useMutationQuery(
    `/ticket/${currentTicket?.code}`,
    "delete"
  );

  const handleDeleteTicket = () => {
    deleteTicket(
      {},
      {
        onSuccess: () => {
          toast.success("Ticket Excluido com sucesso!");
          onUpdate?.();
          onClose?.();
        },
      }
    );
  };

  const handleCloseTicket = () => {
    setValue("status", "Concluído");
    onUpdate?.();
    onClose?.();
  };

  const handleClose = () => {
    onClose?.();
    onUpdate?.();
  };

  const shareTicket = () => {
    const params = new URLSearchParams();

    params.append("ticketID", data?.code as string);

    const copyURL = window.location.href + "/?" + params.toString();

    navigator.clipboard.writeText(copyURL);

    toast.success("Link copiado para a área de transfêrencia");
  };

  return (
    <>
      <ModalHeader>
        <div className="left-side">
          <ButtonComponent buttonStyles="text" onClick={handleClose}>
            <FaAngleLeft fontSize="1.9em" />
          </ButtonComponent>
          <ModalTitle>{`#${currentTicket?.code} - ${currentTicket?.title}`}</ModalTitle>
        </div>

        <ModalHeaderSection>
          <span>Status do chamado</span>

          <Select
            defaultValue={currentTicket?.status}
            triggerStyle={selectItemStyle(
              currentTicket?.status || "Em andamento"
            )}
            onValueChange={handleStatusChange}
            isLoading={isLoadingUpdate}
          >
            <SelectItem value="Aberto">Aberto</SelectItem>
            <SelectItem value="Em andamento">Em andamento</SelectItem>
            <SelectItem value="Aguardando aprovação">
              Aguardando aprovação
            </SelectItem>
            <SelectItem value="Cancelado">Cancelado</SelectItem>
            <SelectItem value="Reaberto">Reaberto</SelectItem>
            <SelectItem value="Impeditivo">Impeditivo</SelectItem>
            <SelectItem value="Concluído">Concluído</SelectItem>
          </Select>
        </ModalHeaderSection>
      </ModalHeader>

      <ModalContentBody>
        <section className="ticket-content-side">
          <div className="ticket-content-header">
            <h2>{currentTicket?.title}</h2>

            <div className="right-side">
              <span>
                {currentTicket?.created_at
                  ? `${formatDate(
                      currentTicket?.created_at,
                      "dd/MM/yyyy"
                    )} às ${formatDate(currentTicket?.created_at, "HH:mm")}`
                  : "Data inválida"}
              </span>

              <ButtonComponent
                buttonStyles="text"
                buttonSize="small"
                className="shareButton"
                title="Clique para compartilhar"
                onClick={shareTicket}
              >
                <AiOutlineShareAlt />
              </ButtonComponent>
            </div>
          </div>

          <div className="description-container">
            <p className="description">{currentTicket?.description}</p>

            <div className="details-header">
              <h6>Detalhes</h6>
            </div>
          </div>

          <section className="layout">
            <section className="details-section">
              <div className="ticket-owner">
                <p>Quem Abriu?</p>
                <TicketUserCard data={currentTicket?.user as UserModel} />
              </div>
            </section>

            <section className="images-section">
              <p>Anexos</p>
              {currentTicket?.attachmentUrl?.map((file, index) => (
                <TicketFileViewer key={index} files={[file]} />
              ))}
            </section>
          </section>

          <section className="buttons-content">
            {user.role === "Administrator" &&
              currentTicket?.status !== "Concluído" && (
                <>
                  <DeletePopUp
                    open={openDeleteModal}
                    onOpenChange={(open) => setOpenDeleteModal(open)}
                    onConfirmDelete={handleDeleteTicket}
                  />
                  <ButtonComponent
                    buttonStyles="delete"
                    buttonStylesType="outline"
                    onClick={handleOpenDeleteModal}
                    isLoading={isLoadingDelete}
                  >
                    Excluir
                  </ButtonComponent>
                </>
              )}

            {currentTicket?.status !== "Concluído" && (
              <CloseTicketButton
                data={currentTicket as TicketModel}
                onCloseTicket={handleCloseTicket}
              />
            )}
          </section>
        </section>

        <section className="comment-section">
          <div className="comment-section-header">
            <h6>Chat</h6>
          </div>

          <ChatComponent
            ticket_data={currentTicket as TicketModel}
            ticketDone={ticketDone}
          />
        </section>
      </ModalContentBody>
    </>
  );
};

interface CloseTicketButtonProps {
  data: TicketModel;
  onCloseTicket(): void;
}

const CloseTicketButton = ({ onCloseTicket, data }: CloseTicketButtonProps) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <CenterModal open={open} onOpenChange={() => setOpen(!open)}>
        <TicketConclusionModal
          onClose={() => setOpen(false)}
          onUpdate={onCloseTicket}
          data={data}
        />
      </CenterModal>

      <ButtonComponent
        buttonStyles="confirm"
        buttonStylesType="fill"
        title="Concluir ticket"
        onClick={() => setOpen(true)}
      >
        Concluir
      </ButtonComponent>
    </>
  );
};

export default TicketModal;
