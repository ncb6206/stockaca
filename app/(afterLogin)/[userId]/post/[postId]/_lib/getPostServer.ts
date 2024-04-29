import { FEED_COLLECTION } from '@/app/firebase';
import { doc, getDoc } from 'firebase/firestore';

interface getPostProps {
  queryKey: [string, string, string];
}

export const getPostServer = async ({ queryKey }: getPostProps) => {
  // eslint-disable-next-line no-unused-vars
  const [userId, _1, postId] = queryKey;
  try {
    const q = doc(FEED_COLLECTION, postId);
    const post = await getDoc(q);

    return post ? post.data() : null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
