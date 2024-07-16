import { TicketModel } from "../../../../models/ticket";
import ButtonComponent from "../../../../components/buttons";
import { ModalHeader, ModalTitle } from "../../../../components/modal";
import { FaAngleLeft } from "react-icons/fa";
import { ModalContentBody, ModalHeaderSection } from "./styles";
import { formatDate } from "date-fns";
import { Select, SelectItem } from "../../../../components/form/select";
import { theme, ticketStatus } from "../../../../styles/theme";
import { CSSProperties } from "react";
import ChatComponent from "./chat";
import { modalActions } from "../../../../shared/global.interface";
import Avatar from "../../../../components/Avatar";
import { useMutationQuery } from "../../../../services/hooks/useMutationQuery";
import { toast } from "sonner";

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
    backgroundColor:
      theme().colors.ticket_status[statusStyle[status] as ticketStatus],
  };
};

const TicketModal = ({
  onClose,
  data,
  onUpdate,
}: modalActions<TicketModel>) => {
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
          toast.success("Status Alterado!", { position: "top-left" });
          onUpdate?.();
        },
        onError: () => {},
      });
    }
  };

  return (
    <>
      <ModalHeader>
        <div className="left-side">
          <ButtonComponent buttonStyles="text" onClick={onClose}>
            <FaAngleLeft fontSize="1.9em" />
          </ButtonComponent>
          <ModalTitle>{`#${data?.code} - ${data?.title}`}</ModalTitle>
        </div>

        <ModalHeaderSection>
          <span>Status do chamado</span>

          <Select
            defaultValue={data?.status}
            triggerStyle={selectItemStyle(data?.status || "Em andamento")}
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
                  ? formatDate(data?.created_at, "dd/MM/yyyy")
                  : "data invalida"}
              </span>
            </div>
          </div>

          <p className="description">{data?.description}</p>

          <section className="details-section">
            <div className="details-header">
              <h6>Detalhes</h6>
            </div>

            <div className="ticket-owner">
              <p>Quem Abriu?</p>
              <div className="img-sector">
                <Avatar
                  src={data?.user.profile_picture}
                  alt=""
                  className="user-avatar"
                />
              </div>
              {data?.user.name}
            </div>
          </section>
        </section>

        <section className="comment-section">
          <div className="comment-section-header">
            <h6>Chat</h6>
          </div>

          <ChatComponent />
        </section>
      </ModalContentBody>
    </>
  );
};

export default TicketModal;
