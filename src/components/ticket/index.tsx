import { format } from "date-fns";
import { TicketModel } from "../../models/ticket";
import { TicketContainer } from "./styles";

interface ticketCardProps {
  data: TicketModel;
}

export default function TicketCard({ data }: ticketCardProps) {
  return (
    <TicketContainer>
      <section>
        <div className="ticketCard-div">
          <div className="top-ticketCard">
            <h1>{data?.title}</h1>
            <p>{format(data?.date, "dd/MM/yyyy")}</p>
            <div className="mockup-teste">{data?.status}</div>
          </div>
          <p>{data?.description}</p>
        </div>
      </section>
    </TicketContainer>
  );
}
