import { User } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

import { db, storage } from '@/app/firebase';
import { IPostInputs, IUpdatePost } from '@/app/_types/post';
import { handleUpload } from '@/app/_api/Image/handleUpload';
import { deleteObject, ref } from 'firebase/storage';

interface IWritePost {
  user?: User | null;
  data: IPostInputs;
  postId: string;
}

export const updatePost = async ({ user, data, postId }: IWritePost) => {
  try {
    if (user) {
      const postRef = doc(db, 'Feed', postId);
      const postSnapshot = await getDoc(postRef);

      if (postSnapshot.exists()) {
        const postData = postSnapshot.data();
        const updatedData: Partial<IUpdatePost> = {
          content: data.content,
          updatedAt: Date.now(),
        };

        if (data.photoUrl[0]) {
          if (postData.photoUrl && postData.photoUrl.length > 0) {
            const oldImageRef = ref(storage, postData.photoUrl[0]);
            await deleteObject(oldImageRef);
          }

          const imageUrl = await handleUpload({
            selectedFile: data.photoUrl[0],
            collectionName: postRef.id,
          });

          if (imageUrl) {
            updatedData.photoUrl = [imageUrl];
          }
        }

        await updateDoc(postRef, updatedData);
        return true;
      }
    }
  } catch (error) {
    console.log('Error updating post:', error);
    throw new Error('Failed to update post');
  }
};
