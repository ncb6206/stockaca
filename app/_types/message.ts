export interface IMessage {
  content: string;
}

export interface IMessageDetail {
  content: string;
  createdAt: number;
  roomId: string;
  sendUserId: string;
}

export interface IMessageList {
  messageId: string;
  message: IMessageDetail;
}

export interface IMessages {
  roomId?: string;
}

export interface IGetRoomId {
  senderId: string;
  receiverId: string;
}

export interface ISendMessage {
  senderId: string;
  receiverId: string;
  content: string;
}

export interface IReceiverId {
  receiverId: string;
}
