import { FEED_COLLECTION } from '@/app/firebase';
import { IPostId } from '@/app/types/post';
import { doc, getDoc } from 'firebase/firestore';

export const getPostServer = async ({ postId }: IPostId) => {
  try {
    const q = doc(FEED_COLLECTION, postId);
    const post = await getDoc(q);

    return post ? post.data() : null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
