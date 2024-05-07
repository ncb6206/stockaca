import { query, where, onSnapshot, orderBy } from 'firebase/firestore';
import { useState, useEffect } from 'react';

import { MESSAGE_COLLECTION } from '@/app/firebase';
import { IMessageDetail, IMessageList, IMessages } from '@/app/types/message';

export const useMessageList = ({ roomId }: IMessages) => {
  const [messages, setMessages] = useState<IMessageList[]>([]);

  useEffect(() => {
    const messageQuery = query(
      MESSAGE_COLLECTION,
      where('roomId', '==', roomId),
      orderBy('createdAt', 'asc'),
    );

    const unsubscribe = onSnapshot(
      messageQuery,
      snapshot => {
        const newMessages: IMessageList[] = snapshot.docs.map(doc => ({
          messageId: doc.id,
          message: doc.data() as IMessageDetail,
        }));
        setMessages(newMessages);
      },
      error => {
        console.error('Error listening to messages:', error);
      },
    );

    return () => unsubscribe();
  }, [roomId]);

  return { messages };
};
