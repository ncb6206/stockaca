'use client';

import PostCard from '@/app/_components/post/PostCard';
import useSinglePostQuery from '@/app/_hooks/api/useSinglePostQuery';
import { IPostId } from '@/app/_types/post';

const SinglePost = ({ postId }: IPostId) => {
  const { postData, error } = useSinglePostQuery({ postId });

  if (!postData || error) {
    return <div>이런! 페이지를 찾을 수 없습니다.</div>;
  }

  return <PostCard postData={postData} />;
};

export default SinglePost;
