import { BookmarkPostType } from "../../Types/BookmarkPost.types";
import BookmarkPost from "./BookmarkPost";

type Props = {
  posts: BookmarkPostType[];
  reFetchFunction: () => void;
};

const BookmarkPosts: React.FC<Props> = ({ posts, reFetchFunction }) => {
  return (
    <div className="flex flex-col gap-8">
      {posts.map((post) => (
        <BookmarkPost
          key={post._id}
          post={post}
          reFetchFunction={reFetchFunction}
        />
      ))}
    </div>
  );
};

export default BookmarkPosts;
