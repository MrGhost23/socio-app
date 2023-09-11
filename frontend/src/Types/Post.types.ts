export interface PostType {
    _id: string | any;
    userId: string;
    username: string;
    firstName: string;
    lastName: string;
    description: string;
    userPicture: string;
    postImage: string;
    likes: Record<string, any> | any;
    comments: any[];
    createdAt: string | Date;
    updatedAt: string;
  }