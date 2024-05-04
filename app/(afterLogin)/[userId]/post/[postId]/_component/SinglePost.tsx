'use client';

import PostCard from '@/app/(afterLogin)/_component/PostCard';
import useGetSinglePost from '@/app/(afterLogin)/[userId]/post/[postId]/_hook/useGetSinglePost';

export interface SinglePostProps {
  userId: string;
  postId: string;
}

const SinglePost = ({ userId, postId }: SinglePostProps) => {
  const { data: postData, error } = useGetSinglePost({ userId, postId });

  if (!postData || error) {
    return <div>이런! 페이지를 찾을 수 없습니다.</div>;
  }

  return <PostCard post={postData} postId={postId} />;
};

export default SinglePost;
