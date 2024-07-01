import { FEED_COLLECTION } from '@/app/firebase';
import { IPostData, IPostId } from '@/app/_types/post';
import { doc, getDoc } from 'firebase/firestore';

export const getPost = async ({ postId }: IPostId) => {
  try {
    const q = doc(FEED_COLLECTION, postId);
    const post = await getDoc(q);

    return post ? (post.data() as IPostData) : null;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
