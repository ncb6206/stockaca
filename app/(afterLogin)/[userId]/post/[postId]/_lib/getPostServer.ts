import { FEED_COLLECTION } from '@/app/firebase';
import { getDocs, query } from 'firebase/firestore';

interface getPostProps {
  queryKey: [string, string, string];
}

export const getPostServer = async ({ queryKey }: getPostProps) => {
  // eslint-disable-next-line no-unused-vars
  const [userId, _1, postId] = queryKey;
  try {
    const q = query(FEED_COLLECTION);
    const postSnapshot = await getDocs(q);
    const post = postSnapshot.docs.find(doc => doc.id === postId);

    return post ? post.data() : null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
