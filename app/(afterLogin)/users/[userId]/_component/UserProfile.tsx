'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

import { Avatar } from '@/components/ui/avatar';
import { getUser } from '@/app/(afterLogin)/users/[userId]/_lib/getUser';
import { IUserData } from '@/app/types/user';
import LogoutButton from '@/app/(afterLogin)/users/[userId]/_component/LogoutButton';
import FollowButton from '@/app/(afterLogin)/users/[userId]/_component/FollowButton';
import { IFollowData } from '@/app/types/follow';
import { getFollowData } from '@/app/(afterLogin)/users/[userId]/_lib/getFollowData';
import useFollowModalStore from '@/app/store/useFollowModal';

interface UserProfileProps {
  userId: string;
}

const UserProfile = ({ userId }: UserProfileProps) => {
  const { onOpen, onSetUserId } = useFollowModalStore();
  const { data: userData, error: userError } = useQuery<
    IUserData | null,
    Object,
    IUserData,
    [_1: string, _2: string]
  >({
    queryKey: ['users', userId],
    queryFn: getUser,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const { data: followData } = useQuery<
    IFollowData | null,
    Object,
    IFollowData,
    [_1: string, _2: string]
  >({
    queryKey: ['follow', userId],
    queryFn: getFollowData,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  const onOpenFollowModal = () => {
    onSetUserId(userId);
    onOpen();
  };

  if (!userData || userError) {
    return <div>이런! 사용자를 찾을 수 없습니다.</div>;
  }

  return (
    <div className="mb-4 flex flex-col justify-center gap-2">
      <div className="flex w-full flex-row justify-between">
        <div className="flex flex-col">
          <p className="text-xl font-bold">{userData?.nickname}</p>
          <p>{userData?.email}</p>
        </div>
        <Avatar className="h-16 w-16">
          {userData?.profileImage && (
            <Image
              src={userData?.profileImage}
              alt="프로필 사진"
              width={300}
              height={300}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAFklEQVR42mN8//HLfwYiAOOoQvoqBABbWyZJf74GZgAAAABJRU5ErkJggg=="
            />
          )}
        </Avatar>
      </div>
      <p>{userData?.bio}</p>
      <div className="mt-2 flex items-center">
        <div
          className="flex gap-4 hover:cursor-pointer hover:underline"
          onClick={onOpenFollowModal}
        >
          <div>
            <p>
              팔로워
              <span className="mx-1 font-bold">
                {followData?.followerUserId.length}
              </span>
            </p>
          </div>
          <div>
            <p>
              팔로잉
              <span className="mx-1 font-bold">
                {followData?.followingUserId.length}
              </span>
            </p>
          </div>
        </div>
        <div className="flex-1" />
        <div className="flex gap-2">
          <FollowButton
            userId={userId}
            followData={followData as IFollowData}
          />
          <LogoutButton userId={userId} />
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
