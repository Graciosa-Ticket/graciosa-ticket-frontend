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
    // if (user.role === "Supervisor") {
    //   return tickets.filter((ticket) => ticket.responsable_code === user.code);
    // }
    return tickets;
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

const GroupedList = ({ tickets, title, onOpenModal }: groupTickets) => {
  const [openAccordeon, setOpenAccordeon] = useState(true);

  const maxHeight = useMemo(() => {
    const totalTickets = tickets.reduce((a, b) => {
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
