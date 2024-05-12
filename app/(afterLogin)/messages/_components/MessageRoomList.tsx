'use client';

import useOnAuth from '@/app/_hooks/useOnAuth';
import useMessageRooms from '@/app/(afterLogin)/messages/_hooks/useMessageRooms';
import MessageRoom from '@/app/(afterLogin)/messages/_components/MessageRoom';

const MessageRoomList = () => {
  const { user } = useOnAuth();
  const { data: messageRooms } = useMessageRooms({
    userId: user?.displayName as string,
  });

  return (
    <div className="w-full">
      {messageRooms?.map(room => (
        <MessageRoom
          key={room.roomId}
          receiverId={room.receiverId}
          roomId={room.roomId}
        />
      ))}
    </div>
  );
};

export default MessageRoomList;
