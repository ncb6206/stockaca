'use client';

import PostList from '@/app/(afterLogin)/home/_component/PostList';
import FollowPostList from '@/app/(afterLogin)/home/_component/FollowPostList';
import { useTabStore } from '@/app/store/useTab';

const TabDecider = () => {
  const { tab } = useTabStore();

  if (tab === 'main') {
    return <PostList />;
  }

  return <FollowPostList />;
};

export default TabDecider;
