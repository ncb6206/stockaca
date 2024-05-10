import { USER_COLLECTION } from '@/app/firebase';
import { getDocs, query } from 'firebase/firestore';

import { hashUid } from '@/app/_utils/hashUid';
import { IUserId } from '@/app/_types/user';

export const getUserServer = async ({ userId }: IUserId) => {
  try {
    const q = query(USER_COLLECTION);
    const querySnapshot = await getDocs(q);
    const user = querySnapshot.docs.find(
      doc => hashUid({ uid: doc.id }) === userId,
    );

    return user ? user.data() : null;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
