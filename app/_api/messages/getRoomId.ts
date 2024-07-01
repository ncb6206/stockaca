import { getDocs, query, where } from 'firebase/firestore';

import { CHATROOM_COLLECTION } from '@/app/firebase';
import { IGetRoomId } from '@/app/_types/message';

export const getRoomId = async ({ senderId, receiverId }: IGetRoomId) => {
  try {
    const participants = [senderId, receiverId];

    const chatQuery = query(CHATROOM_COLLECTION, where('participants', 'array-contains-any', participants));

    const chatQuerySnapshot = await getDocs(chatQuery);

    const chatRoom = chatQuerySnapshot.docs.find(doc => {
      const chatParticipants = doc.data().participants;
      return chatParticipants.includes(senderId) && chatParticipants.includes(receiverId);
    });

    return chatRoom ? chatRoom.id : null;
  } catch (error) {
    console.error('Error get RoomId', error);
    throw new Error('Failed to get RoomId');
  }
};
