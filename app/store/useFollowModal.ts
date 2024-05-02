import { create } from 'zustand';

interface FollowModalStore {
  isOpen: boolean;
  userId: string;
  onSetUserId: (id: string) => void;
  onReSetUserId: () => void;
  onChange: () => void;
  onOpen: () => void;
  onClose: () => void;
}

const useFollowModalStore = create<FollowModalStore>(set => ({
  isOpen: false,
  userId: '',
  onSetUserId: (id: string) => set({ userId: id }),
  onReSetUserId: () => set({ userId: '' }),
  onChange: () =>
    set(state => {
      if (state.isOpen) {
        state.onReSetUserId();
      }
      const changedIsOpen = !state.isOpen;

      return { isOpen: changedIsOpen };
    }),
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useFollowModalStore;
