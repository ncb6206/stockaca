'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { IMessageRoom } from '@/app/types/message';
import useGetUserData from '@/app/(afterLogin)/users/[userId]/_hook/useGetUserData';
import { Avatar } from '@/components/ui/avatar';

const MessageRoom = ({ receiverId, roomId }: IMessageRoom) => {
  const router = useRouter();
  const { data: userData } = useGetUserData({ userId: receiverId });

  const goMessageRoom = () => {
    router.push(`/messages/${receiverId}`);
  };

  return (
    <div
      className="flex w-full cursor-pointer gap-2 border-b p-2 hover:bg-gray-100"
      onClick={goMessageRoom}
    >
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

export default MessageRoom;
