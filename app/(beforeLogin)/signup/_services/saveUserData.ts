import { User } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { db } from '@/app/firebase';
import { SignUpInputs } from '@/app/(beforeLogin)/signup/_hooks/useSignUpForm';

interface ISaveUserData {
  user: User;
  data: SignUpInputs;
}

const saveUserData = async ({ user, data }: ISaveUserData) => {
  const collectionUser = doc(db, 'User', user.uid);
  const userData = {
    name: data.name,
    email: user.email,
    nickname: data.nickname,
    profileImage: user.photoURL,
    bio: data.bio,
    createdAt: Date.now(),
    updatedAt: Date.now(),
  };
  await setDoc(collectionUser, userData);
};

export default saveUserData;
