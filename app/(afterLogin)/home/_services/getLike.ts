import { LIKE_COLLECTION } from '@/app/firebase';
import { ILikeData } from '@/app/_types/like';
import { getDocs, query, where } from 'firebase/firestore';

export const getLike = async ({ postId, userId }: ILikeData) => {
  try {
    const likeQuery = query(
      LIKE_COLLECTION,
      where('userId', '==', userId),
      where('feedId', '==', postId),
    );
    const likeSnapshot = await getDocs(likeQuery);

    if (!likeSnapshot.empty) {
      const likeDoc = likeSnapshot.docs[0];
      const likeId = likeDoc.id;
      const likeData = likeDoc.data();
      return { ...likeData, id: likeId };
    }

    return null;
  } catch (error) {
    console.log('Error like post:', error);
    throw new Error('Failed to like post');
  }
};
