import { getDocs, query, where } from 'firebase/firestore';

import { CHATROOM_COLLECTION } from '@/app/firebase';
import { IUserId } from '@/app/_types/user';

export const getMessageRooms = async ({ userId }: IUserId) => {
  try {
    const chatQuery = query(
      CHATROOM_COLLECTION,
      where('participants', 'array-contains', userId),
    );

    const chatQuerySnapshot = await getDocs(chatQuery);

    const messageRooms = chatQuerySnapshot.docs.map(doc => ({
      roomId: doc.id,
      receiverId: doc
        .data()
        .participants.filter((id: string) => id !== userId)[0] as string,
    }));

    return messageRooms || [];
  } catch (error) {
    console.error('Error get ChatRooms', error);
    throw new Error('Failed to get ChatRooms');
  }
};
