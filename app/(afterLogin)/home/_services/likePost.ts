import { addDoc, doc, increment, updateDoc } from 'firebase/firestore';

import { LIKE_COLLECTION, db } from '@/app/firebase';
import { ILikeData } from '@/app/_types/like';

export const likePost = async ({ postId, userId }: ILikeData) => {
  try {
    const postRef = doc(db, 'Feed', postId);
    const likeRef = LIKE_COLLECTION;
    const likeData = {
      createdAt: Date.now(),
      feedId: postId,
      userId,
    };
    await addDoc(likeRef, likeData);

    await updateDoc(postRef, {
      likeCount: increment(1),
    });

    console.log('좋아요');
    return true;
  } catch (error) {
    console.log('Error like post:', error);
    throw new Error('Failed to like post');
  }
};
