import { USER_COLLECTION } from '@/app/firebase';
import { getDocs, query } from 'firebase/firestore';

import { hashUid } from '@/app/_lib/hashUid';
import { IUserData, IUserId } from '@/app/types/user';

export const getUser = async ({ userId }: IUserId) => {
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
