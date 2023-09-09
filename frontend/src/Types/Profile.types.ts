export interface ProfileType {
    firstName: string;
    lastName: string;
    createdAt: Date | string;
    country: string;
    followings: string | number | Array<string>;
    followers: string | number | Array<string>;
    role: string;
    userPicture: string;
    username: string;
    userId: string;
    email: string;
    occupation: string;
    bio: string;
  }