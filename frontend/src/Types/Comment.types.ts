export interface Comment {
  _id: string;
  text: string;
  createdAt: string;
  author: {
    username: string;
    firstName: string;
    lastName: string;
    userPicture: string;
  }
}