import { create } from 'zustand';

interface TabState {
  tab: 'main' | 'fol';
  setTab: (tab: 'main' | 'fol') => void;
}

export const useTabStore = create<TabState>(set => ({
  tab: 'main',
  setTab: tab => {
    set({
      tab,
    });
  },
}));
