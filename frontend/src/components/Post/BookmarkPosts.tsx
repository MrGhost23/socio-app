import { BookmarkPostType } from "../../Types/BookmarkPost.types";
import BookmarkPost from "./BookmarkPost";

type Props = {
  posts: BookmarkPostType[];
  removeBookmarkFunction: (postId: string) => void;
};

const BookmarkPosts: React.FC<Props> = ({ posts, removeBookmarkFunction }) => {
  return (
    <div className="flex flex-col gap-8">
      {posts.map((post) => (
        <BookmarkPost
          key={post._id}
          post={post}
          removeBookmarkFunction={removeBookmarkFunction}
        />
      ))}
    </div>
  );
};

export default BookmarkPosts;
