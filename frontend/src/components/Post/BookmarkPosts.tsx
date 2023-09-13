import { BookmarkPostType } from '../../Types/BookmarkPost.types';
import BookmarkPost from "./BookmarkPost";

type Props = {
  posts: BookmarkPostType[];
}

const BookmarkPosts: React.FC<Props> = ({ posts }) => {
  return (
    <div className="flex flex-col gap-8">
      {
        posts.map(post =>
          <BookmarkPost key={post._id} post={post} />
        )
      }
    </div>
  );
};

export default BookmarkPosts;