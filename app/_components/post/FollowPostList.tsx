'use client';

import useOnAuth from '@/app/_hooks/common/useOnAuth';
import PostCard from '@/app/_components/post/PostCard';
import useFollowPostListQuery from '@/app/_hooks/api/useFollowPostListQuery';

const FollowPostList = () => {
  const { user } = useOnAuth();
  const { data: followPostData, isLoading } = useFollowPostListQuery({
    userId: user?.displayName ?? '',
  });

  if (!isLoading && !followPostData) {
    return <div>팔로잉 중인 유저의 포스트가 없습니다...</div>;
  }

  return (
    <div className="flex h-full w-full flex-col">
      {followPostData?.map(post => <PostCard key={post.postId} postData={post} />)}
    </div>
  );
};

export default FollowPostList;
