import Post from "./Post";
import { PostType } from '../../Types/Post.types';

type Props = {
  posts: PostType[];
  updatePost: (postId: string, description: string, image: object) => void;
  removePost: (postId: string) => void;
};

const Posts: React.FC<Props> = ({ posts, removePost, updatePost }) => {
  return (
    <div className="flex flex-col gap-8">
      {posts.map((post) => (
        <Post
          key={post._id}
          post={post}
          removePost={removePost}
          updatePost={updatePost}
        />
      ))}
    </div>
  );
};

export default Posts;
