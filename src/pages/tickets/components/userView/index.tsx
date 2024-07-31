import { CSSProperties, useMemo, useState } from "react";
import { TicketModel } from "../../../../models/ticket";
import { useAuth } from "../../../../hooks/auth";
import { groupTickets } from "../groupTicket";
import {
  GroupedListContainer,
  StatusGroupButton,
  StatusSpanTable,
  UserTicketsViewContainer,
} from "./styles";
import TableComponent from "../table";
import { TypeColumn } from "@inovua/reactdatagrid-community/types";
import { format } from "date-fns";
import { FaAngleRight } from "react-icons/fa";

interface userTicketProps {
  tickets: TicketModel[];
  onOpenModal: (data: any) => void;
}

const closeSectionStyle: CSSProperties = {
  maxHeight: "0px",
  overflow: "hidden",
};
const openSectionStyle: CSSProperties = {
  maxHeight: "unset",
};

const UserTicketsView = ({ tickets, onOpenModal }: userTicketProps) => {
  const { user } = useAuth();

  const filteredTickets = useMemo(() => {
    if (user.role === "Collaborator") {
      return tickets.filter((ticket) => ticket.user.code === user.code);
    }
    return tickets.filter(
      (ticket) =>
        ticket.sector.responsible_code === user.code ||
        ticket.user.code === user.code
    );
  }, [tickets, user.code, user.role]);

  const ticketList = useMemo(() => {
    return groupTickets(filteredTickets) as groupTickets[];
  }, [filteredTickets]);

  return (
    <>
      <UserTicketsViewContainer>
        {ticketList.map((e, i) => (
          <GroupedList
            tickets={e.tickets}
            title={e.title}
            key={i}
            onOpenModal={onOpenModal}
          />
        ))}
      </UserTicketsViewContainer>
    </>
  );
};

const columns: TypeColumn[] = [
  {
    name: "code",
    header: "Código",
  },
  {
    name: "title",
    header: "Tìtulo",
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
      value ? format(value as Date, "dd/MM/yyyy 'ás' HH'h'mm") : "",
  },
  {
    name: "user",
    header: "Usuário",
    render: ({ value }) => {
      const name = value?.name || "Sem usuário";
      return name.length > 12 ? `${name.substring(0, 10)}...` : name;
    },
  },
  {
    name: "status",
    header: "Status",
    render: ({ value }) => (
      <StatusSpanTable $status={value}>{value}</StatusSpanTable>
    ),
  },
];

const GroupedList = ({ tickets, title, onOpenModal }: groupTickets) => {
  const [openAccordeon, setOpenAccordeon] = useState(true);

  const maxHeight = useMemo(() => {
    const totalTickets = tickets.reduce((a) => {
      return a + tickets.length * 40 + 100;
    }, 0);

    return totalTickets;
  }, [tickets]);

  return (
    <>
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
            onRowDoubleClick={(_, { data }) => onOpenModal?.(data)}
          />
        </section>
      </GroupedListContainer>
    </>
  );
};

export default UserTicketsView;
