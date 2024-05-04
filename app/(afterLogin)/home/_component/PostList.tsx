'use client';

import { Suspense } from 'react';

import PostCard from '@/app/(afterLogin)/_component/PostCard';
import { IPostData } from '@/app/types/post';
import Loading from '@/app/(afterLogin)/home/loading';
import usePostList from '@/app/(afterLogin)/home/_hook/usePostList';

const PostList = () => {
  const { posts, hasNextPage, ref } = usePostList();

  return (
    <div className="flex h-full w-full flex-col">
      <Suspense fallback={<Loading />}>
        {posts?.map(post => (
          <PostCard
            key={post.postId}
            postId={post.postId}
            post={post.post as IPostData}
          />
        ))}
      </Suspense>
      {hasNextPage && (
        <div ref={ref} className="flex h-16 items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default PostList;
