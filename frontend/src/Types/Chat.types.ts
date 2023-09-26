export interface ChatType {
  chatId: string;
  members: string[];
  latestMessage: {
    senderUsername: string;
    _id: string;
    text: string;
    createdAt: string;
  } | null;
  isRead: boolean;
  allowMessage: boolean;
}
