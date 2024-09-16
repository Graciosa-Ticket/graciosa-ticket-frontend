import { SectorCardModel } from "./sector";
import { UserModel } from "./user";

export type TicketStatusEnum =
  | "Aberto"
  | "Em andamento"
  | "Aguardando aprovação"
  | "Cancelado"
  | "Reaberto"
  | "Impeditivo"
  | "Concluído";

export interface TicketModel {
  status: TicketStatusEnum;
  code?: string;
  title: string;
  description: string;
  start_date?: Date;
  end_date?: Date;
  break?: string;
  observation?: string;
  rating?: number;
  created_at?: Date | string;
  updated_at?: Date;
  deleted_at?: Date;
  is_recurrent?: boolean;
  user: Partial<
    Omit<
      UserModel,
      | "id"
      | "role"
      | "email"
      | "password"
      | "birth_date"
      | "address"
      | "cep"
      | "phone_number"
      | "created_at"
      | "updated_at"
      | "deleted_at"
      | "status"
    >
  >;
  sector: Partial<
    Omit<
      SectorCardModel,
      | "code"
      | "description"
      | "created_at"
      | "updated_at"
      | "deleted_at"
      | "user"
    >
  >;
  sector_code: string;
  comments?: chatComment[];
  files?: FileList;
  attachmentUrl?: string[];
}

export interface chatComment {
  code: string;
  comment: string;
  attachmentUrl: string[];
  user: UserModel;
  files?: FileList;
  created_at?: Date | string;
  is_done?: boolean;
}
