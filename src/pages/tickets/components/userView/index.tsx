import { CSSProperties, useMemo, useState } from "react";
import { TicketModel } from "../../../../models/ticket";
import { useAuth } from "../../../../hooks/auth";
import { groupTickets } from "../groupTicket";
import {
  AdminTicketViewContainer,
  GroupedListContainer,
  StatusGroupButton,
  StatusSpanTable,
} from "./styles";
import TableComponent from "../table";
import { TypeColumn } from "@inovua/reactdatagrid-community/types";
import { format } from "date-fns";
import { FaAngleRight } from "react-icons/fa";
import Modal from "../../../../components/modal";
import TicketModal from "../ticketModal";

interface AdminTicketProps {
  tickets: TicketModel[];
  onUpdate: () => void;
}

const closeSectionStyle: CSSProperties = {
  maxHeight: "0px",
  overflow: "hidden",
};
const openSectionStyle: CSSProperties = {
  maxHeight: "unset",
};

const UserTicketsView = ({ tickets, onUpdate }: AdminTicketProps) => {
    
  const { user } = useAuth();

  const ticketList = useMemo(() => {
    return groupTickets(tickets) as groupTickets[];
  }, [tickets, user.id]);

  return (
    <AdminTicketViewContainer>
      {ticketList.map((e, i) => (
        <GroupedList tickets={e.tickets} title={e.title} key={i} onUpdate={onUpdate} />
      ))}
    </AdminTicketViewContainer>
  );
};

const columns: TypeColumn[] = [
  {
    name: "code",
    header: "Código",
  },
  {
    name: "title",
    header: "Título",
    render: ({ value }) => <b>{value}</b>,
  },
  {
    name: "description",
    header: "Descrição",
    flex: 1,
  },
  {
    name: "created_at",
    header: "Dt. abertura",
    render: ({ value }) =>
      value ? format(value as Date, "dd/MM/yyyy 'às' HH'h'mm") : "",
  },
  {
    name: "user_code",
    header: "Usuário",
  },
  {
    name: "status",
    header: "Status",
    render: ({ value }) => (
      <StatusSpanTable $status={value}>{value}</StatusSpanTable>
    ),
  },
];

const GroupedList = ({ tickets, title, onUpdate }: groupTickets & { onUpdate: () => void }) => {
  const [openAccordeon, setOpenAccordeon] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [modalData, setModalData] = useState<TicketModel>();

  const handleOpenModal = (data: TicketModel) => {
    setModalData(data);
    setOpenModal(true);
  };

  const handleModalClose = () => {
    setOpenModal(false);
  };

  const maxHeight = useMemo(() => {
    const totalTickets = tickets.reduce((a, b) => {
      return a + tickets.length * 40 + 100;
    }, 0);

    return totalTickets;
  }, [tickets]);

  return (
    <>
      <Modal open={openModal} onOpenChange={handleModalClose}>
        <TicketModal
          data={modalData as TicketModel}
          onClose={handleModalClose}
          onUpdate={() => onUpdate()}
        />
      </Modal>
      <GroupedListContainer>
        <div className="header">
          <StatusGroupButton
            buttonStyles="text"
            $status={title as TicketModel["status"]}
            $open={openAccordeon}
            onClick={() => setOpenAccordeon(!openAccordeon)}
            data-total={(tickets.length + "").padStart(2, "0")}
          >
            {title}
            <FaAngleRight fontSize="0.8em" />
          </StatusGroupButton>
        </div>

        <section
          className="ticket-table"
          style={
            openAccordeon
              ? { ...openSectionStyle, maxHeight }
              : closeSectionStyle
          }
        >
          <TableComponent
            columns={columns}
            dataSource={tickets}
            onRowDoubleClick={(_, { data }) => handleOpenModal(data)}
          />
        </section>
      </GroupedListContainer>
    </>
  );
};

export default UserTicketsView;
