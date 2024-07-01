import { KeyboardEvent } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

import { IMessage } from '@/app/_types/message';
import useSendMessageMutation from '@/app/_hooks/api/useSendMessageMutation';

interface IUseMessageForm {
  receiverId: string;
}

const useMessageForm = ({ receiverId }: IUseMessageForm) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<IMessage>({ mode: 'onSubmit' });
  const { sendToMessage } = useSendMessageMutation({ receiverId, reset });

  const onSubmit: SubmitHandler<IMessage> = async data => {
    await sendToMessage.mutateAsync(data);
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
