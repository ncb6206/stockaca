import { getDocs, query, where, orderBy } from 'firebase/firestore';
import { FEED_COLLECTION } from '@/app/firebase';

import { IPostData } from '@/app/_types/post';
import { getFollowData } from '@/app/(afterLogin)/users/[userId]/_services/getFollowData';
import { IUserId } from '@/app/_types/user';

export const getFollowingPostList = async ({ userId }: IUserId) => {
  try {
    const followData = await getFollowData({ userId });
    const followingUserIds = followData?.followingUserId || [];

    const feedQuery = query(
      FEED_COLLECTION,
      where('hashedUserId', 'in', followingUserIds),
      where('parentFeedId', '==', ''),
      orderBy('createdAt', 'desc'),
    );

    const feedQuerySnapshot = await getDocs(feedQuery);
    const feeds = feedQuerySnapshot.docs.map(doc => ({
      postId: doc.id,
      post: doc.data() as IPostData,
    }));

    return feeds || [];
  } catch (error) {
    console.error(error);
    throw error;
  }
};
