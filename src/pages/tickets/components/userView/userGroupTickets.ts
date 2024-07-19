import { chain } from "lodash";
import { TicketModel } from "../../../../models/ticket";


export type userGroupTickets = {
  title: string;
  tickets: TicketModel[];
};




export const userGroupTickets = (
  tickets: TicketModel[],
): userGroupTickets[] => {

  return chain(tickets)
    .groupBy((single_ticket) => single_ticket.status)
    .map((list, status) => ({
      title: status,
      tickets: list,
    }))
    .value();
};


