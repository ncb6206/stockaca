import { USER_COLLECTION } from '@/app/firebase';
import { getDocs, query } from 'firebase/firestore';

import { hashUid } from '@/app/_lib/hashUid';

interface getUserProps {
  uid: string;
}

export const getUser = async ({ uid }: getUserProps) => {
  try {
    const q = query(USER_COLLECTION);
    const querySnapshot = await getDocs(q);
    const user = querySnapshot.docs.find(
      doc => hashUid({ uid: doc.id }) === uid,
    );

    return user ? user.data() : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
