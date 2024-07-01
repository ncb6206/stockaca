'use client';

import MessageRoom from '@/app/_components/message/MessageRoom';
import useMessageRoomsQuery from '@/app/_hooks/api/useMessageRoomsQuery';
import useOnAuth from '@/app/_hooks/common/useOnAuth';

const MessageRoomList = () => {
  const { user } = useOnAuth();
  const { data: messageRooms } = useMessageRoomsQuery({
    userId: user?.displayName ?? '',
  });

  return (
    <div className="w-full">
      {messageRooms?.map(room => <MessageRoom key={room.roomId} receiverId={room.receiverId} />)}
    </div>
  );
};

export default MessageRoomList;
