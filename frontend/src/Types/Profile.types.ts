export interface ProfileType {
  firstName: string;
  lastName: string;
  createdAt: Date | string;
  country: string;
  followings: Array<string>;
  followers: Array<string>;
  role: string;
  userPicture: string;
  username: string;
  userId: string;
  email: string;
  occupation: string;
  bio: string;
}