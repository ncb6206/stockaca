'use client';

import { useContext } from 'react';
import { TabContext } from '@/app/(afterLogin)/home/_component/TabProvider';
import PostList from '@/app/(afterLogin)/home/_component/PostList';
import FollowPostList from '@/app/(afterLogin)/home/_component/FollowPostList';

const TabDecider = () => {
  const { tab } = useContext(TabContext);

  if (tab === 'main') {
    return <PostList />;
  }

  return <FollowPostList />;
};

export default TabDecider;
