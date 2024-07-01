'use client';

import PostCard from '@/app/_components/post/PostCard';
import Loading from '@/app/loading';
import useInfiniteScroll from '@/app/_hooks/common/useInfiniteScroll';
import usePostListInfiniteQuery from '@/app/_hooks/api/usePostListInfiniteQuery';

const PostList = () => {
  const { posts, hasNextPage, isFetching, fetchNextPage } = usePostListInfiniteQuery();
  const { ref } = useInfiniteScroll({ isFetching, hasNextPage, fetchNextPage });

  return (
    <div className="flex h-full w-full flex-col">
      {posts?.map(post => <PostCard key={post.postId} postData={post} />)}
      {hasNextPage && (
        <div ref={ref} className="flex h-16 items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default PostList;
