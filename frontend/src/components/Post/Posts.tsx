import Post from "./Post";

type Props = {
  posts: {
    _id: string | any;
    description: string;
    postImage?: string;
    likes: object | any;
    comments: any[];
    firstName: string;
    lastName: string;
    username: string;
    userPicture: string;
    createdAt: string | Date;
  }[];
};

const Posts: React.FC<Props> = ({ posts }) => {
  return (
    <div className="flex flex-col gap-8">
      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
        />
      ))}
    </div>
  );
};

export default Posts;
