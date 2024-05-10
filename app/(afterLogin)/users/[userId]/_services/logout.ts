import toast from 'react-hot-toast';
import { signOut } from 'firebase/auth';

import { auth } from '@/app/firebase';

export const logout = async () => {
  try {
    await signOut(auth);
    toast.success('로그아웃 되었습니다');
  } catch (error) {
    console.log((error as Error).message);
    toast.error('로그아웃 중 오류가 발생했습니다. 나중에 다시 시도해주세요');
  }
};
