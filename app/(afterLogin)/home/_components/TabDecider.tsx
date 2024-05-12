'use client';

import PostList from '@/app/(afterLogin)/home/_components/PostList';
import FollowPostList from '@/app/(afterLogin)/home/_components/FollowPostList';
import { useTabStore } from '@/app/_store/useTab';

const TabDecider = () => {
  const { tab } = useTabStore();

  if (tab === 'main') {
    return <PostList />;
  }

  return <FollowPostList />;
};

export default TabDecider;
