'use client';

import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';

import { IPostCard } from '@/app/_types/post';
import useOnAuth from '@/app/_hooks/useOnAuth';
import useGetUserData from '@/app/(afterLogin)/users/[userId]/_hooks/useGetUserData';
import LikeCount from '@/app/(afterLogin)/_components/LikeCount';
import CommentCount from '@/app/(afterLogin)/_components/CommentCount';
import PostSetting from '@/app/(afterLogin)/_components/PostSetting';
import PostUserImage from '@/app/(afterLogin)/_components/PostUserImage';
import PostUserNickName from '@/app/(afterLogin)/_components/PostUserNickName';
import PostCreatedAt from '@/app/(afterLogin)/_components/PostCreatedAt';
import PostContent from '@/app/(afterLogin)/_components/PostContent';
import PostImages from '@/app/(afterLogin)/_components/PostImages';

const PostCard = ({ postData, parentPostUserId }: IPostCard) => {
  const router = useRouter();
  const { user } = useOnAuth();
  const { postId, post } = postData;
  const { data: userData } = useGetUserData({ userId: post?.hashedUserId });

  const goPost = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    router.push(`/${post.hashedUserId}/post/${postId}`);
  };

  return (
    <div className="relative w-full cursor-pointer overflow-hidden px-3 pb-2 pt-3">
      <div className="flex flex-row" onClick={goPost}>
        <PostUserImage profileImage={userData?.profileImage} />
        <div className="flex w-full flex-col">
          <div className="flex flex-row gap-2">
            <PostUserNickName
              hashedUserId={post?.hashedUserId}
              nickname={userData?.nickname}
            />
            <PostCreatedAt createdAt={post?.createdAt} />
          </div>
          <PostContent content={post?.content} />
          {post?.photoUrl && <PostImages photoUrl={post?.photoUrl} />}
          <div className="grid grid-cols-4 ">
            <LikeCount postId={postId} post={post} />
            <CommentCount commentCount={post?.commentCount} />
          </div>
        </div>
        {(user?.uid === post?.userId ||
          user?.displayName === parentPostUserId) && (
          <PostSetting
            userId={user?.displayName as string}
            postId={postId}
            parentPostId={post?.parentFeedId}
            isCommentOwner={user?.uid === post?.userId}
          />
        )}
      </div>
      <hr className="absolute bottom-0 left-0 w-full" />
    </div>
  );
};

export default PostCard;
