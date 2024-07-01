import { FOLLOW_COLLECTION } from '@/app/firebase';
import { IFollowId } from '@/app/_types/follow';
import { deleteDoc, getDocs, query, where } from 'firebase/firestore';

export const deleteFollow = async ({ currentUserId, targetUserId }: IFollowId) => {
  try {
    const followQuery = query(
      FOLLOW_COLLECTION,
      where('followerUserId', '==', currentUserId),
      where('followingUserId', '==', targetUserId),
    );

    const followQuerySnapshot = await getDocs(followQuery);

    if (followQuerySnapshot.empty) {
      console.log('No follow relationship found to unfollow');
      return false;
    }

    const followDoc = followQuerySnapshot.docs[0];
    await deleteDoc(followDoc.ref);

    return true;
  } catch (error) {
    console.log('Error following user:', error);
    throw new Error('Failed to follow user');
  }
};
