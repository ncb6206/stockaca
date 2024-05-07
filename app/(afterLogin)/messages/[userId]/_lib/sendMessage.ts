import { addDoc } from 'firebase/firestore';

import { CHATROOM_COLLECTION, MESSAGE_COLLECTION } from '@/app/firebase';
import { ISendMessage } from '@/app/types/message';
import { getRoomId } from '@/app/(afterLogin)/messages/_lib/getRoomId';

export const sendMessage = async ({
  senderId,
  receiverId,
  content,
}: ISendMessage) => {
  try {
    const chatRoomRef = CHATROOM_COLLECTION;
    const participants = [senderId, receiverId];

    let chatRoomId = await getRoomId({ senderId, receiverId });

    if (!chatRoomId) {
      const newChatRoom = {
        participants,
        createdAt: Date.now(),
      };

      const docRef = await addDoc(chatRoomRef, newChatRoom);
      chatRoomId = docRef.id;
    }

    const newMessage = {
      receiverUserId: receiverId,
      sendUserId: senderId,
      roomId: chatRoomId,
      createdAt: Date.now(),
      content,
    };

    await addDoc(MESSAGE_COLLECTION, newMessage);
  } catch (error) {
    console.error('Error send Message', error);
    throw new Error('Failed to send Message');
  }
};
