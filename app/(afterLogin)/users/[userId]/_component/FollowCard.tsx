'use client';

import { useQuery } from '@tanstack/react-query';

import { IUserData } from '@/app/types/user';
import { getUser } from '@/app/(afterLogin)/users/[userId]/_lib/getUser';
import { Avatar } from '@/components/ui/avatar';
import Image from 'next/image';
import Link from 'next/link';
import useFollowModalStore from '@/app/store/useFollowModal';

interface IFollowCardProps {
  userId: string;
}

const FollowCard = ({ userId }: IFollowCardProps) => {
  const { onChange } = useFollowModalStore();
  const { data: userData } = useQuery<
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
