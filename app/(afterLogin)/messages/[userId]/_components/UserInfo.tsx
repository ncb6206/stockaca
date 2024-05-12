'use client';

import Image from 'next/image';

import useGetUserData from '@/app/(afterLogin)/users/[userId]/_hooks/useGetUserData';
import { IUserId } from '@/app/_types/user';
import { Avatar } from '@/components/ui/avatar';

const UserInfo = ({ userId }: IUserId) => {
  const { data: userData } = useGetUserData({ userId });

  return (
    <div className="mb-2 flex w-full flex-col items-center gap-2 border-b py-2">
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
      <p className="text-xl font-bold">{userData?.nickname}</p>
      <p>{userData?.email}</p>
    </div>
  );
};

export default UserInfo;
