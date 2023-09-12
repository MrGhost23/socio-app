export interface ProfileType {
  _id: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  country: string;
  userId: string;
  createdAt: Date | string;
  bookmarks: string[];
  following: string[];
  followers: string[];
  blocked: string[];
  userPicture?: string;
  occupation?: string;
  bio?: string;
}