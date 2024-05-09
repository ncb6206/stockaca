import { getDocs, query, where } from 'firebase/firestore';

import { FOLLOW_COLLECTION } from '@/app/firebase';
import { IUserId } from '@/app/types/user';

export const getFollowData = async ({ userId }: IUserId) => {
  try {
    const followingQuery = query(
      FOLLOW_COLLECTION,
      where('followingUserId', '==', userId),
    );

    const followerQuery = query(
      FOLLOW_COLLECTION,
      where('followerUserId', '==', userId),
    );

    const followingQuerySnapshot = await getDocs(followingQuery);
    const followingUsers = followingQuerySnapshot.docs.map(
      doc => doc.data().followerUserId,
    );

    const followerQuerySnapshot = await getDocs(followerQuery);
    const followerUsers = followerQuerySnapshot.docs.map(
      doc => doc.data().followingUserId,
    );

    const followData = {
      followerUserId: followingUsers || [],
      followingUserId: followerUsers || [],
    };

    return followData;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
