'use client';

import { useRouter } from 'next/navigation';

import { IPostCard } from '@/app/_types/post';
import useOnAuth from '@/app/_hooks/common/useOnAuth';
import useUserQuery from '@/app/_hooks/api/useUserQuery';
import LikeCount from '@/app/_components/post/LikeCount';
import CommentCount from '@/app/_components/post/CommentCount';
import PostCardSetting from '@/app/_components/post/PostCardSetting';
import PostCardUserNickName from '@/app/_components/post/PostCardUserNickName';
import PostCardCreatedAt from '@/app/_components/post/PostCardCreatedAt';
import PostCardContent from '@/app/_components/post/PostCardContent';
import PostCardImages from '@/app/_components/post/PostCardImages';
import UserProfileImage from '@/app/_components/common/UserProfileImage';

const PostCard = ({ postData, parentPostUserId }: IPostCard) => {
  const router = useRouter();
  const { user } = useOnAuth();
  const { postId, post } = postData;
  const { data: userData } = useUserQuery({ userId: post?.hashedUserId });

  const goPost = () => {
    router.push(`/${post.hashedUserId}/post/${postId}`);
  };

  return (
    <div className="relative w-full cursor-pointer overflow-hidden px-3 pb-2 pt-3">
      <div className="flex flex-row" onClick={goPost}>
        <UserProfileImage className="mr-2" src={userData?.profileImage} alt="프로필 사진" width={100} height={100} />
        <div className="flex w-full flex-col">
          <div className="flex flex-row gap-2">
            <PostCardUserNickName hashedUserId={post?.hashedUserId} nickname={userData?.nickname} />
            <PostCardCreatedAt createdAt={post?.createdAt} />
          </div>
          <PostCardContent content={post?.content} />
          {post?.photoUrl && <PostCardImages photoUrl={post?.photoUrl} />}
          <div className="grid grid-cols-4 ">
            <LikeCount postId={postId} post={post} />
            <CommentCount commentCount={post?.commentCount} />
          </div>
        </div>
        {(user?.uid === post?.userId || user?.displayName === parentPostUserId) && (
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
