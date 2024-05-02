'use client';

import { Suspense } from 'react';
import { useQuery } from '@tanstack/react-query';

import useOnAuth from '@/app/_lib/useOnAuth';
import { IPostListData } from '@/app/types/post';
import { getFollowingPostList } from '@/app/(afterLogin)/home/_lib/getFollowingPostList';
import Loading from '@/app/(afterLogin)/home/loading';
import PostCard from '../../_component/PostCard';

const FollowPostList = () => {
  const { user } = useOnAuth();

  const { data: followPostData, isLoading } = useQuery<
    IPostListData[] | null,
    Object,
    IPostListData[],
    [_1: string, _2: string, _3: string]
  >({
    queryKey: ['post', user?.displayName as string, 'following'],
    queryFn: getFollowingPostList,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
    enabled: !!user?.displayName,
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
