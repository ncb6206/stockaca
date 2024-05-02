import { getDocs, query, where } from 'firebase/firestore';
import { QueryFunction } from '@tanstack/react-query';

import { FOLLOW_COLLECTION } from '@/app/firebase';
import { IFollowData } from '@/app/types/follow';

export const getFollowData: QueryFunction<
  IFollowData | null,
  [_1: string, _2: string]
> = async ({ queryKey }) => {
  // eslint-disable-next-line no-unused-vars
  const [_1, userId] = queryKey;
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
