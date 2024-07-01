import { deleteDoc, doc, increment, updateDoc } from 'firebase/firestore';

import { FEED_COLLECTION, db } from '@/app/firebase';

interface IDeletePost {
  postId: string;
  parentPostId?: string;
}

export const deletePost = async ({ postId, parentPostId }: IDeletePost) => {
  try {
    const postRef = doc(db, 'Feed', postId);
    await deleteDoc(postRef);

    if (parentPostId) {
      const parentPostRef = doc(FEED_COLLECTION, parentPostId);
      await updateDoc(parentPostRef, {
        commentCount: increment(-1),
      });
    }

    return true;
  } catch (error) {
    console.log('Error deleting post:', error);
    throw new Error('Failed to delete post');
  }
};
