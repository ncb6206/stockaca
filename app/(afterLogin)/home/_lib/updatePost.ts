import { User } from 'firebase/auth';
import { doc, updateDoc } from 'firebase/firestore';

import { db } from '@/app/firebase';
import { PostInputs } from '@/app/(afterLogin)/post/_component/PostForm';
import { handleUpload } from '@/app/(beforeLogin)/_lib/handleUpload';

interface IWritePost {
  user?: User | null;
  data: PostInputs;
  postId: string;
}

export const updatePost = async ({ user, data, postId }: IWritePost) => {
  try {
    if (user) {
      const postRef = doc(db, 'Feed', postId);
      await updateDoc(postRef, {
        content: data.content,
      });

      if (data.photoUrl[0]) {
        const imageUrl = await handleUpload({
          selectedFile: data.photoUrl[0],
          collectionName: postRef.id,
        });

        await updateDoc(postRef, { photoUrl: [imageUrl] });
      }

      return true;
    }
  } catch (error) {
    console.log('Error updating post:', error);
    throw new Error('Failed to update post');
  }
};
