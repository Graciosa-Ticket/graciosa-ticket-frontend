import { TicketModel } from "../../../../models/ticket";
import ButtonComponent from "../../../../components/buttons";
import { ModalHeader, ModalTitle } from "../../../../components/modal";
import { FaAngleLeft } from "react-icons/fa";
import { ModalContentBody, ModalHeaderSection } from "./styles";
import { formatDate } from "date-fns";
import { Select, SelectItem } from "../../../../components/form/select";
import { theme, ticketStatus } from "../../../../styles/theme";
import { CSSProperties, useState } from "react";
import ChatComponent from "./chat";
import { modalActions } from "../../../../shared/global.interface";
import { useMutationQuery } from "../../../../services/hooks/useMutationQuery";
import { toast } from "sonner";
import ActionsModalComponent from "../../../../components/actionModal";
import { useAuth } from "../../../../hooks/auth";
import { useForm } from "react-hook-form";
import TicketUserCard from "./components/userCard";
import { UserModel } from "../../../../models/user";
import CenterModal from "../../../../components/centerModal";
import TicketConclusionModal from "../ticketConclusionModal";
import ImageViewer from "./components/imageViewer";

const selectItemStyle = (status: TicketModel["status"]): CSSProperties => {
  const statusStyle = {
    ["Aberto"]: "open",
    ["Em andamento"]: "on_going",
    ["Aguardando aprovação"]: "re_open",
    ["Cancelado"]: "canceled",
    ["Reaberto"]: "waiting_approval",
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
  const { watch, setValue } = useForm<{ status: TicketModel["status"] }>({
    defaultValues: data,
  });

  const { mutate: updateTicket, isLoading: isLoadingUpdate } = useMutationQuery(
    "/ticket",
    "put"
  );

  const handleStatusChange = (newStatus: TicketModel["status"]) => {
    if (data) {
      const updatedTicket = {
        code: data.code,
        status: newStatus,
      };

      updateTicket(updatedTicket, {
        onSuccess: () => {
          toast.success("Status Alterado!", { position: "bottom-left" });
          setValue("status", updatedTicket.status);
          onUpdate?.();
        },
        onError: () => {},
      });
    }
  };

  const { mutate: deleteTicket, isLoading: isLoadingDelete } = useMutationQuery(
    `/ticket/${data?.code}`,
    "delete"
  );

  const handleDeleteTicket = () => {
    deleteTicket(
      {},
      {
        onSuccess: () => {
          toast.success("Ticket Excluido com sucesso!");
          onUpdate?.();
        },
      }
    );
  };

  const handleCloseTicket = () => {
    setValue("status", "Concluído");
    onUpdate?.();
  };

  const handleClose = () => {
    onClose?.();
  };

  return (
    <>
      <ModalHeader>
        <div className="left-side">
          <ButtonComponent buttonStyles="text" onClick={handleClose}>
            <FaAngleLeft fontSize="1.9em" />
          </ButtonComponent>
          <ModalTitle>{`#${data?.code} - ${data?.title}`}</ModalTitle>
        </div>

        <ModalHeaderSection>
          <span>Status do chamado</span>

          <Select
            defaultValue={data?.status}
            triggerStyle={selectItemStyle(watch("status") || "Em andamento")}
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
            <h2>{data?.title}</h2>

            <div className="right-side">
              <span>
                {data?.created_at
                  ? `${formatDate(
                      data?.created_at,
                      "dd/MM/yyyy"
                    )} as ${formatDate(data?.created_at, "HH:mm")}`
                  : "data invalida"}
              </span>
            </div>
          </div>

          <p className="description">{data?.description}</p>

          <div className="details-header">
            <h6>Detalhes</h6>
          </div>

          <section className="layout">
            <section className="details-section">
              <div className="ticket-owner">
                <p>Quem Abriu?</p>
                <TicketUserCard data={data?.user as UserModel} />
              </div>
            </section>

            <section className="images-Setion">
              <p>Anexos</p>
              {data?.attachmentUrl?.map((url, index) => (
                <ImageViewer />
              ))}
            </section>
          </section>

          <section className="buttons-content">
            {(data?.user.code === user.code ||
              user.role === "Administrator") && (
              <ActionsModalComponent
                message="Confirme para excluir este Ticket. Esta ação não pode ser desfeita."
                actionButton={
                  <ButtonComponent
                    buttonStyles="delete"
                    buttonStylesType="outline"
                    onClick={handleDeleteTicket}
                    isLoading={isLoadingDelete}
                  >
                    Confirmar Exclusão de Ticket
                  </ButtonComponent>
                }
                buttonProps={{
                  buttonStyles: "delete",
                  buttonStylesType: "outline",
                }}
              >
                Excluir
              </ActionsModalComponent>
            )}

            {watch("status") !== "Concluído" && (
              <CloseTicketButton
                data={data as TicketModel}
                onCloseTicket={handleCloseTicket}
              />
            )}
          </section>
        </section>

        <section className="comment-section">
          <div className="comment-section-header">
            <h6>Chat</h6>
          </div>

          <ChatComponent ticket_data={watch() as TicketModel} />
        </section>
      </ModalContentBody>
    </>
  );
};

interface closeTicketButton {
  data: TicketModel;
  onCloseTicket(): void;
}

const CloseTicketButton = ({ onCloseTicket, data }: closeTicketButton) => {
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
