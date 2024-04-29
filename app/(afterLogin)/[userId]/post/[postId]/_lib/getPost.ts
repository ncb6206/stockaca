import { FEED_COLLECTION } from '@/app/firebase';
import { IPostData } from '@/app/types/post';
import { QueryFunction } from '@tanstack/react-query';
import { doc, getDoc } from 'firebase/firestore';

export const getPost: QueryFunction<
  IPostData | null,
  [_1: string, _2: string, _3: string]
> = async ({ queryKey }) => {
  // eslint-disable-next-line no-unused-vars
  const [userId, _1, postId] = queryKey;
  try {
    const q = doc(FEED_COLLECTION, postId);
    const post = await getDoc(q);

    return post ? (post.data() as IPostData) : null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
