import { create } from "zustand";
import bcrypt from "bcryptjs";
import { API_BASE_URL } from "../config/elementals";

interface User {
  token: string;
  id: string;
  names: string;
}

interface AuthState {
  user: User | null;
  mode: boolean;
  infoProfile: Record<string, unknown>;
  setModeAuth: (value: boolean) => void;
  postSignIn: (data: any) => Promise<any>;
  postSignUp: (data: any) => Promise<any>;
  getToken: () => string | null;
  getId: () => string | null;
  logOff: () => void;
  setInfoProfile: (info: Record<string, unknown>) => void;
  clearInfoProfile: () => void;
  updateInfoProfile: (info: Record<string, unknown>) => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  mode: false,
  infoProfile: {},

  setModeAuth: (value) => set({ mode: value }),

  postSignUp: async (data) => {
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
  },

  postSignIn: async (data) => {
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
    set({ user: resData });
    get().storeToken(resData);
    return resData;
  },

  storeToken: (data: User) => {
    sessionStorage.setItem("token", data.token);
    sessionStorage.setItem("id", data.id);
  },

  getToken: () => {
    const token = sessionStorage.getItem("token");
    return token;
  },

  getId: () => {
    const id = sessionStorage.getItem("id");
    return id;
  },

  logOff: () => {
    sessionStorage.removeItem("token");
    set({ user: null });
  },

  setInfoProfile: (info) => set({ infoProfile: info }),
  clearInfoProfile: () => set({ infoProfile: {} }),
  updateInfoProfile: (info) =>
    set((state) => ({ infoProfile: { ...state.infoProfile, ...info } })),
}));
