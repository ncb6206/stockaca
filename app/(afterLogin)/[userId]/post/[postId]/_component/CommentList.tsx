'use client';

import Loading from '@/app/loading';
import PostCard from '@/app/(afterLogin)/_component/PostCard';
import { IPostCommentProps, IPostData } from '@/app/types/post';
import useGetCommentList from '../_hook/useGetCommentList';

const CommentList = ({ userId, postId }: IPostCommentProps) => {
  const { post, comments, hasNextPage, ref } = useGetCommentList({
    userId,
    postId,
  });

  if (post) {
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
  }
};

export default CommentList;
