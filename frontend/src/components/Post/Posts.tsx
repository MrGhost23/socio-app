import Post from "./Post";

type Props = {
  currentUserId: string | undefined;
  currentUserFullName: string | undefined;
  currentUserImage: string | undefined;
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

const Posts: React.FC<Props> = ({
  currentUserId,
  currentUserFullName,
  currentUserImage,
  posts,
}) => {
  return (
    <div className="flex flex-col gap-8">
      {posts.map((post) => (
        <Post
          key={post.id}
          currentUserId={currentUserId}
          currentUserFullName={currentUserFullName}
          currentUserImage={currentUserImage}
          post={post}
        />
      ))}
    </div>
  );
};

export default Posts;
