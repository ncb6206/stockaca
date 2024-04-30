import { create } from 'zustand';
import { IPostData } from '../types/post';

interface PostState {
  mode: 'new' | 'comment';
  data: IPostData | null;
  parentPostId: string;
  setMode: (mode: 'new' | 'comment') => void;
  setData: (data: IPostData) => void;
  setParentPostId: (postId: string) => void;
  reset: () => void;
}

export const usePostStore = create<PostState>(set => ({
  mode: 'new',
  data: null,
  parentPostId: '',
  setMode: mode => {
    set({
      mode,
    });
  },
  setData: data => {
    set({ data });
  },
  setParentPostId: parentPostId => {
    set({ parentPostId });
  },
  reset: () => {
    set({
      mode: 'new',
      data: null,
    });
  },
}));
