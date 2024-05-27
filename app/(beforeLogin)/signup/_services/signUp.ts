import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';

import { SignUpInputs } from '@/app/(beforeLogin)/signup/_hooks/useSignUpForm';
import { handleUpload } from '@/app/_services/handleUpload';
import { hashUid } from '@/app/_utils/hashUid';
import { auth } from '@/app/firebase';
import saveUserData from '@/app/(beforeLogin)/signup/_services/saveUserData';

const SignUp = async (data: SignUpInputs) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      data.email,
      data.password,
    );
    const user = userCredential.user;
    const imageUrl = await handleUpload({
      selectedFile: data.profileImage[0],
      collectionName: user.uid,
    });
    await updateProfile(user, {
      displayName: hashUid({ uid: user.uid }),
      photoURL: imageUrl,
    });

    await saveUserData({ user, data });
    return true;
  } catch (error) {
    return false;
  }
};

export default SignUp;
