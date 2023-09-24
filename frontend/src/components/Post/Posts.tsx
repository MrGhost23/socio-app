import { Socket } from "socket.io-client";
import { PostType } from "../../Types/Post.types";
import Post from "./Post";

type Props = {
  posts: PostType[];
  updatePost: (postId: string, description: string, image: string) => void;
  removePost: (postId: string) => void;
  socket: Socket;
};

const Posts: React.FC<Props> = ({ posts, removePost, updatePost, socket }) => {
  return (
    <div className="flex flex-col gap-8">
      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          socket={socket}
          removePost={removePost}
          updatePost={updatePost}
        />
      ))}
    </div>
  );
};

export default Posts;
