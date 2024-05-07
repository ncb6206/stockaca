'use client';

import useOnAuth from '@/app/_lib/useOnAuth';
import { IUserId } from '@/app/types/user';
import useRoomId from '@/app/(afterLogin)/messages/[userId]/_hook/useRoomId';
import { IMessageList } from '@/app/types/message';
import { formatDateTime } from '@/app/_lib/formatDateTime';
import { useMessageList } from '@/app/(afterLogin)/messages/[userId]/_hook/useMessageList';
import { useEndScroll } from '@/app/(afterLogin)/messages/[userId]/_hook/useEndScroll';

const MessageList = ({ userId }: IUserId) => {
  const { user } = useOnAuth();
  const { roomId, loading } = useRoomId({
    senderId: user?.displayName as string,
    receiverId: userId,
  });
  const { messages } = useMessageList({ roomId: roomId as string | undefined });
  const { messagesEndRef } = useEndScroll(messages);

  if (loading) {
    return <div className="flex-1">Loading...</div>;
  }

  console.log(messages);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages?.map((m: IMessageList) => {
        if (m.message.sendUserId === user?.displayName) {
          return (
            <div key={m.messageId} className="flex flex-col items-end">
              <div className="mb-1 mt-2 rounded-s-3xl rounded-se-3xl bg-violet-400 px-3 py-2 text-white">
                {m.message.content}
              </div>
              <p className="text-sm font-light">
                {formatDateTime({ createdAt: m.message.createdAt })}
              </p>
            </div>
          );
        } else {
          return (
            <div key={m.messageId} className="flex flex-col items-start">
              <div className="mb-1 mt-2 rounded-e-3xl rounded-ss-3xl bg-gray-100 px-3 py-2">
                {m.message.content}
              </div>
              <p className="text-sm font-light">
                {formatDateTime({ createdAt: m.message.createdAt })}
              </p>
            </div>
          );
        }
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
