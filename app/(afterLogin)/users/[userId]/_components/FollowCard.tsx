'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Avatar } from '@/components/ui/avatar';
import useFollowModalStore from '@/app/_store/useFollowModal';
import useGetUserData from '@/app/(afterLogin)/users/[userId]/_hooks/useGetUserData';
import { IUserId } from '@/app/_types/user';

const FollowCard = ({ userId }: IUserId) => {
  const { onChange } = useFollowModalStore();
  const { data: userData } = useGetUserData({ userId });

  return (
    <Link href={`/users/${userId}`} onClick={onChange}>
      <div className="flex gap-3 border-b py-4">
        <Avatar className="h-12 w-12">
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
        <div className="flex flex-col">
          <p className="font-bold hover:underline">{userData?.nickname}</p>
          <p className="font-thin text-gray-400">{userData?.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default FollowCard;
