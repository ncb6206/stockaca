'use client';

import { useQuery } from '@tanstack/react-query';

import { IPostData } from '@/app/types/post';
import { getPost } from '@/app/(afterLogin)/[userId]/post/[postId]/_lib/getPost';
import PostCard from '@/app/(afterLogin)/_component/PostCard';

interface SinglePostProps {
  userId: string;
  postId: string;
}

const SinglePost = ({ userId, postId }: SinglePostProps) => {
  const { data: postData, error } = useQuery<
    IPostData | null,
    Object,
    IPostData,
    [_1: string, _2: string, _3: string]
  >({
    queryKey: [userId, 'post', postId],
    queryFn: getPost,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if (!postData || error) {
    return <div>이런! 페이지를 찾을 수 없습니다.</div>;
  }

  return <PostCard post={postData} postId={postId} />;
};

export default SinglePost;
