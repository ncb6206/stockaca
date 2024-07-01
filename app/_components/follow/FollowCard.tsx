'use client';

import Link from 'next/link';

import useFollowModalStore from '@/app/_store/useFollowModal';
import { IUserId } from '@/app/_types/user';
import UserProfileImage from '@/app/_components/common/UserProfileImage';
import useUserQuery from '@/app/_hooks/api/useUserQuery';

const FollowCard = ({ userId }: IUserId) => {
  const { onChange } = useFollowModalStore();
  const { data: userData } = useUserQuery({ userId });

  return (
    <Link href={`/users/${userId}`} onClick={onChange}>
      <div className="flex gap-3 border-b py-4">
        <UserProfileImage
          className="h-12 w-12"
          src={userData?.profileImage}
          alt="프로필 사진"
          width={300}
          height={300}
        />
        <div className="flex flex-col">
          <p className="font-bold hover:underline">{userData?.nickname}</p>
          <p className="font-thin text-gray-400">{userData?.name}</p>
        </div>
      </div>
    </Link>
  );
};

export default FollowCard;
