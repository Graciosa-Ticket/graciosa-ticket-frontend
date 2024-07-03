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

  const updateProfile = (data: UserModel) => {
    localStorage.setItem("gcc_ticket/user", JSON.stringify(data));
    setData((old) => ({ token: old.token, user: data }));
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    try {
      //   const { data } = await api.post("/session/login", {
      //     email,
      //     password,
      //   });

      const fakeUserData: UserModel = {
        name: "Joseph",
        email: "teste@teste.com",
        id: "2",
        profile_picture:
          "https://cdn.britannica.com/34/254634-050-C62ACCB9/British-Actor-Henry-Cavill-February-2024.jpg",
      };

      setData(() => ({
        user: fakeUserData,
        token: "aaaa",
      }));

      localStorage.setItem("gcc_ticket/token", "aaaa");
      localStorage.setItem("gcc_ticket/user", JSON.stringify(fakeUserData));

      setLoading(false);
    } catch (error: any) {
      setLoading(false);
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
