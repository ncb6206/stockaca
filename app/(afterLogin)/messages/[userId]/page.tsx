import { IUserId } from '@/app/_types/user';
import UserInfo from '@/app/_components/common/UserInfo';
import MessageList from '@/app/_components/message/MessageList';
import MessageForm from '@/app/_components/message/MessageForm';

interface MessageUserPageProps {
  params: IUserId;
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
