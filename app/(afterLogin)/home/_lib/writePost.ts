import { addDoc, updateDoc } from 'firebase/firestore';

import { FEED_COLLECTION } from '@/app/firebase';
import { User } from 'firebase/auth';
import { PostInputs } from '@/app/(afterLogin)/post/_component/PostForm';
import { handleUpload } from '@/app/(beforeLogin)/_lib/handleUpload';

interface IWritePost {
  user?: User | null;
  data: PostInputs;
}

export const writePost = async ({ user, data }: IWritePost) => {
  try {
    if (user) {
      const postRef = FEED_COLLECTION;
      const feedData = {
        userId: user?.uid,
        comment: [],
        commentCount: 0,
        like: [],
        likeCount: 0,
        content: data.content,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        photoUrl: [],
      };
      const newDocRef = await addDoc(postRef, feedData);

      if (data.photoUrl[0]) {
        const imageUrl = await handleUpload({
          selectedFile: data.photoUrl[0],
          collectionName: newDocRef.id,
        });

        await updateDoc(newDocRef, { photoUrl: [imageUrl] });
      }

      return true;
    }
  } catch (error) {
    console.log('Error writing post:', error);
    throw new Error('Failed to write post');
  }
};
