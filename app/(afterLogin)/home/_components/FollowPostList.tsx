'use client';

import useOnAuth from '@/app/_hooks/useOnAuth';
import PostCard from '@/app/(afterLogin)/_components/PostCard';
import useFollowPostList from '@/app/(afterLogin)/home/_hooks/useFollowPostList';

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
      {followPostData?.map(post => (
        <PostCard key={post.postId} postData={post} />
      ))}
    </div>
  );
};

export default FollowPostList;
