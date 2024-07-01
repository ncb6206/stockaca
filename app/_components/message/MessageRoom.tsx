'use client';

import { useRouter } from 'next/navigation';

import { IReceiverId } from '@/app/_types/message';
import UserProfileImage from '@/app/_components/common/UserProfileImage';
import useUserQuery from '@/app/_hooks/api/useUserQuery';

const MessageRoom = ({ receiverId }: IReceiverId) => {
  const router = useRouter();
  const { data: userData } = useUserQuery({ userId: receiverId });

  const goMessageRoom = () => {
    router.push(`/messages/${receiverId}`);
  };

  return (
    <div className="flex w-full cursor-pointer gap-2 border-b p-2 hover:bg-gray-100" onClick={goMessageRoom}>
      <UserProfileImage className="h-16 w-16" src={userData?.profileImage} alt="프로필 사진" width={300} height={300} />
      <p className="text-xl font-bold">{userData?.nickname}</p>
      <p>{userData?.email}</p>
    </div>
  );
};

export default MessageRoom;
