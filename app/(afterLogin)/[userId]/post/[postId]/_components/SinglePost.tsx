'use client';

import PostCard from '@/app/(afterLogin)/_components/PostCard';
import useGetSinglePost from '@/app/(afterLogin)/[userId]/post/[postId]/_hooks/useGetSinglePost';
import { IPostId } from '@/app/_types/post';

const SinglePost = ({ postId }: IPostId) => {
  const { data: postData, error } = useGetSinglePost({ postId });

  if (!postData || error) {
    return <div>이런! 페이지를 찾을 수 없습니다.</div>;
  }

  return <PostCard post={postData} postId={postId} />;
};

export default SinglePost;
