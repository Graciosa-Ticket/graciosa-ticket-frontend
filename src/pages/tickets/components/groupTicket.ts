import { chain } from "lodash";
import { TicketModel } from "../../../models/ticket";

export type groupTickets = {
  title: string;
  tickets: TicketModel[];
};

export type AdminGroupTickets = {
  title: string;
  tickets: groupTickets[];
};

export const groupTickets = (
  tickets: TicketModel[],
  isAdmin = false
): AdminGroupTickets[] | groupTickets[] => {
  if (isAdmin) {
    return chain(tickets)
      .groupBy((item) => item.sector_code)
      .map((tickets, sector_code) => ({
        title: "Setor " + sector_code,
        tickets: chain(tickets)
          .groupBy((single_ticket) => single_ticket.status)
          .map((list, status) => ({
            title: status,
            tickets: list,
          }))
          .value(),
      }))
      .value();
  }

  return chain(tickets)
    .groupBy((single_ticket) => single_ticket.status)
    .map((list, status) => ({
      title: status,
      tickets: list,
    }))
    .value();
};
