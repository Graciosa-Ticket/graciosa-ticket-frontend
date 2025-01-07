import { UserModel } from "../models/user";

export const roleTranslation: Record<UserModel["role"], string> = {
  Administrator: "Administrador",
  Supervisor: "Supervisor",
  Collaborator: "Colaborador",
};
