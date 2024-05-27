'use client';

import { useRouter } from 'next/navigation';

import useOnAuth from '@/app/_hooks/useOnAuth';
import { Button } from '@/components/ui/button';
import { IUserId } from '@/app/_types/user';

const MessageButton = ({ userId }: IUserId) => {
  const { user, loading } = useOnAuth();
  const router = useRouter();

  const goMessage = () => {
    router.push(`/messages/${userId}`);
  };

  if (loading || user?.displayName === userId) {
    return null;
  }

  return <Button onClick={goMessage}>메시지 보내기</Button>;
};

export default MessageButton;
