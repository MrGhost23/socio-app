export interface NotificationType {
  _id: string;
  actionType: string;
  createdAt: string;
  firstName: string;
  lastName: string;
  userPicture?: string;
  isRead: boolean;
  postId?: string;
  username?: string;
}
