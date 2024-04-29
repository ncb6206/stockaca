import { deleteDoc, doc } from 'firebase/firestore';

import { db } from '@/app/firebase';

interface IDeletePost {
  postId: string;
}

export const deletePost = async ({ postId }: IDeletePost) => {
  try {
    const postRef = doc(db, 'Feed', postId);
    await deleteDoc(postRef);

    return true;
  } catch (error) {
    console.log('Error deleting post:', error);
    throw new Error('Failed to delete post');
  }
};
