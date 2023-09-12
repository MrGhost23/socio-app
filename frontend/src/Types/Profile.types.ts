export interface ProfileType {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  country: string;
  userId: string;
  createdAt: Date | string;
  following: string[];
  followers: string[];
  userPicture?: string;
  occupation?: string;
  bio?: string;
}