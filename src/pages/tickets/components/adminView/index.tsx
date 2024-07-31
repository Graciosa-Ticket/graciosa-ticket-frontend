import { CSSProperties, useMemo, useState } from "react";
import { TicketModel } from "../../../../models/ticket";
import { useAuth } from "../../../../hooks/auth";
import { AdminGroupTickets, groupTickets } from "../groupTicket";
import {
  AdminTicketViewContainer,
  GroupedListContainer,
  SectionGroupButton,
  StatusGroupButton,
  StatusSpanTable,
} from "./styles";
import TableComponent from "../table";
import { TypeColumn } from "@inovua/reactdatagrid-community/types";
import { format } from "date-fns";
import { FaAngleRight } from "react-icons/fa";

interface adminTicketProps {
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

const AdminTicketsView = ({ tickets, onOpenModal }: adminTicketProps) => {
  const { user } = useAuth();

  const ticketList = useMemo(() => {
    return groupTickets(tickets, true);
  }, [tickets, user.id]);

  return (
    <>
      <AdminTicketViewContainer>
        {(ticketList as AdminGroupTickets[]).map((e, i) => (
          <SectorList
            tickets={e.tickets}
            key={i}
            title={e.title}
            handleOpenModal={onOpenModal}
          />
        ))}
      </AdminTicketViewContainer>
    </>
  );
};

const SectorList = ({
  tickets,
  title,
  handleOpenModal,
}: AdminGroupTickets & { handleOpenModal: (data: any) => void }) => {
  const [openAccordeon, setOpenAccordeon] = useState(false);

  const maxHeight = useMemo(() => {
    const totalTickets = tickets.reduce((a, b) => {
      return a + b.tickets.length * 40 + 100;
    }, 0);

    return totalTickets;
  }, [tickets]);

  return (
    <div>
      <div className="section-group-header">
        <SectionGroupButton
          $open={openAccordeon}
          buttonStyles="text"
          onClick={() => setOpenAccordeon(!openAccordeon)}
          data-total={(
            tickets.reduce((a, b) => a + b.tickets.length, 0) + ""
          ).padStart(2, "0")}
        >
          <span>{title}</span>
          <FaAngleRight fontSize="0.8em" />
        </SectionGroupButton>
      </div>

      <section
        className="tickets-list"
        style={
          openAccordeon ? { ...openSectionStyle, maxHeight } : closeSectionStyle
        }
      >
        {tickets.map((ticket, index) => (
          <GroupedList
            tickets={ticket.tickets}
            title={ticket.title}
            key={index}
            onOpenModal={handleOpenModal}
          />
        ))}
      </section>
    </div>
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
  console.log(tickets);

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

export default AdminTicketsView;
