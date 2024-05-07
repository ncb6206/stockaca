import toast from 'react-hot-toast';
import { KeyboardEvent } from 'react';
import { useMutation } from '@tanstack/react-query';
import { SubmitHandler, useForm } from 'react-hook-form';

import { IMessage } from '@/app/types/message';
import useOnAuth from '@/app/_lib/useOnAuth';
import { sendMessage } from '@/app/(afterLogin)/messages/[userId]/_lib/sendMessage';

interface IUseMessageForm {
  receiverId: string;
}

const useMessageForm = ({ receiverId }: IUseMessageForm) => {
  const { user } = useOnAuth();
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<IMessage>({ mode: 'onSubmit' });

  const sendToMessage = useMutation({
    mutationFn: (data: IMessage) =>
      sendMessage({
        senderId: user?.displayName as string,
        receiverId,
        content: data.content,
      }),
    onSuccess: () => {
      reset();
      toast.success('메시지 보내기 성공');
    },
    onError: error => {
      console.error('Error sending message:', error);
      toast.error('메시지 보내기 실패');
    },
  });

  const onSubmit: SubmitHandler<IMessage> = data => {
    sendToMessage.mutate(data);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(onSubmit)();
    }
  };

  return { handleSubmit, onSubmit, register, isSubmitting, handleKeyDown };
};

export default useMessageForm;
