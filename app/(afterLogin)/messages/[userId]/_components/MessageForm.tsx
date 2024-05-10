'use client';

import { IoSend } from 'react-icons/io5';
import TextareaAutosize from 'react-textarea-autosize';

import useMessageForm from '@/app/(afterLogin)/messages/[userId]/_hooks/useMessageForm';

interface IMessageForm {
  userId: string;
}

const MessageForm = ({ userId }: IMessageForm) => {
  const { handleSubmit, onSubmit, register, handleKeyDown } = useMessageForm({
    receiverId: userId,
  });

  return (
    <div className="w-full py-2">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-row items-center gap-2 rounded-2xl border p-2">
          <TextareaAutosize
            {...register('content', { required: '내용을 입력해주세요!' })}
            id="content"
            name="content"
            placeholder="메시지 입력..."
            className="w-full resize-none outline-none"
            minRows={1}
            maxRows={6}
            onKeyDown={handleKeyDown}
            required
          />
          <button type="submit">
            <IoSend className="cursor-pointer" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageForm;
