import UserInfo from '@/app/(afterLogin)/messages/[userId]/_component/UserInfo';
import MessageList from '@/app/(afterLogin)/messages/[userId]/_component/MessageList';
import MessageForm from '@/app/(afterLogin)/messages/[userId]/_component/MessageForm';

interface MessageUserPageProps {
  params: { userId: string };
}

const MessageUserPage = ({ params }: MessageUserPageProps) => {
  const { userId } = params;

  return (
    <div className="flex h-[calc(100dvh-8rem)] w-full flex-col px-2">
      <UserInfo userId={userId} />
      <MessageList userId={userId} />
      <MessageForm userId={userId} />
    </div>
  );
};

export default MessageUserPage;
