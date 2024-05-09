'use client';

import Link from 'next/link';
import { MouseEvent, MouseEventHandler } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import { IPostCard } from '@/app/types/post';
import { Avatar } from '@/components/ui/avatar';
import LikeCount from '@/app/(afterLogin)/home/_component/LikeCount';
import { formatDateTime } from '@/app/_lib/formatDateTime';
import CommentCount from '@/app/(afterLogin)/home/_component/CommentCount';
import PostSetting from '@/app/(afterLogin)/home/_component/PostSetting';
import useOnAuth from '@/app/_lib/useOnAuth';
import useGetUserData from '@/app/(afterLogin)/users/[userId]/_hook/useGetUserData';

const PostCard = ({ postId, post, parentPostUserId }: IPostCard) => {
  const router = useRouter();
  const { user } = useOnAuth();
  const { data: userData } = useGetUserData({ userId: post.hashedUserId });

  const goPost = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    router.push(`/${post.hashedUserId}/post/${postId}`);
  };

  const stopPropagation: MouseEventHandler<HTMLAnchorElement> = e => {
    e.stopPropagation();
  };

  return (
    <div className="relative w-full cursor-pointer overflow-hidden px-3 pb-2 pt-3">
      <div className="flex flex-row" onClick={goPost}>
        <Avatar className="mr-2">
          {userData?.profileImage && (
            <Image
              src={userData?.profileImage}
              alt="프로필 사진"
              width={100}
              height={100}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            />
          )}
        </Avatar>
        <div className="flex w-full flex-col">
          <div className="flex flex-row gap-2">
            <Link
              href={`/users/${post.hashedUserId}`}
              className="hover:underline"
              onClick={stopPropagation}
            >
              <span className="font-bold">{userData?.nickname}</span>
            </Link>
            <p className="font-light text-gray-400">
              {formatDateTime({ createdAt: post.createdAt })}
            </p>
          </div>
          <p>{post.content}</p>
          {post.photoUrl &&
            post.photoUrl?.map((url: string) => (
              <Image
                key={url}
                src={url}
                alt="게시물 사진"
                width={500}
                height={500}
                placeholder="blur"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
                className="my-2 rounded-md border"
              />
            ))}
          <div className="grid grid-cols-4 ">
            <LikeCount postId={postId} post={post} />
            <CommentCount commentCount={post.commentCount} />
          </div>
        </div>
        {(user?.uid === post.userId ||
          user?.displayName === parentPostUserId) && (
          <PostSetting
            userId={user?.displayName as string}
            postId={postId}
            parentPostId={post.parentFeedId}
            isCommentOwner={user?.uid === post.userId}
          />
        )}
      </div>
      <hr className="absolute bottom-0 left-0 w-full" />
    </div>
  );
};

export default PostCard;
