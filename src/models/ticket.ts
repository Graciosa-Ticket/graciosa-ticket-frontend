export type TicketStatusEnum =
  | "Aberto"
  | "Em andamento"
  | "Aguardando aprovação"
  | "Cancelado"
  | "Reaberto"
  | "Impeditivo"
  | "Concluído";

export type TicketUrgencyEnum = "Normal" | "Urgente" | "Alta" | "Baixa";

export interface TicketModel {
  status: TicketStatusEnum;
  code?: string;
  title: string;
  description: string;
  urgency?: TicketUrgencyEnum;
  start_date?: Date;
  end_date?: Date;
  break?: string;
  observation?: string;
  rating?: number;
  created_at?: Date | string;
  updated_at?: Date;
  deleted_at?: Date;
  user_code: string;
  sector_code: string;
}
