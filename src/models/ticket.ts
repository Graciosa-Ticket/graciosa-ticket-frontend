export interface TicketModel {
  title: string;
  date: Date;
  status: "Urgente" | "Concluído" | "Andamento";
  description: string;
}
