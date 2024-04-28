import {
  deleteDoc,
  doc,
  getDocs,
  increment,
  query,
  updateDoc,
  where,
} from 'firebase/firestore';

import { LIKE_COLLECTION, db } from '@/app/firebase';
import { ILikeData } from '@/app/types/like';

export const unLikePost = async ({ userId, postId }: ILikeData) => {
  try {
    const postRef = doc(db, 'Feed', postId);
    const likeQuery = query(
      LIKE_COLLECTION,
      where('feedId', '==', postId),
      where('userId', '==', userId),
    );
    const likeSnapshot = await getDocs(likeQuery);

    if (!likeSnapshot.empty) {
      const likeDoc = likeSnapshot.docs[0];
      const likeId = likeDoc.id;
      const likeRef = doc(db, 'Like', likeId);
      await deleteDoc(likeRef);
    }

    await updateDoc(postRef, {
      likeCount: increment(-1),
    });

    console.log('좋아요 취소');

    return true;
  } catch (error) {
    console.log('Error deleting post:', error);
    throw new Error('Failed to delete post');
  }
};
