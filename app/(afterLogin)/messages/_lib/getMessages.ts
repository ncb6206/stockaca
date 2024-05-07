import { QueryFunction } from '@tanstack/react-query';
import { onSnapshot, orderBy, query, where } from 'firebase/firestore';

import { MESSAGE_COLLECTION } from '@/app/firebase';
import { IMessageDetail, IMessageList } from '@/app/types/message';

export const getMessages: QueryFunction<
  IMessageList[] | null,
  [_1: string, _2: string | undefined]
> = async ({ queryKey }) => {
  // eslint-disable-next-line no-unused-vars
  const [_1, roomId] = queryKey;
  const messageQuery = query(
    MESSAGE_COLLECTION,
    where('roomId', '==', roomId),
    orderBy('createdAt', 'asc'),
  );

  return new Promise(resolve => {
    const unsubscribe = onSnapshot(messageQuery, snapshot => {
      const messages = snapshot.docs.map(doc => ({
        messageId: doc.id,
        message: doc.data() as IMessageDetail,
      }));
      resolve(messages);
    });

    return () => unsubscribe();
  });
};
