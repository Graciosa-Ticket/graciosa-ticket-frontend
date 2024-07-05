export interface TicketModel {
  status: "Urgente" | "Concluído" | "Andamento";
  title: string;
  description: string;
  urgency: string;
  start_date?: Date;
  end_date?: Date;
  break?: string;
  observation?: string;
  rating?: number;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  user_code: string;
  sector_code: string;
}
