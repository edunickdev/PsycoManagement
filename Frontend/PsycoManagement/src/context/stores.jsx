import { create } from 'zustand'


export const useInfoProfile = create((set) => ({
    infoProfile: {},
    setInfoProfile: (info) => set({ infoProfile: info }),
    clearInfoProfile: () => set({ infoProfile: {} }),
    updateInfoProfile: (info) => set((state) => ({ infoProfile: { ...state.infoProfile, ...info } })),
}));


export const useAuthUser = create((set) => ({
    user: {},
    setUser: (user) => set({ user }),
    clearUser: () => set({ user: {} }),
    updateUser: (user) => set((state) => ({ user: { ...state.user, ...user } })),
}));


