'use client';

import Image from 'next/image';
import { useQuery } from '@tanstack/react-query';

import { Avatar } from '@/components/ui/avatar';
import { getUser } from '@/app/(afterLogin)/users/[userId]/_lib/getUser';
import { UserDataType } from '@/app/types/user';

interface UserProfileProps {
  userId: string;
}

const UserProfile = ({ userId }: UserProfileProps) => {
  const { data: userData, error } = useQuery<
    UserDataType | null,
    Object,
    UserDataType,
    [_1: string, _2: string]
  >({
    queryKey: ['users', userId],
    queryFn: getUser,
    staleTime: 60 * 1000,
    gcTime: 300 * 1000,
  });

  if (!userData || error) {
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
    </div>
  );
};

export default UserProfile;
