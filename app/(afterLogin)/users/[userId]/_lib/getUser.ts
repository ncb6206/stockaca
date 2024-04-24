import { USER_COLLECTION } from '@/app/firebase';
import { getDocs, query } from 'firebase/firestore';

interface getUserProps {
  email: string;
}

export const getUser = async ({ email }: getUserProps) => {
  try {
    const q = query(USER_COLLECTION);
    const querySnapshot = await getDocs(q);
    const user = querySnapshot.docs.find(doc => doc.data().email === email);

    return user ? user.data() : null;
  } catch (error) {
    console.log(error);
    return null;
  }
};
