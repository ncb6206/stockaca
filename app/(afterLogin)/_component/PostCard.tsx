'use client';

import { MouseEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { v4 as uuidv4 } from 'uuid';

import { IPostListData } from '@/app/types/post';
import { IUserData } from '@/app/types/user';
import { getUser } from '@/app/(afterLogin)/users/[userId]/_lib/getUser';
import { hashUid } from '@/app/_lib/hashUid';
import { Avatar } from '@/components/ui/avatar';
import LikeCount from '@/app/(afterLogin)/home/_component/LikeCount';
import { formatDateTime } from '@/app/_lib/formatDateTime';
import CommentCount from '@/app/(afterLogin)/home/_component/CommentCount';
import PostSetting from '@/app/(afterLogin)/home/_component/PostSetting';
import useOnAuth from '@/app/_lib/useOnAuth';

const PostCard = ({ postId, post }: IPostListData) => {
  const router = useRouter();
  const { user } = useOnAuth();
  const { data: userData } = useQuery<
    IUserData | null,
    Object,
    IUserData,
    [_1: string, _2: string]
  >({
    queryKey: ['users', hashUid({ uid: post.userId })],
    queryFn: getUser,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const goPost = (event: MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    router.push(`/${user?.displayName}/post/${postId}`);
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
            <span className="font-bold">{userData?.nickname}</span>
            <p className="font-light text-gray-400">
              {formatDateTime({ createdAt: post.createdAt })}
            </p>
          </div>
          <p>{post.content}</p>
          {post.photoUrl &&
            post.photoUrl?.map((url: string) => (
              <Image
                key={uuidv4()}
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
        {user?.uid === post.userId && (
          <PostSetting userId={user.uid} postId={postId} />
        )}
      </div>
      <hr className="absolute bottom-0 left-0 w-full" />
    </div>
  );
};

export default PostCard;
