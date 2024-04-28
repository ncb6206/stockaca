import { USER_COLLECTION } from '@/app/firebase';
import { getDocs, query } from 'firebase/firestore';
import { QueryFunction } from '@tanstack/react-query';

import { hashUid } from '@/app/_lib/hashUid';
import { IUserData } from '@/app/types/user';

export const getUser: QueryFunction<
  IUserData | null,
  [_1: string, _2: string]
> = async ({ queryKey }) => {
  // eslint-disable-next-line no-unused-vars
  const [_1, userId] = queryKey;
  try {
    const q = query(USER_COLLECTION);
    const querySnapshot = await getDocs(q);
    const user = querySnapshot.docs.find(
      doc => hashUid({ uid: doc.id }) === userId,
    );

    return user ? (user.data() as IUserData) : null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
