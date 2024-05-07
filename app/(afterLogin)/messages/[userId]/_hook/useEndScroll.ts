import { IMessageList } from '@/app/types/message';
import { useEffect, useRef } from 'react';

export const useEndScroll = (messages: IMessageList[]) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return { messagesEndRef };
};
