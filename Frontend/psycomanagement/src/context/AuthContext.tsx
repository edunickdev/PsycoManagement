import { createContext, useContext, useState, ReactNode } from "react";
import bcrypt from "bcryptjs";
import { API_BASE_URL } from "../config/elementals";

interface User {
  token: string;
  id: string;
  names: string;
}

interface AuthContextType {
  user: User | null;
  mode: boolean;
  setModeAuth: (value: boolean) => void;
  postSignIn: ({ data }: { data: any }) => Promise<any>;
  postSignUp: ({ data }: { data: any }) => Promise<any>;
  getToken: () => string | null;
  getId: () => string | null;
  logOff: () => void;
}

export const AuthTherapist = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [mode, setMode] = useState(false);

  const postSignUp = async ({ data }: { data: any }): Promise<any> => {
    const urlApi = `${API_BASE_URL}auth/sign-up`;
    const hashedPassword = await bcrypt.hash(data.Password, 10);
    const requestData = {
      names: data.Nombre + " " + data.Apellido,
      email: data.Email,
      password: hashedPassword,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    };
    const res = await fetch(urlApi, requestOptions);
    const resData = await res.json();
    return resData;
  };

  const postSignIn = async ({ data }: { data: any }): Promise<any> => {
    const urlApi = `${API_BASE_URL}auth/login`;
    const requestData = {
      email: data.Email,
      password: data.Password,
    };
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(requestData),
    };
    const res = await fetch(urlApi, requestOptions);
    const resData = await res.json();
    setUser(resData);
    storeToken(resData);
    return resData;
  };

  const storeToken = (data: User) => {
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("id", data.id);
  };

  const getToken = (): string | null => {
    const token = sessionStorage.getItem("token");
    return token;
  };

  const getId = (): string | null => {
    const id = sessionStorage.getItem("id");
    return id;
  };

  const logOff = (): void => {
    sessionStorage.removeItem("token");
    setUser(null);
  };

  const setModeAuth = (value: boolean): void => {
    setMode(value);
  };

  return (
    <AuthTherapist.Provider
      value={{
        user,
        mode,
        setModeAuth,
        postSignIn,
        postSignUp,
        getToken,
        getId,
        logOff,
      }}
    >
      {children}
    </AuthTherapist.Provider>
  );
};

export const TherapistAuth = () => {
  const context = useContext(AuthTherapist);
  if (context === undefined) {
    throw new Error("TherapistAuth must be used within an AuthContextProvider");
  }
  return context;
};
