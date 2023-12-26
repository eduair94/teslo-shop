import { create } from 'zustand';

interface State {
  isLoading: boolean;
  setLoading: (isLoading: boolean) => void;
  isSideMenuOpen: boolean;
  openSideMenu: () => void;
  closeSideMenu: () => void;
}

export const useUIStore = create<State>((set) => ({
  isSideMenuOpen: false,
  isLoading: false,
  setLoading: (isLoading: boolean) => set({ isLoading }),
  openSideMenu: () => set({ isSideMenuOpen: true }),
  closeSideMenu: () => set({ isSideMenuOpen: false }),
}));
