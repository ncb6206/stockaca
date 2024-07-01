'use client';

import Loading from '@/app/loading';
import PostCard from '@/app/_components/post/PostCard';
import { IPostParams } from '@/app/_types/post';
import useGetCommentListQuery from '@/app/_hooks/api/useCommentListQuery';
import useSinglePostQuery from '@/app/_hooks/api/useSinglePostQuery';
import useInfiniteScroll from '@/app/_hooks/common/useInfiniteScroll';

const CommentList = ({ userId, postId }: IPostParams) => {
  const { postData } = useSinglePostQuery({ postId });
  const { comments, hasNextPage, fetchNextPage, isFetching } = useGetCommentListQuery({ postId });
  const { ref } = useInfiniteScroll({ fetchNextPage, isFetching, hasNextPage });

  console.log(postData, comments);

  if (!postData) {
    return null;
  }

  return (
    <div className="flex h-full w-full flex-col">
      {comments?.map(comment => <PostCard key={comment.postId} postData={comment} parentPostUserId={userId} />)}
      {hasNextPage && (
        <div ref={ref} className="flex h-16 items-center justify-center">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default CommentList;
