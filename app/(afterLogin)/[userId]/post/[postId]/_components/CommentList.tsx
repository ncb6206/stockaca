'use client';

import Loading from '@/app/loading';
import PostCard from '@/app/(afterLogin)/_components/PostCard';
import { IPostCommentProps, IPostData } from '@/app/_types/post';
import useGetCommentList from '@/app/(afterLogin)/[userId]/post/[postId]/_hooks/useGetCommentList';

const CommentList = ({ userId, postId }: IPostCommentProps) => {
  const { post, comments, hasNextPage, ref } = useGetCommentList({ postId });

  console.log(post, comments);

  if (!post) {
    return null;
  }

  return (
    <div className="flex h-full w-full flex-col">
      {comments?.map(comment => (
        <PostCard
          key={comment.commentId}
          postId={comment.commentId}
          post={comment.comment as IPostData}
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
