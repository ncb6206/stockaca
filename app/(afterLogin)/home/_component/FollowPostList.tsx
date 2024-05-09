'use client';

import { Suspense } from 'react';

import useOnAuth from '@/app/_lib/useOnAuth';
import Loading from '@/app/(afterLogin)/home/loading';
import PostCard from '@/app/(afterLogin)/_component/PostCard';
import useFollowPostList from '@/app/(afterLogin)/home/_hook/useFollowPostList';

const FollowPostList = () => {
  const { user } = useOnAuth();
  const { data: followPostData, isLoading } = useFollowPostList({
    userId: user?.displayName as string,
  });

  if (!isLoading && !followPostData) {
    return <div>팔로잉 중인 유저의 포스트가 없습니다...</div>;
  }

  return (
    <div className="flex h-full w-full flex-col">
      <Suspense fallback={<Loading />}>
        {followPostData?.map(post => (
          <PostCard key={post.postId} postId={post.postId} post={post.post} />
        ))}
      </Suspense>
    </div>
  );
};

export default FollowPostList;
