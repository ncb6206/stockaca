'use client';

import { IUserId } from '@/app/_types/user';
import UserProfileImage from '@/app/_components/common/UserProfileImage';
import useUserQuery from '@/app/_hooks/api/useUserQuery';

const UserInfo = ({ userId }: IUserId) => {
  const { data: userData } = useUserQuery({ userId });

  return (
    <div className="mb-2 flex w-full flex-col items-center gap-2 border-b py-2">
      <UserProfileImage className="h-16 w-16" src={userData?.profileImage} alt="프로필 사진" width={300} height={300} />
      <p className="text-xl font-bold">{userData?.nickname}</p>
      <p>{userData?.email}</p>
    </div>
  );
};

export default UserInfo;
