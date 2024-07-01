import toast from 'react-hot-toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { IMessage } from '@/app/_types/message';
import { postMessage } from '@/app/_api/messages/postMessage';
import useOnAuth from '@/app/_hooks/common/useOnAuth';
import { UseFormReset } from 'react-hook-form';

interface IUseSendMessage {
  receiverId: string;
  reset: UseFormReset<IMessage>;
}

const useSendMessageMutation = ({ receiverId, reset }: IUseSendMessage) => {
  const { user } = useOnAuth();
  const queryClient = useQueryClient();
  const sendToMessage = useMutation({
    mutationFn: (data: IMessage) =>
      postMessage({
        senderId: user?.displayName ?? '',
        receiverId,
        content: data.content,
      }),
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      toast.success('메시지 보내기 성공');
    },
    onError: error => {
      console.error('Error sending message:', error);
      toast.error('메시지 보내기 실패');
    },
  });

  return { sendToMessage };
};

export default useSendMessageMutation;
