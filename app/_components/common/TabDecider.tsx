'use client';

import dynamic from 'next/dynamic';
import PostList from '@/app/_components/post/PostList';
import { useTabStore } from '@/app/_store/useTab';

const FollowPostList = dynamic(() => import('@/app/_components/post/FollowPostList'));

const TabDecider = () => {
  const { tab } = useTabStore();

  if (tab === 'main') {
    return <PostList />;
  }

  return <FollowPostList />;
};

export default TabDecider;
