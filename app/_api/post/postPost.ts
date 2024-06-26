import { addDoc, doc, increment, updateDoc } from 'firebase/firestore';

import { FEED_COLLECTION } from '@/app/firebase';
import { User } from 'firebase/auth';

import { IPostInputs } from '@/app/_types/post';
import { handleUpload } from '@/app/_api/Image/handleUpload';

interface IPostPost {
  user?: User | null;
  data: IPostInputs;
  parentPostId?: string;
}

export const postPost = async ({ user, data, parentPostId }: IPostPost) => {
  try {
    if (user) {
      const postRef = FEED_COLLECTION;
      const feedData = {
        userId: user?.uid,
        commentCount: 0,
        likeCount: 0,
        content: data.content,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        photoUrl: [],
        parentFeedId: parentPostId || '',
        hashedUserId: user.displayName,
      };
      const newDocRef = await addDoc(postRef, feedData);

      if (data.photoUrl[0]) {
        const imageUrl = await handleUpload({
          selectedFile: data.photoUrl[0],
          collectionName: newDocRef.id,
        });

        await updateDoc(newDocRef, { photoUrl: [imageUrl] });
      }

      if (parentPostId) {
        const parentPostRef = doc(FEED_COLLECTION, parentPostId);
        await updateDoc(parentPostRef, {
          commentCount: increment(1),
        });
      }

      return true;
    }
  } catch (error) {
    console.log('Error writing post:', error);
    throw new Error('Failed to write post');
  }
};
