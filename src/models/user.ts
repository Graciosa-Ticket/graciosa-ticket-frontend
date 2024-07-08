export interface UserModel {
  code?: string;
  role: "Administrator" | "Supervisor" | "Collaborator";
  name: string;
  email: string;
  password: string;
  birth_date?: Date;
  address: string;
  cep: string;
  phone_number: string;
  profile_picture: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date;
  status?: boolean;
}
