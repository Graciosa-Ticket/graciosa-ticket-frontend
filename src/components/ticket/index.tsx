import { format } from "date-fns";
import { TicketModel } from "../../models/ticket";
import { TicketContainer } from "./styles";

interface ticketCardProps {
  data: Partial<TicketModel>;
}

export default function TicketCard({ data }: ticketCardProps) {
  return (
    <TicketContainer $status={data.status || "Andamento"}>
      <div className="top-ticketCard">
        <div className="left-side">
          <h4>{data?.title}</h4>
          <p>
            {data?.created_at ? format(data.created_at, "dd 'de' LLL") : ""}
          </p>
        </div>
        <div className="mockup-teste">{data?.status}</div>
      </div>
      <p className="description">{data?.description}</p>
    </TicketContainer>
  );
}
