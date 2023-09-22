export interface ChatType {
  chatId: string;
  members: string[];
  latestMessage: {
    _id: string;
    text: string;
    createdAt: string;
  };
}
