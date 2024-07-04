export interface UserModel {
  id: string;
  name: string;
  email: string;
  profile_picture?: string;
  type: "admin" | "supervisor" | "collaborator"
  status?:boolean,
  sector: string,
  code?: number,
  birthdate?: string,
  postalCode?: string,
  phone?: string,
  address?: string

}
