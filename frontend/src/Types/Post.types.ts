export interface PostType {
  _id: string;
  userId: string;
  username: string;
  firstName: string;
  lastName: string;
  description: string;
  userPicture: string;
  postImage: string;
  likes: string[];
  createdAt: string | Date;
  updatedAt: string;
}