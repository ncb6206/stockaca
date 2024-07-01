'use client';

import { IUserId } from '@/app/_types/user';
import useRoomId from '@/app/_hooks/messages/useRoomId';
import { IMessageList } from '@/app/_types/message';
import { formatDateTime } from '@/app/_utils/formatDateTime';
import { useMessageList } from '@/app/_hooks/messages/useMessageList';
import { useEndScroll } from '@/app/_hooks/messages/useEndScroll';
import useOnAuth from '@/app/_hooks/common/useOnAuth';

const MessageList = ({ userId }: IUserId) => {
  const { user } = useOnAuth();
  const { roomId, loading } = useRoomId({
    senderId: user?.displayName ?? '',
    receiverId: userId,
  });
  const { messages } = useMessageList({ roomId: roomId ?? '' });
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
              <p className="text-sm font-light">{formatDateTime({ createdAt: m.message.createdAt })}</p>
            </div>
          );
        } else {
          return (
            <div key={m.messageId} className="flex flex-col items-start">
              <div className="mb-1 mt-2 rounded-e-3xl rounded-ss-3xl bg-gray-100 px-3 py-2">{m.message.content}</div>
              <p className="text-sm font-light">{formatDateTime({ createdAt: m.message.createdAt })}</p>
            </div>
          );
        }
      })}
      <div ref={messagesEndRef} />
    </div>
  );
};

export default MessageList;
