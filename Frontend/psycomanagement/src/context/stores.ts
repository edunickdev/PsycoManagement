import { create } from "zustand";

interface InfoProfileState {
  infoProfile: Record<string, unknown>;
  setInfoProfile: (info: Record<string, unknown>) => void;
  clearInfoProfile: () => void;
  updateInfoProfile: (info: Record<string, unknown>) => void;
}

export const useInfoProfile = create<InfoProfileState>((set) => ({
  infoProfile: {},
  setInfoProfile: (info) => set({ infoProfile: info }),
  clearInfoProfile: () => set({ infoProfile: {} }),
  updateInfoProfile: (info) =>
    set((state) => ({ infoProfile: { ...state.infoProfile, ...info } })),
}));

interface AuthUserState {
  user: Record<string, unknown>;
  setUser: (user: Record<string, unknown>) => void;
  clearUser: () => void;
  updateUser: (user: Record<string, unknown>) => void;
}

export const useAuthUser = create<AuthUserState>((set) => ({
  user: {},
  setUser: (user) => set({ user }),
  clearUser: () => set({ user: {} }),
  updateUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
}));
