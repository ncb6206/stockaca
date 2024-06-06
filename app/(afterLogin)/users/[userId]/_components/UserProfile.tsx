'use client';

import Loader from '@/components/ui/loader';
import { IFollowData } from '@/app/_types/follow';
import useGetUserData from '@/app/(afterLogin)/users/[userId]/_hooks/useGetUserData';
import useGetFollowData from '@/app/(afterLogin)/users/[userId]/_hooks/useGetFollowData';
import LogoutButton from '@/app/(afterLogin)/users/[userId]/_components/LogoutButton';
import FollowButton from '@/app/(afterLogin)/users/[userId]/_components/FollowButton';
import MessageButton from '@/app/(afterLogin)/users/[userId]/_components/MessageButton';
import FollowInfo from '@/app/(afterLogin)/users/[userId]/_components/FollowInfo';
import { IUserId } from '@/app/_types/user';
import UserProfileImage from '@/app/(afterLogin)/_components/UserProfileImage';

const UserProfile = ({ userId }: IUserId) => {
  const {
    data: userData,
    error: userError,
    isLoading: userLoading,
  } = useGetUserData({ userId });
  const { data: followData, isLoading: followLoading } = useGetFollowData({
    userId,
  });

  console.log('userPage rendered');

  if (userLoading || followLoading) {
    return <Loader />;
  }

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
        <UserProfileImage
          className="h-16 w-16"
          src={userData?.profileImage}
          alt="프로필 사진"
          width={200}
          height={200}
        />
      </div>
      <p>{userData?.bio}</p>
      <div className="mt-2 flex items-center">
        <FollowInfo userId={userId} />
        <div className="flex-1" />
        <div className="flex gap-2">
          <MessageButton userId={userId} />
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
