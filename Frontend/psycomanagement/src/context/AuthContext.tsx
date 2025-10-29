import { createContext, useContext, useState, ReactNode } from "react";
import bcrypt from "bcryptjs";
import { API_BASE_URL } from "../config/elementals";

interface SignUpPayload {
  Nombre: string;
  Apellido: string;
  Email: string;
  Password: string;
}

interface SignInPayload {
  Email: string;
  Password: string;
}

export interface AuthResponse {
  id?: string;
  token?: string;
  names?: string;
  status?: string;
  message?: string;
  [key: string]: unknown;
}

interface AuthContextValue {
  user: AuthResponse | null;
  mode: boolean;
  setModeAuth: (value: boolean) => void;
  postSignIn: (payload: { data: SignInPayload }) => Promise<AuthResponse>;
  postSignUp: (payload: { data: SignUpPayload }) => Promise<AuthResponse>;
  getToken: () => string | null;
  getId: () => string | null;
  logOff: () => void;
}

export const AuthTherapist = createContext<AuthContextValue | undefined>(undefined);

interface AuthContextProviderProps {
  children: ReactNode;
}

export const AuthContextProvider = ({ children }: AuthContextProviderProps): JSX.Element => {
  const [user, setUser] = useState<AuthResponse | null>(null);
  const [mode, setMode] = useState(false);

  const postSignUp = async ({ data }: { data: SignUpPayload }): Promise<AuthResponse> => {
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
    const resData: AuthResponse = await res.json();
    return resData;
  };

  const postSignIn = async ({ data }: { data: SignInPayload }): Promise<AuthResponse> => {
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
    const resData: AuthResponse = await res.json();
    setUser(resData);
    storeToken(resData);
    return resData;
  };

  const storeToken = (data: AuthResponse) => {
    if (data.token) {
      sessionStorage.setItem("token", data.token);
    }
    if (data.id) {
      sessionStorage.setItem("id", data.id);
    }
  };

  const getToken = (): string | null => sessionStorage.getItem("token");

  const getId = (): string | null => sessionStorage.getItem("id");

  const logOff = (): void => {
    sessionStorage.removeItem("token");
    setUser(null);
  };

  const setModeAuth = (value: boolean) => {
    setMode(value);
  };

  const value: AuthContextValue = {
    user,
    mode,
    setModeAuth,
    postSignIn,
    postSignUp,
    getToken,
    getId,
    logOff,
  };

  return (
    <AuthTherapist.Provider value={value}>
      {children}
    </AuthTherapist.Provider>
  );
};

export const TherapistAuth = (): AuthContextValue => {
  const context = useContext(AuthTherapist);

  if (!context) {
    throw new Error("TherapistAuth must be used within an AuthContextProvider");
  }

  return context;
};

