/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ReactNode, createContext, useContext, useState } from "react";
import { toast } from "sonner";
import { UserModel } from "../models/user";
import { api } from "../services/api.service";

interface AuthState {
  user: UserModel;
  token: string;
}

export interface AuthContextData {
  signed: boolean;
  loading: boolean;
  user: UserModel;
  signOut(): void;
  updateProfile(data: UserModel): void;
  signIn(email: string, password: string): Promise<void>;
}

export const AuthContext = createContext<AuthContextData>(
  {} as AuthContextData
);

interface authProp {
  children: ReactNode;
}

export const AuthProvider = ({ children }: authProp) => {
  const [data, setData] = useState<AuthState>(() => {
    const token = localStorage.getItem("gcc_ticket/token");
    const user = localStorage.getItem("gcc_ticket/user");

    if (user && token) {
      (api as any).defaults.headers.Authorization = `Bearer ${token}`;
      return { token, user: JSON.parse(user) };
    }

    return {} as AuthState;
  });

  const [loading, setLoading] = useState(false);

  const signOut = () => {
    localStorage.removeItem("gcc_ticket/token");
    localStorage.removeItem("gcc_ticket/user");

    delete (api as any).defaults.headers.Authorization;
    if (!data?.user || !data?.token) return;
    toast.info("Logout efetuado com sucesso!");
    setData({} as AuthState);
  };

  const updateProfile = (updateData: UserModel) => {
    const updatedUser = { ...data?.user, ...updateData };

    localStorage.setItem("gcc_ticket/user", JSON.stringify(updatedUser));
    setData((old) => ({ token: old.token, user: updatedUser }));
  };

  const signIn = async (code: string, password: string) => {
    setLoading(true);
    try {
      const { data }: any = await api.post("/auth/login", {
        registration_code: code,
        password,
      });

      const { token, user } = data;
      api.defaults.headers.Authorization = `Bearer ${token}`;
      setData(() => ({
        user,
        token,
      }));

      localStorage.setItem("gcc_ticket/token", token);
      localStorage.setItem("gcc_ticket/user", JSON.stringify(user));

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast.error("Falha no login verifique dados e tente novamente");
    }
  };

  return (
    <AuthContext.Provider
      value={{
        signed: !!data.user,
        loading,
        user: data.user,
        signIn,
        signOut,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);
  return context;
}
