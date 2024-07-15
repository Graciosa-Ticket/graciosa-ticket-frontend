import { UserModel } from "./user";

export interface SectorModel {
  code?: string;
  name: string;
  responsible_code: string;
  user?: UserModel;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
}
