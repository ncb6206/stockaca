'use client';

import dynamic from 'next/dynamic';
import PostList from '@/app/(afterLogin)/home/_components/PostList';
import { useTabStore } from '@/app/_store/useTab';

const FollowPostList = dynamic(
  () => import('@/app/(afterLogin)/home/_components/FollowPostList'),
);

const TabDecider = () => {
  const { tab } = useTabStore();

  if (tab === 'main') {
    return <PostList />;
  }

  return <FollowPostList />;
};

export default TabDecider;
