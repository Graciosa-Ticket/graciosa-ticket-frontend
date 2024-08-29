export interface Sector {
  name: string;
  phone?: string;
}

export interface UserModel {
  id: string;
  code?: string;
  role: "Administrator" | "Supervisor" | "Collaborator";
  name: string;
  email: string;
  password?: string;
  birth_date?: Date | string;
  registration_number?: string;
  profile_picture?: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  status?: boolean;
  file?: File;
  sector?: Sector;
  sector_code?: string;
}
