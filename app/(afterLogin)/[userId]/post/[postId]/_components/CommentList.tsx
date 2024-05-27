'use client';

import Loading from '@/app/loading';
import PostCard from '@/app/(afterLogin)/_components/PostCard';
import { IPostParams } from '@/app/_types/post';
import useGetCommentList from '@/app/(afterLogin)/[userId]/post/[postId]/_hooks/useGetCommentList';
import useGetSinglePost from '@/app/(afterLogin)/[userId]/post/[postId]/_hooks/useGetSinglePost';
import useInfiniteScroll from '@/app/_hooks/useInfiniteScroll';

const CommentList = ({ userId, postId }: IPostParams) => {
  const { postData } = useGetSinglePost({ postId });
  const { comments, hasNextPage, fetchNextPage, isFetching } =
    useGetCommentList({ postId });
  const { ref } = useInfiniteScroll({ fetchNextPage, isFetching, hasNextPage });

  console.log(postData, comments);

  if (!postData) {
    return null;
  }

  return (
    <div className="flex h-full w-full flex-col">
      {comments?.map(comment => (
        <PostCard
          key={comment.postId}
          postData={comment}
          parentPostUserId={userId}
        />
      ))}
      {hasNextPage && (
        <div ref={ref} className="flex h-16 items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default CommentList;
