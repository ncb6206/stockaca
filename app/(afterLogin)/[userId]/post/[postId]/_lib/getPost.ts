import { FEED_COLLECTION } from '@/app/firebase';
import { IPostData } from '@/app/types/post';
import { QueryFunction } from '@tanstack/react-query';
import { getDocs, query } from 'firebase/firestore';

export const getPost: QueryFunction<
  IPostData | null,
  [_1: string, _2: string, _3: string]
> = async ({ queryKey }) => {
  // eslint-disable-next-line no-unused-vars
  const [userId, _1, postId] = queryKey;
  try {
    const q = query(FEED_COLLECTION);
    const postSnapshot = await getDocs(q);
    const post = postSnapshot.docs.find(doc => doc.id === postId);

    return post ? (post.data() as IPostData) : null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
