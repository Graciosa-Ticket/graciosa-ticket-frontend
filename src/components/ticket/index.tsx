import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TicketModel } from "../../models/ticket";
import { TicketContainer } from "./styles";
import TicketModal from "../../pages/tickets/components/ticketModal";
import Modal from "../modal";
import { useState } from "react";

interface ticketCardProps {
  data: TicketModel;
}

export default function TicketCard({ data }: ticketCardProps) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <>
      <Modal open={openModal} onOpenChange={() => setOpenModal(!open)}>
        <TicketModal
          data={data as TicketModel}
          onClose={() => setOpenModal(false)}
          onUpdate={() => {
            setOpenModal(false);
          }}
        />
      </Modal>

      <TicketContainer
        $status={data.status}
        type="button"
        onClick={() => setOpenModal(true)}
      >
        <div className="top-ticketCard">
          <div className="left-side">
            <h4>{data?.title}</h4>
            <p>
              {data?.created_at
                ? format(data.created_at, "dd 'de' MMM", { locale: ptBR })
                : ""}
            </p>
          </div>
          <div className="mockup">{data?.status}</div>
        </div>

        <p className="description">{data?.description}</p>
      </TicketContainer>
    </>
  );
}
