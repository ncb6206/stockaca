import { QueryFunction } from '@tanstack/react-query';
import { getDocs, query, where, orderBy } from 'firebase/firestore';
import { FEED_COLLECTION } from '@/app/firebase';

import { IPostData, IPostListData } from '@/app/types/post';
import { getFollowData } from '@/app/(afterLogin)/users/[userId]/_lib/getFollowData';

export const getFollowingPostList: QueryFunction<
  IPostListData[] | null,
  [_1: string, _2: string, _3: string]
> = async ({ queryKey, signal, meta }) => {
  // eslint-disable-next-line no-unused-vars
  const [_1, userId, _3] = queryKey;

  try {
    const followData = await getFollowData({
      queryKey: ['follow', userId],
      signal,
      meta,
    });
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
