import UserInfo from '@/app/(afterLogin)/messages/[userId]/_components/UserInfo';
import MessageList from '@/app/(afterLogin)/messages/[userId]/_components/MessageList';
import MessageForm from '@/app/(afterLogin)/messages/[userId]/_components/MessageForm';

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
