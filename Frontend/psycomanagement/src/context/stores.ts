import { create } from "zustand";
import { ProfileInfo } from "../types/models";
import { AuthResponse } from "./AuthContext";

interface InfoProfileState {
  infoProfile: ProfileInfo | null;
  setInfoProfile: (info: ProfileInfo) => void;
  clearInfoProfile: () => void;
  updateInfoProfile: (info: Partial<ProfileInfo>) => void;
}

export const useInfoProfile = create<InfoProfileState>((set) => ({
  infoProfile: null,
  setInfoProfile: (info) => set({ infoProfile: info }),
  clearInfoProfile: () => set({ infoProfile: null }),
  updateInfoProfile: (info) =>
    set((state) => ({
      infoProfile: state.infoProfile
        ? { ...state.infoProfile, ...info }
        : state.infoProfile,
    })),
}));

interface AuthUserState {
  user: AuthResponse | null;
  setUser: (user: AuthResponse | null) => void;
  clearUser: () => void;
  updateUser: (user: Partial<AuthResponse>) => void;
}

export const useAuthUser = create<AuthUserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: null }),
  updateUser: (user) =>
    set((state) => ({
      user: state.user ? { ...state.user, ...user } : state.user,
    })),
}));
