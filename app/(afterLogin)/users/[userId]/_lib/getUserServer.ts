import { USER_COLLECTION } from '@/app/firebase';
import { getDocs, query } from 'firebase/firestore';

import { hashUid } from '@/app/_lib/hashUid';

interface getUserProps {
  queryKey: [string, string];
}

export const getUserServer = async ({ queryKey }: getUserProps) => {
  // eslint-disable-next-line no-unused-vars
  const [_1, userId] = queryKey;
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
