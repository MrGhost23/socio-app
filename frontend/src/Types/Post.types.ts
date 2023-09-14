export interface PostType {
  _id: string;
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  description: string;
  userPicture: string;
  postImage?: string;
  createdAt: string;
  updatedAt: string;
  likes: object;
}