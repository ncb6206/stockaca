'use client';

import { useRouter } from 'next/navigation';

import { IPostCard } from '@/app/_types/post';
import useOnAuth from '@/app/_hooks/useOnAuth';
import useGetUserData from '@/app/(afterLogin)/users/[userId]/_hooks/useGetUserData';
import LikeCount from '@/app/(afterLogin)/_components/LikeCount';
import CommentCount from '@/app/(afterLogin)/_components/CommentCount';
import PostCardSetting from '@/app/(afterLogin)/_components/PostCardSetting';
import PostCardUserNickName from '@/app/(afterLogin)/_components/PostCardUserNickName';
import PostCardCreatedAt from '@/app/(afterLogin)/_components/PostCardCreatedAt';
import PostCardContent from '@/app/(afterLogin)/_components/PostCardContent';
import PostCardImages from '@/app/(afterLogin)/_components/PostCardImages';
import UserProfileImage from '@/app/(afterLogin)/_components/UserProfileImage';

const PostCard = ({ postData, parentPostUserId }: IPostCard) => {
  const router = useRouter();
  const { user } = useOnAuth();
  const { postId, post } = postData;
  const { data: userData } = useGetUserData({ userId: post?.hashedUserId });

  const goPost = () => {
    router.push(`/${post.hashedUserId}/post/${postId}`);
  };

  return (
    <div className="relative w-full cursor-pointer overflow-hidden px-3 pb-2 pt-3">
      <div className="flex flex-row" onClick={goPost}>
        <UserProfileImage
          className="mr-2"
          src={userData?.profileImage}
          alt="프로필 사진"
          width={100}
          height={100}
        />
        <div className="flex w-full flex-col">
          <div className="flex flex-row gap-2">
            <PostCardUserNickName
              hashedUserId={post?.hashedUserId}
              nickname={userData?.nickname}
            />
            <PostCardCreatedAt createdAt={post?.createdAt} />
          </div>
          <PostCardContent content={post?.content} />
          {post?.photoUrl && <PostCardImages photoUrl={post?.photoUrl} />}
          <div className="grid grid-cols-4 ">
            <LikeCount postId={postId} post={post} />
            <CommentCount commentCount={post?.commentCount} />
          </div>
        </div>
        {(user?.uid === post?.userId ||
          user?.displayName === parentPostUserId) && (
          <PostCardSetting
            userId={user?.displayName ?? ''}
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
