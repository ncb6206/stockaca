import { FOLLOW_COLLECTION } from '@/app/firebase';
import { IFollowId } from '@/app/_types/follow';
import { addDoc } from 'firebase/firestore';

export const postFollow = async ({ currentUserId, targetUserId }: IFollowId) => {
  try {
    const followRef = FOLLOW_COLLECTION;
    const followData = {
      followerUserId: currentUserId,
      followingUserId: targetUserId,
    };

    await addDoc(followRef, followData);

    return true;
  } catch (error) {
    console.log('Error following user:', error);
    throw new Error('Failed to follow user');
  }
};
