import Post from "./Post";
import { PostType } from '../../Types/Post.types';

type Props = {
  posts: PostType[];
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
